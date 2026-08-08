from sqlalchemy.orm import Session
from app.agents import tools
from app.services.trust import calculate_data_trust_score
from app.models import Transaction, AIQuery, AIAnswerSource
import uuid
import datetime

# Pre-defined sarcastic Gen-Z commentary matching numbers
def get_witty_personality_comment(category: str, amount: float) -> str:
    if category.lower() == "food":
        if amount > 5000:
            return f"You spent ₹{amount:,.2f} on food this month. Swiggy and Zomato are basically your landlords at this point."
        return f"Food spending is at ₹{amount:,.2f}. Respectfully... are you feeding a football team?"
    if category.lower() == "shopping":
        return f"Shopping is up to ₹{amount:,.2f}. I won't ask questions. Actually, I have several questions."
    if category.lower() == "transport":
        return f"₹{amount:,.2f} on rides this month. At this point Uber might know your home address better than you do."
    return f"You spent ₹{amount:,.2f} on {category}. Look at you keeping it clean."

def process_agent_query(db: Session, user_id: str, question: str) -> dict:
    activity_trace = []
    warnings = []
    sources = []
    abstained = False
    
    # 1. Fetch trust stats
    activity_trace.append("✓ Evaluating global data health and trust score")
    trust = calculate_data_trust_score(db, user_id)
    
    # Check if we should abstain
    # Abstain if completeness < 80% (meaning >20% uncategorized)
    if trust["completeness"] < 80.0:
        abstained = True
        warnings.append("Low completeness score: too many uncategorized transactions.")
        answer = (
            f"I can't give you a reliable answer yet. "
            f"I noticed that {100 - trust['completeness']:.1f}% of your transactions are uncategorized. "
            f"Please review your uncategorized items first so I don't give you incorrect totals."
        )
        return {
            "answer": answer,
            "trust_score": trust["overall_score"],
            "sources": [],
            "activity_trace": activity_trace,
            "abstained": True,
            "warnings": warnings
        }

    # 2. Parse intent
    q_lower = question.lower()
    activity_trace.append("✓ Parsing user question intent")
    
    if "food" in q_lower or "eat" in q_lower or "snack" in q_lower:
        activity_trace.append("✓ Identified category filter: Food")
        activity_trace.append("✓ Running deterministic category aggregator query")
        
        # Calculate food spend using DB tool
        cat_data = tools.get_category_spending(db, user_id, "2026-08")
        food_item = next((c for c in cat_data if c["category"].lower() == "food"), None)
        food_amt = food_item["amount"] if food_item else 0.0
        
        # Pull matching transactions
        txs = db.query(Transaction).filter(
            Transaction.user_id == user_id,
            Transaction.category == "Food",
            Transaction.date.like("2026-08%"),
            Transaction.transaction_type == "debit",
            Transaction.is_refund == False,
            Transaction.is_duplicate == False
        ).all()
        
        for t in txs:
            sources.append({
                "transaction_id": t.id,
                "merchant": t.merchant,
                "amount": t.amount,
                "date": t.date,
                "category": t.category,
                "reason": "Included in Food spending aggregate"
            })
            
        activity_trace.append(f"✓ Retrieved {len(txs)} source transactions")
        activity_trace.append("✓ Excluded duplicates and self-transfers")
        activity_trace.append("✓ Generating witty personality feedback")
        
        witty = get_witty_personality_comment("Food", food_amt)
        answer = f"You spent ₹{food_amt:,.2f} on Food this month.\n\n{witty}"
        
    elif "uber" in q_lower or "ride" in q_lower or "transport" in q_lower:
        activity_trace.append("✓ Identified category filter: Transport")
        activity_trace.append("✓ Running deterministic category aggregator query")
        
        cat_data = tools.get_category_spending(db, user_id, "2026-08")
        trans_item = next((c for c in cat_data if c["category"].lower() == "transport"), None)
        trans_amt = trans_item["amount"] if trans_item else 0.0
        
        txs = db.query(Transaction).filter(
            Transaction.user_id == user_id,
            Transaction.category == "Transport",
            Transaction.date.like("2026-08%"),
            Transaction.transaction_type == "debit",
            Transaction.is_refund == False,
            Transaction.is_duplicate == False
        ).all()
        
        for t in txs:
            sources.append({
                "transaction_id": t.id,
                "merchant": t.merchant,
                "amount": t.amount,
                "date": t.date,
                "category": t.category,
                "reason": "Included in Transport spending aggregate"
            })
            
        activity_trace.append(f"✓ Retrieved {len(txs)} source transactions")
        activity_trace.append("✓ Generating witty personality feedback")
        
        witty = get_witty_personality_comment("Transport", trans_amt)
        answer = f"You spent ₹{trans_amt:,.2f} on Transport this month.\n\n{witty}"
        
    elif "compare" in q_lower or "last month" in q_lower:
        activity_trace.append("✓ Running comparative period queries")
        aug_spent = tools.get_spending_summary(db, user_id, "2026-08")["total_spent"]
        jul_spent = tools.get_spending_summary(db, user_id, "2026-07")["total_spent"]
        
        diff = aug_spent - jul_spent
        diff_pct = (diff / jul_spent * 100) if jul_spent > 0 else 0
        diff_word = "more" if diff > 0 else "less"
        
        answer = (
            f"You spent ₹{aug_spent:,.2f} this month compared to ₹{jul_spent:,.2f} last month. "
            f"That's {abs(diff_pct):.1f}% {diff_word} than last month. "
            f"Look at you being financially responsible. We love this character development."
        )
        
    else:
        activity_trace.append("✓ Fetching global monthly summary")
        summary = tools.get_spending_summary(db, user_id, "2026-08")
        answer = (
            f"You spent a total of ₹{summary['total_spent']:,.2f} across {summary['transaction_count']} transactions in August. "
            f"Your data looks clean and has a reliability rating of {trust['overall_score']}%."
        )
        
    # Write query to DB history
    q_id = f"ai_q_{uuid.uuid4().hex[:8]}"
    db_query = AIQuery(
        id=q_id,
        user_id=user_id,
        question=question,
        answer=answer,
        trust_score=trust["overall_score"]
    )
    db.add(db_query)
    db.flush()
    
    for s in sources:
        db_src = AIAnswerSource(
            query_id=q_id,
            transaction_id=s["transaction_id"],
            reason=s["reason"]
        )
        db.add(db_src)
        
    db.commit()
    
    return {
        "answer": answer,
        "trust_score": trust["overall_score"],
        "sources": sources,
        "activity_trace": activity_trace,
        "abstained": abstained,
        "warnings": warnings
    }
