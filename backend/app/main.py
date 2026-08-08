import os

from fastapi import FastAPI, Depends, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import csv
import io
import datetime

from app.db.session import get_db, engine
from app.models import Base, Transaction, UserShortcut, Merchant, AIQuery
from app.db.seed import seed_database
from app.services.pipeline import ingest_transaction, classify_transaction
from app.services.trust import calculate_data_trust_score
from app.agents.agent import process_agent_query
from app.agents import tools
from app import schemas

# Create Database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Spending Tea API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("FRONTEND_URL", "http://localhost:3000").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    # Automatically seed the database on startup if empty
    db = next(get_db())
    try:
        seed_database(db)
    finally:
        db.close()

# --- TRANSACTIONS ---

@app.get("/api/transactions", response_model=List[schemas.TransactionResponse])
def get_transactions(
    search: Optional[str] = None,
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Transaction).filter(Transaction.user_id == "srishti_user")
    
    if search:
        query = query.filter(
            (Transaction.merchant.ilike(f"%{search}%")) | 
            (Transaction.note.ilike(f"%{search}%"))
        )
        
    if category and category != "All":
        query = query.filter(Transaction.category.ilike(category))
        
    return query.order_by(Transaction.date.desc()).all()

@app.post("/api/transactions/{id}/categorize")
def categorize_transaction(
    id: str,
    category: str,
    db: Session = Depends(get_db)
):
    tx = db.query(Transaction).filter(Transaction.id == id).first()
    if not tx:
        raise HTTPException(status_code=404, detail="Transaction not found")
        
    tx.category = category
    tx.classification_method = "manual"
    tx.confidence = 1.0
    tx.classification_reason = "Manually categorized by user"
    
    # Remove uncategorized quality warnings if solved
    from app.models import DataQualityEvent
    db.query(DataQualityEvent).filter(
        DataQualityEvent.transaction_id == id,
        DataQualityEvent.type == "uncategorized"
    ).delete()
    
    db.commit()
    return {"status": "success", "category": category}

# --- ANALYTICS ---

@app.get("/api/summary", response_model=schemas.AnalyticsSummary)
def get_summary(db: Session = Depends(get_db)):
    user_id = "srishti_user"
    
    # Current month August 2026 vs July 2026
    aug_spent = tools.get_spending_summary(db, user_id, "2026-08")["total_spent"]
    jul_spent = tools.get_spending_summary(db, user_id, "2026-07")["total_spent"]
    
    diff_pct = ((aug_spent - jul_spent) / jul_spent * 100) if jul_spent > 0 else -8.4
    
    # Category calculations
    categories = tools.get_category_spending(db, user_id, "2026-08")
    biggest = categories[0]["category"] if categories else "Food"
    
    # Average daily spend
    total_days = 8 # up to Aug 8
    daily_avg = aug_spent / total_days
    
    # Mocking metadata fields for the response
    return schemas.AnalyticsSummary(
        total_spent=aug_spent,
        total_saved=8000.0,
        daily_avg=round(daily_avg, 2),
        highest_day=schemas.DailySpend(name="Saturday", amount=4280.0),
        lowest_day=schemas.DailySpend(name="Wednesday", amount=1320.0),
        biggest_category=biggest,
        weekend_spending=6240.0,
        weekday_spending=aug_spent - 6240.0,
        change_percentage=round(diff_pct, 1)
    )

@app.get("/api/analytics/categories", response_model=List[schemas.CategorySpend])
def get_analytics_categories(db: Session = Depends(get_db)):
    data = tools.get_category_spending(db, "srishti_user", "2026-08")
    return [
        schemas.CategorySpend(name=c["category"], amount=c["amount"], percentage=c["percentage"])
        for c in data
    ]

@app.get("/api/analytics/merchants", response_model=List[schemas.MerchantSpend])
def get_analytics_merchants(db: Session = Depends(get_db)):
    data = tools.get_merchant_spending(db, "srishti_user", "2026-08")
    return [schemas.MerchantSpend(name=m["merchant"], amount=m["amount"]) for m in data]

@app.get("/api/analytics/weekly")
def get_analytics_weekly(db: Session = Depends(get_db)):
    return tools.get_weekly_spending(db, "srishti_user", "2026-08")

@app.get("/api/analytics/monthly")
def get_analytics_monthly(db: Session = Depends(get_db)):
    return tools.get_monthly_spending(db, "srishti_user")

# --- DATA TRUST ---

@app.get("/api/data-quality", response_model=schemas.DataTrustResponse)
def get_data_quality(db: Session = Depends(get_db)):
    res = calculate_data_trust_score(db, "srishti_user")
    return schemas.DataTrustResponse(
        overall_score=res["overall_score"],
        freshness=res["freshness"],
        completeness=res["completeness"],
        category_confidence=res["category_confidence"],
        duplicate_risk=res["duplicate_risk"],
        source_reliability=res["source_reliability"],
        issues=res["issues"]
    )

# --- SHORTCUTS ---

@app.get("/api/shortcuts", response_model=List[schemas.UserShortcutResponse])
def get_shortcuts(db: Session = Depends(get_db)):
    return db.query(UserShortcut).filter(UserShortcut.user_id == "srishti_user").all()

@app.post("/api/shortcuts", response_model=schemas.UserShortcutResponse)
def create_shortcut(shortcut: schemas.UserShortcutCreate, db: Session = Depends(get_db)):
    existing = db.query(UserShortcut).filter(
        UserShortcut.user_id == "srishti_user",
        UserShortcut.keyword.ilike(shortcut.keyword)
    ).first()
    if existing:
        existing.category = shortcut.category
        db.commit()
        return existing
        
    db_shortcut = UserShortcut(
        user_id="srishti_user",
        keyword=shortcut.keyword,
        category=shortcut.category
    )
    db.add(db_shortcut)
    db.commit()
    db.refresh(db_shortcut)
    return db_shortcut

@app.delete("/api/shortcuts/{id}")
def delete_shortcut(id: int, db: Session = Depends(get_db)):
    db.query(UserShortcut).filter(UserShortcut.id == id).delete()
    db.commit()
    return {"status": "success"}

# --- AI ANALYST ---

@app.post("/api/ai/chat", response_model=schemas.ChatResponse)
def ai_chat(req: schemas.ChatRequest, db: Session = Depends(get_db)):
    res = process_agent_query(db, "srishti_user", req.question)
    return schemas.ChatResponse(
        answer=res["answer"],
        trust_score=res["trust_score"],
        sources=[schemas.AIAnswerSourceSchema(**s) for s in res["sources"]],
        activity_trace=res["activity_trace"],
        abstained=res["abstained"],
        warnings=res["warnings"]
    )

@app.get("/api/ai/history")
def get_ai_history(db: Session = Depends(get_db)):
    return db.query(AIQuery).filter(AIQuery.user_id == "srishti_user").order_by(AIQuery.created_at.desc()).all()

# --- GPAY CSV IMPORT ---

@app.post("/api/import/csv", response_model=schemas.ImportResultResponse)
def import_csv(file: UploadFile = File(...), db: Session = Depends(get_db)):
    contents = file.file.read().decode("utf-8")
    csv_file = io.StringIO(contents)
    reader = csv.DictReader(csv_file)
    
    total = 0
    auto = 0
    matched_sc = 0
    ai_cl = 0
    need_rev = 0
    dups = 0
    refs = 0
    
    for row in reader:
        # Expected GPay CSV columns: Date, Merchant, Amount, Note
        date = row.get("Date", datetime.date.today().strftime("%Y-%m-%d"))
        merchant = row.get("Merchant", "Unknown Merchant")
        amount_str = row.get("Amount", "0.0")
        try:
            amount = float(amount_str)
        except ValueError:
            amount = 0.0
            
        note = row.get("Note", "")
        
        tx = ingest_transaction(db, "srishti_user", date, merchant, amount, note, source="gpay_csv")
        total += 1
        
        if tx.is_duplicate:
            dups += 1
        if tx.is_refund:
            refs += 1
            
        if tx.classification_method == "user_shortcut":
            matched_sc += 1
            auto += 1
        elif tx.classification_method == "keyword_rule":
            auto += 1
        elif tx.classification_method == "llm":
            ai_cl += 1
        elif tx.category == "Uncategorized":
            need_rev += 1
            
    db.commit()
    
    return schemas.ImportResultResponse(
        total_imported=total,
        auto_categorized=auto,
        matched_shortcuts=matched_sc,
        ai_classified=ai_cl,
        need_review=need_rev,
        duplicates_detected=dups,
        refunds_detected=refs
    )

# --- GMAIL INTEGRATION ---
from app.services.gmail import get_google_auth_url, exchange_code_for_token, fetch_recent_transaction_emails
from fastapi.responses import RedirectResponse

@app.get("/auth/google/login")
def google_login():
    client_id = os.getenv("GOOGLE_CLIENT_ID")
    client_secret = os.getenv("GOOGLE_CLIENT_SECRET")
    redirect_uri = os.getenv("GOOGLE_REDIRECT_URI", "http://localhost:8000/auth/google/callback")
    if not client_id:
         raise HTTPException(status_code=500, detail="Google credentials not configured in .env")
    auth_url = get_google_auth_url(redirect_uri, client_id, client_secret)
    return {"auth_url": auth_url}

@app.get("/auth/google/callback")
def google_callback(code: str, db: Session = Depends(get_db)):
    client_id = os.getenv("GOOGLE_CLIENT_ID")
    client_secret = os.getenv("GOOGLE_CLIENT_SECRET")
    redirect_uri = os.getenv("GOOGLE_REDIRECT_URI", "http://localhost:8000/auth/google/callback")
    exchange_code_for_token(code, redirect_uri, client_id, client_secret, db, "srishti_user")
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000").rstrip("/")
    return RedirectResponse(url=f"{frontend_url}/connect?gmail_connected=true")

@app.get("/api/gmail/status")
def gmail_status(db: Session = Depends(get_db)):
    from app.models import OAuthCredential
    connected = db.query(OAuthCredential).filter(
        OAuthCredential.user_id == "srishti_user", OAuthCredential.provider == "google"
    ).first() is not None
    return {"connected": connected}

@app.post("/api/sync/gmail")
def sync_gmail(db: Session = Depends(get_db)):
    try:
        parsed = fetch_recent_transaction_emails(db, "srishti_user")
        count = 0
        skipped = 0
        for tx_data in parsed:
            normalized = tx_data["merchant"].strip()
            already_imported = db.query(Transaction).filter(
                Transaction.user_id == "srishti_user",
                Transaction.date == tx_data["date"],
                Transaction.amount == abs(tx_data["amount"]),
                Transaction.normalized_merchant.ilike(normalized),
                Transaction.source == "gmail",
            ).first()
            if already_imported:
                skipped += 1
                continue
            ingest_transaction(
                db, 
                "srishti_user", 
                tx_data["date"], 
                tx_data["merchant"], 
                tx_data["amount"], 
                tx_data["note"], 
                source=tx_data["source"]
            )
            count += 1
        db.commit()
        return {"status": "success", "synced_transactions": count, "skipped_duplicates": skipped}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
