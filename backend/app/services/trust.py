from sqlalchemy.orm import Session
from app.models import Transaction, DataSource
import datetime

def calculate_data_trust_score(db: Session, user_id: str) -> dict:
    txs = db.query(Transaction).filter(Transaction.user_id == user_id).all()
    if not txs:
        return {
            "overall_score": 100.0,
            "freshness": 100.0,
            "completeness": 100.0,
            "category_confidence": 100.0,
            "duplicate_risk": 100.0,
            "source_reliability": 100.0,
            "issues": ["No transactions loaded yet."]
        }
        
    total_count = len(txs)
    uncategorized = sum(1 for t in txs if t.category == "Uncategorized")
    duplicates = sum(1 for t in txs if t.is_duplicate)
    
    # 1. Completeness
    completeness = max(0.0, 100.0 - (uncategorized / total_count * 100.0))
    
    # 2. Freshness
    # Today is 2026-08-08
    today = datetime.date(2026, 8, 8)
    dates = []
    for t in txs:
        try:
            dates.append(datetime.datetime.strptime(t.date, "%Y-%m-%d").date())
        except ValueError:
            pass
            
    if dates:
        latest = max(dates)
        diff = (today - latest).days
        if diff <= 1:
            freshness = 98.0
        elif diff <= 3:
            freshness = 85.0
        elif diff <= 7:
            freshness = 70.0
        else:
            freshness = 50.0
    else:
        freshness = 50.0
        
    # 3. Category Confidence
    total_conf = sum(t.confidence for t in txs)
    # Convert from 0-1 or 0-100 normalization
    avg_conf = (total_conf / total_count)
    if avg_conf <= 1.0:
        avg_conf *= 100.0
    category_confidence = round(avg_conf, 1)
    
    # 4. Duplicate Risk
    duplicate_risk = max(0.0, 100.0 - (duplicates * 5.0))
    
    # 5. Source Reliability
    source_reliability = 95.0
    
    # Global score weighted average
    overall = (completeness * 0.3) + (freshness * 0.2) + (category_confidence * 0.25) + (duplicate_risk * 0.15) + (source_reliability * 0.1)
    overall_score = round(overall, 1)
    
    issues = []
    if uncategorized > 0:
        issues.append(f"⚠ {uncategorized} uncategorized transactions")
    if duplicates > 0:
        issues.append(f"⚠ {duplicates} possible duplicates")
    if freshness < 80:
        issues.append("⚠ Stale data source: latest import is old")
        
    return {
        "overall_score": overall_score,
        "freshness": round(freshness, 1),
        "completeness": round(completeness, 1),
        "category_confidence": round(category_confidence, 1),
        "duplicate_risk": round(duplicate_risk, 1),
        "source_reliability": round(source_reliability, 1),
        "issues": issues
    }
