from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(UserBase):
    id: str

class UserResponse(UserBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True

class TransactionBase(BaseModel):
    date: str
    merchant: str
    amount: float
    currency: str = "INR"
    category: str = "Uncategorized"
    subcategory: Optional[str] = None
    transaction_type: str = "debit"
    status: str = "completed"
    source: str = "gpay_csv"
    note: Optional[str] = None
    description: Optional[str] = None
    is_refund: bool = False
    original_transaction_id: Optional[str] = None
    is_duplicate: bool = False
    confidence: float = 1.0
    classification_method: str = "uncategorized"
    classification_reason: Optional[str] = None

class TransactionCreate(TransactionBase):
    id: str
    user_id: str

class TransactionResponse(TransactionBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class UserShortcutBase(BaseModel):
    keyword: str
    category: str

class UserShortcutCreate(UserShortcutBase):
    pass

class UserShortcutResponse(UserShortcutBase):
    id: int
    user_id: str
    created_at: datetime

    class Config:
        from_attributes = True

class ImportResultResponse(BaseModel):
    total_imported: int
    auto_categorized: int
    matched_shortcuts: int
    ai_classified: int
    need_review: int
    duplicates_detected: int
    refunds_detected: int

class ChatRequest(BaseModel):
    question: str

class AIAnswerSourceSchema(BaseModel):
    transaction_id: str
    merchant: str
    amount: float
    date: str
    category: str
    reason: Optional[str] = None

class ChatResponse(BaseModel):
    answer: str
    trust_score: float
    sources: List[AIAnswerSourceSchema]
    activity_trace: List[str]
    abstained: bool
    warnings: List[str]

class DataTrustResponse(BaseModel):
    overall_score: float
    freshness: float
    completeness: float
    category_confidence: float
    duplicate_risk: float
    source_reliability: float
    issues: List[str]

class CategorySpend(BaseModel):
    name: str
    amount: float
    percentage: float

class DailySpend(BaseModel):
    name: str # Date or Day of week
    amount: float

class MonthlySpend(BaseModel):
    name: str # Month Name
    amount: float

class MerchantSpend(BaseModel):
    name: str
    amount: float

class AnalyticsSummary(BaseModel):
    total_spent: float
    total_saved: float
    daily_avg: float
    highest_day: DailySpend
    lowest_day: DailySpend
    biggest_category: str
    fastest_growing_category: Optional[str] = None
    weekend_spending: float
    weekday_spending: float
    change_percentage: float # Vs previous month

class OAuthCredentialBase(BaseModel):
    provider: str = "google"
    access_token: str
    refresh_token: Optional[str] = None
    token_uri: Optional[str] = None
    client_id: Optional[str] = None
    client_secret: Optional[str] = None
    scopes: Optional[str] = None

class OAuthCredentialCreate(OAuthCredentialBase):
    user_id: str

class OAuthCredentialResponse(OAuthCredentialBase):
    id: int
    user_id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
