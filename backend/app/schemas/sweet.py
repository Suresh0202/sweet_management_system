from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class SweetBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    quantity: int = 0
    category: Optional[str] = None
    image_url: Optional[str] = None


class SweetCreate(SweetBase):
    pass


class SweetUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    quantity: Optional[int] = None
    category: Optional[str] = None
    image_url: Optional[str] = None


class Sweet(SweetBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
