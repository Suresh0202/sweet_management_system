from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class Sweet(Base):
    __tablename__ = "sweets"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String(100), nullable=False, index=True)
    category = Column(String(50), nullable=False, index=True)
    price = Column(Numeric(10, 2), nullable=False, index=True)
    quantity = Column(Integer, default=0, nullable=False)
    description = Column(Text, nullable=True)
    image_url = Column(String(255), nullable=True)
    created_by = Column(Integer, ForeignKey('users.id', ondelete='SET NULL'), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    purchases = relationship("PurchaseHistory", back_populates="sweet")
    inventory_logs = relationship("InventoryLog", back_populates="sweet")
    created_by_user = relationship("User", back_populates="created_sweets")
