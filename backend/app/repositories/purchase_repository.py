from sqlalchemy.orm import Session
from typing import List
from app.models.purchase import PurchaseHistory


class PurchaseRepository:
    def __init__(self, db: Session):
        self.db = db
    
    def create(
        self,
        user_id: int,
        sweet_id: int,
        quantity: int,
        total_price: float
    ) -> PurchaseHistory:
        """Create a new purchase"""
        purchase = PurchaseHistory(
            user_id=user_id,
            sweet_id=sweet_id,
            quantity=quantity,
            total_price=total_price
        )
        self.db.add(purchase)
        self.db.commit()
        self.db.refresh(purchase)
        return purchase
    
    def get_by_id(self, purchase_id: int) -> PurchaseHistory:
        """Get purchase by ID"""
        return self.db.query(PurchaseHistory).filter(PurchaseHistory.id == purchase_id).first()
    
    def get_by_user(self, user_id: int) -> List[PurchaseHistory]:
        """Get all purchases by user"""
        return self.db.query(PurchaseHistory).filter(PurchaseHistory.user_id == user_id).all()
    
    def get_by_sweet(self, sweet_id: int) -> List[PurchaseHistory]:
        """Get all purchases for a sweet"""
        return self.db.query(PurchaseHistory).filter(PurchaseHistory.sweet_id == sweet_id).all()
    
    def delete(self, purchase: PurchaseHistory) -> bool:
        """Delete purchase"""
        self.db.delete(purchase)
        self.db.commit()
        return True
