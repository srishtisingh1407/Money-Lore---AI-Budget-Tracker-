import re
from typing import List, Optional, Tuple
from sqlalchemy.orm import Session
from app.models import Transaction, UserShortcut, Merchant, DataQualityEvent
import datetime
import uuid

# Deterministic keywords mapping
KEYWORD_MAPPING = {
    # Food & Dining
    r'\b(tea|coffee|cafe|starbucks|ccd|chai|snacks|snack|cookie|biscuit|pastry|swiggy|zomato|pizza|burger|dinner|lunch|breakfast|bakery)\b': 'Food',
    # Transport
    r'\b(uber|ola|rapido|auto|cab|ride|metro|bus|travel|commute|train|flight|parking|petrol|fuel)\b': 'Transport',
    # Groceries
    r'\b(g|groceries|grocery|dmart|blinkit|instamart|zepto|bigbasket|milk|vegetables|fruits|mart)\b': 'Groceries',
    # Shopping
    r'\b(amazon|myntra|zara|hm|clothing|shoes|flipkart|shopping|store|mall|gadget|iphone|laptop)\b': 'Shopping',
    # Entertainment
    r'\b(netflix|spotify|youtube|disney|prime|movie|cinema|fun|game|steam|ticket|concert|club)\b': 'Entertainment',
    # Bills
    r'\b(rent|electricity|water|wifi|broadband|mobile|recharge|gas|insurance|bill)\b': 'Bills',
    # Health
    r'\b(gym|health|fitness|cult|hospital|doctor|medicine|pharmacy|meds|workout)\b': 'Health & Fitness',
    # Education
    r'\b(college|university|school|fees|book|course|udemy|coursera|exam)\b': 'Education',
}

MERCHANT_NORMALIZATION = {
    r'(?i)swiggy.*': 'Swiggy',
    r'(?i)zomato.*': 'Zomato',
    r'(?i)uber.*': 'Uber',
    r'(?i)rapido.*': 'Rapido',
    r'(?i)dmart.*': 'DMart',
    r'(?i)blinkit.*': 'Blinkit',
    r'(?i)instamart.*': 'Instamart',
    r'(?i)amazon.*': 'Amazon',
    r'(?i)myntra.*': 'Myntra',
    r'(?i)starbucks.*': 'Starbucks',
    r'(?i)netflix.*': 'Netflix',
    r'(?i)spotify.*': 'Spotify',
    r'(?i)cult\.?fit.*': 'Cult.Fit',
}

def normalize_merchant(name: str) -> str:
    cleaned = name.strip()
    for pattern, normalized in MERCHANT_NORMALIZATION.items():
        if re.search(pattern, cleaned):
            return normalized
    return cleaned

def clean_note(note: Optional[str]) -> str:
    if not note:
        return ""
    # Casing, extra spaces, strip punctuation
    return note.strip().lower()

def detect_transaction_type(merchant: str, note: str, amount: float) -> str:
    # Check if transfer
    note_lower = note.lower()
    merchant_lower = merchant.lower()
    
    if any(k in note_lower or k in merchant_lower for k in ['self transfer', 'to own account', 'bank transfer', 'wire transfer']):
        return "transfer"
    
    # Negative amount or refund indicators
    if amount < 0 or any(k in note_lower or k in merchant_lower for k in ['refund', 'cashback', 'reversal']):
        return "refund"
        
    return "debit"

def classify_transaction(
    db: Session,
    user_id: str,
    merchant: str,
    note: str,
    amount: float
) -> Tuple[str, str, float, str]:
    """
    Returns (category, method, confidence, reason)
    Priority:
    1. User-defined shortcut
    2. Deterministic keyword mapping
    3. Merchant mapping
    4. AI classification (mocked fallback here)
    5. Uncategorized
    """
    cleaned_note = clean_note(note)
    norm_merchant = normalize_merchant(merchant)
    
    # 1. User Shortcut check
    shortcuts = db.query(UserShortcut).filter(UserShortcut.user_id == user_id).all()
    for s in shortcuts:
        keyword_clean = s.keyword.strip().lower()
        # Exact match or note contains the exact keyword phrase
        if cleaned_note == keyword_clean or norm_merchant.lower() == keyword_clean:
            return s.category, "user_shortcut", 1.0, f"Matched user shortcut: {s.keyword} -> {s.category}"
            
    # 2. Deterministic keyword mapping
    for pattern, category in KEYWORD_MAPPING.items():
        if re.search(pattern, cleaned_note) or re.search(pattern, norm_merchant.lower()):
            return category, "keyword_rule", 0.98, f"Deterministic keyword matched category: {category}"
            
    # 3. Merchant defaults
    db_merchant = db.query(Merchant).filter(Merchant.normalized_name == norm_merchant).first()
    if db_merchant and db_merchant.default_category:
        return db_merchant.default_category, "merchant_rule", 0.95, f"Merchant pattern matched default: {db_merchant.default_category}"
        
    # 4. AI classification simulation
    # If the note is ambiguous like "stuff", "gift", "transfer", "abc"
    if cleaned_note in ["stuff", "gift", "cash", "other", "etc"]:
        return "Uncategorized", "llm", 0.61, "AI classifier: The note does not provide enough information to confidently assign a category."
        
    # Standard AI fallbacks
    if "rent" in cleaned_note:
        return "Bills", "llm", 0.99, "AI classified as Bills based on note context."
        
    return "Uncategorized", "uncategorized", 0.0, "Could not classify transaction."

def ingest_transaction(
    db: Session,
    user_id: str,
    date: str,
    merchant: str,
    amount: float,
    note: Optional[str] = None,
    source: str = "gpay_csv"
) -> Transaction:
    norm_merchant = normalize_merchant(merchant)
    cleaned_note = clean_note(note)
    
    tx_type = detect_transaction_type(norm_merchant, cleaned_note, amount)
    is_ref = tx_type == "refund"
    
    # Classify category
    category, method, confidence, reason = classify_transaction(db, user_id, norm_merchant, cleaned_note, amount)
    
    # Check duplicate risk
    # same date, same merchant, same amount
    existing_dup = db.query(Transaction).filter(
        Transaction.user_id == user_id,
        Transaction.date == date,
        Transaction.amount == amount,
        Transaction.normalized_merchant == norm_merchant
    ).first()
    
    is_dup = existing_dup is not None

    tx_id = f"tx_{uuid.uuid4().hex[:12]}"
    
    tx = Transaction(
        id=tx_id,
        user_id=user_id,
        date=date,
        merchant=merchant,
        normalized_merchant=norm_merchant,
        amount=abs(amount),
        category=category,
        transaction_type=tx_type,
        status="completed",
        source=source,
        note=note or "",
        is_refund=is_ref,
        is_duplicate=is_dup,
        confidence=confidence,
        classification_method=method,
        classification_reason=reason
    )
    
    db.add(tx)
    db.flush()
    
    # Create Data Quality Events if necessary
    if is_dup:
        event = DataQualityEvent(
            transaction_id=tx.id,
            type="duplicate_risk",
            severity="warning",
            description=f"Duplicate transaction candidate found for {merchant} on {date}"
        )
        db.add(event)
        
    if category == "Uncategorized":
        event = DataQualityEvent(
            transaction_id=tx.id,
            type="uncategorized",
            severity="warning",
            description=f"Transaction '{note}' from {merchant} is uncategorized."
        )
        db.add(event)
        
    return tx
