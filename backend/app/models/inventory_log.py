from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class InventoryLog(Base):
    __tablename__ = "inventory_logs"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    sweet_id = Column(Integer, ForeignKey("sweets.id", ondelete='CASCADE'), nullable=False, index=True)
    action = Column(String(20), nullable=False)  # 'RESTOCK' or 'PURCHASE'
    quantity_change = Column(Integer, nullable=False)
    performed_by = Column(Integer, ForeignKey("users.id", ondelete='CASCADE'), nullable=False)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    sweet = relationship("Sweet", back_populates="inventory_logs")
    performed_by_user = relationship("User", back_populates="inventory_logs")
