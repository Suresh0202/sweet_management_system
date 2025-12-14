from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.sweet import Sweet


class SweetRepository:
    def __init__(self, db: Session):
        self.db = db
    
    def create(
        self,
        name: str,
        price: float,
        description: Optional[str] = None,
        quantity: int = 0,
        category: Optional[str] = None,
        image_url: Optional[str] = None
    ) -> Sweet:
        """Create a new sweet"""
        sweet = Sweet(
            name=name,
            price=price,
            description=description,
            quantity=quantity,
            category=category,
            image_url=image_url
        )
        self.db.add(sweet)
        self.db.commit()
        self.db.refresh(sweet)
        return sweet
    
    def get_by_id(self, sweet_id: int) -> Sweet:
        """Get sweet by ID"""
        return self.db.query(Sweet).filter(Sweet.id == sweet_id).first()
    
    def get_all(
        self,
        skip: int = 0,
        limit: int = 100,
        category: Optional[str] = None
    ) -> List[Sweet]:
        """Get all sweets with optional category filter"""
        query = self.db.query(Sweet)
        
        if category:
            query = query.filter(Sweet.category == category)
        
        return query.offset(skip).limit(limit).all()
    
    def update(self, sweet: Sweet, data: dict) -> Sweet:
        """Update sweet"""
        for key, value in data.items():
            if value is not None:
                setattr(sweet, key, value)
        self.db.commit()
        self.db.refresh(sweet)
        return sweet
    
    def delete(self, sweet: Sweet) -> bool:
        """Delete sweet - cascade delete inventory logs and purchases"""
        from app.models.inventory_log import InventoryLog
        from app.models.purchase import PurchaseHistory
        
        # Delete related inventory logs first
        self.db.query(InventoryLog).filter(InventoryLog.sweet_id == sweet.id).delete()
        
        # Delete related purchases
        self.db.query(PurchaseHistory).filter(PurchaseHistory.sweet_id == sweet.id).delete()
        
        # Delete the sweet
        self.db.delete(sweet)
        self.db.commit()
        return True
