from sqlalchemy import Column, Integer, DateTime, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class PurchaseHistory(Base):
    __tablename__ = "purchase_history"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete='CASCADE'), nullable=False, index=True)
    sweet_id = Column(Integer, ForeignKey("sweets.id", ondelete='CASCADE'), nullable=False, index=True)
    quantity = Column(Integer, nullable=False)
    total_price = Column(Numeric(10, 2), nullable=False)
    purchase_date = Column(DateTime, default=datetime.utcnow, nullable=False)

    user = relationship("User", back_populates="purchases")
    sweet = relationship("Sweet", back_populates="purchases")
