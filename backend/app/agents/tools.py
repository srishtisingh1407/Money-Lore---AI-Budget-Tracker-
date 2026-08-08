from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models import Transaction, UserShortcut, DataQualityEvent
import datetime
from typing import Dict, Any, List

def get_spending_summary(db: Session, user_id: str, month: str = "2026-08") -> Dict[str, Any]:
    # Exclude transfers, refunds
    q = db.query(Transaction).filter(
        Transaction.user_id == user_id,
        Transaction.date.like(f"{month}%"),
        Transaction.transaction_type == "debit",
        Transaction.is_refund == False,
        Transaction.is_duplicate == False
    )
    total = q.with_entities(func.sum(Transaction.amount)).scalar() or 0.0
    count = q.count()
    return {"month": month, "total_spent": round(total, 2), "transaction_count": count}

def get_category_spending(db: Session, user_id: str, month: str = "2026-08") -> List[Dict[str, Any]]:
    # Aggregated category spending
    results = db.query(
        Transaction.category,
        func.sum(Transaction.amount).label("total"),
        func.count(Transaction.id).label("count")
    ).filter(
        Transaction.user_id == user_id,
        Transaction.date.like(f"{month}%"),
        Transaction.transaction_type == "debit",
        Transaction.is_refund == False,
        Transaction.is_duplicate == False
    ).group_by(Transaction.category).all()
    
    total_all = sum(r[1] for r in results) or 1.0
    return [
        {
            "category": r[0],
            "amount": round(r[1], 2),
            "count": r[2],
            "percentage": round((r[1] / total_all) * 100, 2)
        }
        for r in results
    ]

def get_merchant_spending(db: Session, user_id: str, month: str = "2026-08") -> List[Dict[str, Any]]:
    results = db.query(
        Transaction.normalized_merchant,
        func.sum(Transaction.amount).label("total")
    ).filter(
        Transaction.user_id == user_id,
        Transaction.date.like(f"{month}%"),
        Transaction.transaction_type == "debit",
        Transaction.is_refund == False,
        Transaction.is_duplicate == False
    ).group_by(Transaction.normalized_merchant).order_by(func.sum(Transaction.amount).desc()).all()
    
    return [{"merchant": r[0], "amount": round(r[1], 2)} for r in results]

def get_weekly_spending(db: Session, user_id: str, month: str = "2026-08") -> List[Dict[str, Any]]:
    # Weekly chunks for the month
    weeks = [
        ("Week 1", f"{month}-01", f"{month}-07"),
        ("Week 2", f"{month}-08", f"{month}-14"),
        ("Week 3", f"{month}-15", f"{month}-21"),
        ("Week 4", f"{month}-22", f"{month}-31"),
    ]
    data = []
    for label, start, end in weeks:
        val = db.query(func.sum(Transaction.amount)).filter(
            Transaction.user_id == user_id,
            Transaction.date >= start,
            Transaction.date <= end,
            Transaction.transaction_type == "debit",
            Transaction.is_refund == False,
            Transaction.is_duplicate == False
        ).scalar() or 0.0
        data.append({"name": label, "amount": round(val, 2)})
    return data

def get_monthly_spending(db: Session, user_id: str) -> List[Dict[str, Any]]:
    # Return last 3 months
    months = ["2026-06", "2026-07", "2026-08"]
    data = []
    for m in months:
        val = db.query(func.sum(Transaction.amount)).filter(
            Transaction.user_id == user_id,
            Transaction.date.like(f"{m}%"),
            Transaction.transaction_type == "debit",
            Transaction.is_refund == False,
            Transaction.is_duplicate == False
        ).scalar() or 0.0
        data.append({"name": m, "amount": round(val, 2)})
    return data

def get_data_quality(db: Session, user_id: str) -> Dict[str, Any]:
    # counts of quality flags
    uncategorized = db.query(Transaction).filter(
        Transaction.user_id == user_id,
        Transaction.category == "Uncategorized"
    ).count()
    
    duplicates = db.query(Transaction).filter(
        Transaction.user_id == user_id,
        Transaction.is_duplicate == True
    ).count()
    
    refunds = db.query(Transaction).filter(
        Transaction.user_id == user_id,
        Transaction.transaction_type == "refund"
    ).count()
    
    total = db.query(Transaction).filter(Transaction.user_id == user_id).count() or 1
    
    return {
        "uncategorized_count": uncategorized,
        "duplicate_count": duplicates,
        "refund_count": refunds,
        "total_count": total,
        "uncategorized_percentage": round((uncategorized / total) * 100, 2)
    }
