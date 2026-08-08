from sqlalchemy import Column, String, Float, Boolean, DateTime, ForeignKey, Integer, Text, Table
from sqlalchemy.orm import relationship, declarative_base
import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    transactions = relationship("Transaction", back_populates="user")
    shortcuts = relationship("UserShortcut", back_populates="user")
    data_sources = relationship("DataSource", back_populates="user")
    ai_queries = relationship("AIQuery", back_populates="user")
    oauth_credentials = relationship("OAuthCredential", back_populates="user")

class Transaction(Base):
    __tablename__ = 'transactions'
    
    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey('users.id'), nullable=False)
    date = Column(String, nullable=False) # YYYY-MM-DD
    merchant = Column(String, nullable=False)
    normalized_merchant = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    currency = Column(String, default="INR")
    category = Column(String, nullable=False, default="Uncategorized")
    subcategory = Column(String, nullable=True)
    transaction_type = Column(String, default="debit") # debit, credit, transfer, refund
    status = Column(String, default="completed") # completed, pending, failed
    source = Column(String, default="gpay_csv") # gpay_csv, bank_statement, manual
    note = Column(String, nullable=True)
    description = Column(String, nullable=True)
    is_refund = Column(Boolean, default=False)
    original_transaction_id = Column(String, ForeignKey('transactions.id'), nullable=True)
    is_duplicate = Column(Boolean, default=False)
    confidence = Column(Float, default=1.0) # 0.0 to 1.0 (or 0-100)
    classification_method = Column(String, default="uncategorized") # user_shortcut, keyword_rule, merchant_rule, llm, manual, uncategorized
    classification_reason = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    
    user = relationship("User", back_populates="transactions")
    quality_events = relationship("DataQualityEvent", back_populates="transaction")
    answer_sources = relationship("AIAnswerSource", back_populates="transaction")

class Category(Base):
    __tablename__ = 'categories'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True, nullable=False)
    description = Column(String, nullable=True)

class Merchant(Base):
    __tablename__ = 'merchants'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True, nullable=False)
    normalized_name = Column(String, nullable=False)
    default_category = Column(String, nullable=True)

class UserShortcut(Base):
    __tablename__ = 'user_shortcuts'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String, ForeignKey('users.id'), nullable=False)
    keyword = Column(String, nullable=False)
    category = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    user = relationship("User", back_populates="shortcuts")

class DataSource(Base):
    __tablename__ = 'data_sources'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String, ForeignKey('users.id'), nullable=False)
    source_type = Column(String, nullable=False) # gpay_csv, etc.
    last_updated = Column(DateTime, default=datetime.datetime.utcnow)
    reliability_score = Column(Float, default=1.0)
    
    user = relationship("User", back_populates="data_sources")

class DataQualityEvent(Base):
    __tablename__ = 'data_quality_events'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    transaction_id = Column(String, ForeignKey('transactions.id'), nullable=False)
    type = Column(String, nullable=False) # duplicate_risk, uncategorized, stale_source, refund_mismatch, transfer_anomaly
    severity = Column(String, default="warning") # info, warning, critical
    description = Column(String, nullable=True)
    
    transaction = relationship("Transaction", back_populates="quality_events")

class AIQuery(Base):
    __tablename__ = 'ai_queries'
    
    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey('users.id'), nullable=False)
    question = Column(String, nullable=False)
    answer = Column(Text, nullable=False)
    trust_score = Column(Float, default=1.0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    user = relationship("User", back_populates="ai_queries")
    sources = relationship("AIAnswerSource", back_populates="query")
    evaluation_result = relationship("EvaluationResult", back_populates="query", uselist=False)

class AIAnswerSource(Base):
    __tablename__ = 'ai_answer_sources'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    query_id = Column(String, ForeignKey('ai_queries.id'), nullable=False)
    transaction_id = Column(String, ForeignKey('transactions.id'), nullable=False)
    reason = Column(String, nullable=True)
    
    query = relationship("AIQuery", back_populates="sources")
    transaction = relationship("Transaction", back_populates="answer_sources")

class EvaluationCase(Base):
    __tablename__ = 'evaluation_cases'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    question = Column(String, nullable=False)
    expected_answer = Column(String, nullable=True)
    expected_behavior = Column(String, nullable=True) # match_number, abstain, check_provenance

class EvaluationResult(Base):
    __tablename__ = 'evaluation_results'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    case_id = Column(Integer, ForeignKey('evaluation_cases.id'), nullable=False)
    query_id = Column(String, ForeignKey('ai_queries.id'), nullable=True)
    actual_answer = Column(Text, nullable=False)
    correct = Column(Boolean, default=True)
    hallucinated = Column(Boolean, default=False)
    abstained = Column(Boolean, default=False)
    score = Column(Float, default=1.0)
    
    query = relationship("AIQuery", back_populates="evaluation_result")
    case = relationship("EvaluationCase")

class OAuthCredential(Base):
    __tablename__ = 'oauth_credentials'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String, ForeignKey('users.id'), nullable=False, unique=True)
    provider = Column(String, default="google")
    access_token = Column(String, nullable=False)
    refresh_token = Column(String, nullable=True)
    token_uri = Column(String, nullable=True)
    client_id = Column(String, nullable=True)
    client_secret = Column(String, nullable=True)
    scopes = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    
    user = relationship("User", back_populates="oauth_credentials")
