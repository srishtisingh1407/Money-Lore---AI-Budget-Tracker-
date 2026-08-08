import random
import datetime
from sqlalchemy.orm import Session
from app.models import User, Transaction, Merchant, UserShortcut, Category, DataSource
from app.services.pipeline import ingest_transaction, normalize_merchant
import uuid

def seed_database(db: Session):
    # Check if user already exists
    srishti = db.query(User).filter(User.id == "srishti_user").first()
    if srishti:
        return
        
    # 1. Create Srishti User
    srishti = User(
        id="srishti_user",
        name="Srishti",
        email="srishti@spendingtea.com"
    )
    db.add(srishti)
    
    # 2. Add shortcuts
    shortcuts = [
        UserShortcut(user_id="srishti_user", keyword="G", category="Groceries"),
        UserShortcut(user_id="srishti_user", keyword="g", category="Groceries"),
        UserShortcut(user_id="srishti_user", keyword="Tea", category="Dining Out"),
        UserShortcut(user_id="srishti_user", keyword="Tea + snacks", category="Dining Out"),
        UserShortcut(user_id="srishti_user", keyword="Travel", category="Transportation"),
        UserShortcut(user_id="srishti_user", keyword="Gym", category="Health & Fitness"),
    ]
    for s in shortcuts:
        db.add(s)
        
    # 3. Create default merchants
    merchants = [
        Merchant(name="Swiggy", normalized_name="Swiggy", default_category="Food"),
        Merchant(name="Zomato", normalized_name="Zomato", default_category="Food"),
        Merchant(name="Uber", normalized_name="Uber", default_category="Transport"),
        Merchant(name="DMart", normalized_name="DMart", default_category="Groceries"),
        Merchant(name="Amazon", normalized_name="Amazon", default_category="Shopping"),
    ]
    for m in merchants:
        db.add(m)
        
    # 4. Data Source
    source = DataSource(
        user_id="srishti_user",
        source_type="gpay_csv",
        reliability_score=0.95
    )
    db.add(source)
    
    db.flush()
    
    # 5. Populate ~500 messy transactions
    # Dates: June 1, 2026 to August 8, 2026
    start_date = datetime.date(2026, 6, 1)
    end_date = datetime.date(2026, 8, 8)
    delta = end_date - start_date
    
    merchants_list = [
        ("SWIGGY", "Tea + snacks", 180.0, "Food"),
        ("swiggy", "Dinner order", 640.0, "Food"),
        ("SWIGGY*ORDER", "Office lunch", 420.0, "Food"),
        ("Zomato", "Weekend pizza", 1250.0, "Food"),
        ("ZOMATO*REST", "snack run", 340.0, "Food"),
        ("Uber India", "Travel to college", 280.0, "Transport"),
        ("UBER", "Travel to airport", 1850.0, "Transport"),
        ("Uber India", "Travel", 240.0, "Transport"),
        ("DMart", "G", 1540.0, "Groceries"),
        ("DMART", "grocery shopping", 3200.0, "Groceries"),
        ("Blinkit", "G", 890.0, "Groceries"),
        ("Blinkit", "Snack run", 1240.0, "Groceries"),
        ("Amazon", "Books", 650.0, "Shopping"),
        ("AMAZON*RET", "stuff for room", 4200.0, "Shopping"),
        ("Zara", "New clothes", 5800.0, "Shopping"),
        ("Netflix", "Monthly subscription", 649.0, "Entertainment"),
        ("Spotify", "Music sub", 179.0, "Entertainment"),
        ("Cult.Fit", "Gym", 2500.0, "Health & Fitness"),
        ("Rent payment", "to own account", 12000.0, "Bills"),
        ("Unknown Store", "stuff", 820.0, "Uncategorized"),
    ]
    
    # Generate 520 records
    current_day = start_date
    tx_count = 0
    
    while current_day <= end_date:
        # 4-6 transactions per day
        day_count = random.randint(4, 7)
        for _ in range(day_count):
            m_name, note, amount, default_cat = random.choice(merchants_list)
            # Add some randomness to amounts
            final_amount = round(amount * random.uniform(0.8, 1.3), 2)
            
            # Formats dates YYYY-MM-DD
            date_str = current_day.strftime("%Y-%m-%d")
            
            # Ingest
            ingest_transaction(
                db=db,
                user_id="srishti_user",
                date=date_str,
                merchant=m_name,
                amount=final_amount,
                note=note,
                source="gpay_csv"
            )
            tx_count += 1
            
        current_day += datetime.timedelta(days=1)
        
    # Add explicit duplicate, refund, transfer scenarios
    # Swiggy duplicate
    ingest_transaction(db, "srishti_user", "2026-08-07", "Swiggy", 800.0, "Tea + snacks")
    ingest_transaction(db, "srishti_user", "2026-08-07", "Swiggy", 800.0, "Tea + snacks") # duplicate!
    
    # Swiggy refund
    ingest_transaction(db, "srishti_user", "2026-08-05", "Swiggy", 1200.0, "Dinner order")
    ingest_transaction(db, "srishti_user", "2026-08-06", "Swiggy", -1200.0, "refund") # refund!
    
    # Self transfer
    ingest_transaction(db, "srishti_user", "2026-08-04", "Self Transfer", 5000.0, "to own account")
    
    # Uncategorized ABC Store
    ingest_transaction(db, "srishti_user", "2026-08-03", "ABC Store", 1450.0, "stuff")
    
    db.commit()
    print(f"Database seeded with {tx_count + 5} transactions successfully.")
