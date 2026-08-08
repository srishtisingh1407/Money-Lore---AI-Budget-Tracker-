import os
import datetime
import html
import re
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from sqlalchemy.orm import Session
from app.models import OAuthCredential
import base64
from google import genai
from google.genai import types

# We will need the client secrets JSON or env vars for this.
# For now, we expect Google credentials to be provided via environment variables.

SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

def get_google_auth_url(redirect_uri: str, client_id: str, client_secret: str):
    """Generate the OAuth login URL"""
    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": client_id,
                "client_secret": client_secret,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
            }
        },
        scopes=SCOPES,
        redirect_uri=redirect_uri
    )
    auth_url, _ = flow.authorization_url(prompt='consent', access_type='offline')
    return auth_url

def exchange_code_for_token(code: str, redirect_uri: str, client_id: str, client_secret: str, db: Session, user_id: str):
    """Exchange auth code for tokens and save to DB"""
    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": client_id,
                "client_secret": client_secret,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
            }
        },
        scopes=SCOPES,
        redirect_uri=redirect_uri
    )
    flow.fetch_token(code=code)
    credentials = flow.credentials

    # Save to database
    db_cred = db.query(OAuthCredential).filter(OAuthCredential.user_id == user_id).first()
    if not db_cred:
        db_cred = OAuthCredential(user_id=user_id, provider="google")
        db.add(db_cred)
    
    db_cred.access_token = credentials.token
    if credentials.refresh_token:
        db_cred.refresh_token = credentials.refresh_token
    db_cred.token_uri = credentials.token_uri
    db_cred.client_id = credentials.client_id
    db_cred.client_secret = credentials.client_secret
    db_cred.scopes = ",".join(credentials.scopes)
    
    db.commit()
    return {"message": "Successfully authenticated with Google"}

def get_gmail_service(db: Session, user_id: str):
    """Build the Gmail API service using credentials from DB"""
    db_cred = db.query(OAuthCredential).filter(OAuthCredential.user_id == user_id).first()
    if not db_cred:
        raise Exception("Google credentials not found for this user.")
    
    creds = Credentials(
        token=db_cred.access_token,
        refresh_token=db_cred.refresh_token,
        token_uri=db_cred.token_uri,
        client_id=db_cred.client_id,
        client_secret=db_cred.client_secret,
        scopes=db_cred.scopes.split(",") if db_cred.scopes else SCOPES
    )
    
    if creds.expired and creds.refresh_token:
        creds.refresh(Request())
        db_cred.access_token = creds.token
        db.commit()
        
    service = build('gmail', 'v1', credentials=creds)
    return service

def _decode_body(data: str) -> str:
    """Decode Gmail's URL-safe base64 payload, including unpadded values."""
    return base64.urlsafe_b64decode(data + "=" * (-len(data) % 4)).decode("utf-8", errors="replace")


def _message_text(payload: dict) -> str:
    """Collect text from nested Gmail MIME parts (receipts are rarely flat)."""
    parts = []
    mime_type = payload.get("mimeType", "")
    data = payload.get("body", {}).get("data")
    if data and mime_type in {"text/plain", "text/html"}:
        text = _decode_body(data)
        if mime_type == "text/html":
            text = re.sub(r"<[^>]+>", " ", html.unescape(text))
        parts.append(text)
    for part in payload.get("parts", []):
        parts.append(_message_text(part))
    return "\n".join(part for part in parts if part).strip()


def fetch_recent_transaction_emails(db: Session, user_id: str, query: str = '(receipt OR invoice OR payment OR transaction OR debited OR credited)', max_results: int = 25):
    """Fetch recent emails matching a query"""
    service = get_gmail_service(db, user_id)
    
    results = service.users().messages().list(userId='me', q=query, maxResults=max_results).execute()
    messages = results.get('messages', [])
    
    parsed_transactions = []
    
    for message in messages:
        msg = service.users().messages().get(userId='me', id=message['id'], format='full').execute()
        
        # Extract headers (Date, Subject, From)
        headers = msg['payload']['headers']
        subject = next((h['value'] for h in headers if h['name'] == 'Subject'), 'Unknown')
        sender = next((h['value'] for h in headers if h['name'] == 'From'), 'Unknown')
        
        # Get body
        body = _message_text(msg['payload'])
             
        # Parse using Gemini
        extracted = _parse_email_with_gemini(subject, sender, body)
        if extracted:
            parsed_transactions.append(extracted)
            
    return parsed_transactions

def _parse_email_with_gemini(subject: str, sender: str, body: str):
    """Use Gemini to extract transaction details from email text"""
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return None
        
    client = genai.Client(api_key=api_key)
    
    prompt = f"""
    Extract the transaction details from the following email.
    Subject: {subject}
    From: {sender}
    
    Email Body:
    {body[:2000]} # Limit to avoid huge context
    
    If this is not a valid financial transaction or receipt, return "NOT_TRANSACTION".
    Otherwise, extract the Date (YYYY-MM-DD), Merchant Name, and Amount (as a float).
    Return strictly JSON format.
    """
    
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema={
                    "type": "OBJECT",
                    "properties": {
                        "is_transaction": {"type": "BOOLEAN"},
                        "date": {"type": "STRING"},
                        "merchant": {"type": "STRING"},
                        "amount": {"type": "NUMBER"}
                    },
                    "required": ["is_transaction", "date", "merchant", "amount"]
                }
            )
        )
        
        import json
        data = json.loads(response.text)
        
        if not data.get("is_transaction"):
            return None
            
        return {
            "date": data.get("date"),
            "merchant": data.get("merchant"),
            "amount": float(data.get("amount")),
            "source": "gmail",
            "note": f"Parsed from email: {subject}"
        }
    except Exception as e:
        print(f"Failed to parse email with Gemini: {e}")
        return None
