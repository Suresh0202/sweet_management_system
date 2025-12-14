from pydantic import BaseModel
from datetime import datetime


class PurchaseHistoryBase(BaseModel):
    sweet_id: int
    quantity: int


class PurchaseHistoryCreate(PurchaseHistoryBase):
    pass


class PurchaseHistory(PurchaseHistoryBase):
    id: int
    user_id: int
    total_price: float
    purchase_date: datetime

    class Config:
        from_attributes = True
