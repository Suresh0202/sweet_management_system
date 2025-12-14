from sqlalchemy.orm import Session
from typing import List
from app.repositories.sweet_repository import SweetRepository
from app.repositories.purchase_repository import PurchaseRepository
from app.repositories.user_repository import UserRepository
from app.models.inventory_log import InventoryLog


class InventoryService:
    def __init__(self, db: Session):
        self.db = db
        self.sweet_repo = SweetRepository(db)
        self.purchase_repo = PurchaseRepository(db)
        self.user_repo = UserRepository(db)
    
    def purchase_sweet(self, user_id: int, sweet_id: int, quantity: int):
        """Purchase a sweet"""
        sweet = self.sweet_repo.get_by_id(sweet_id)
        
        if not sweet:
            raise ValueError("Sweet not found")
        
        if sweet.quantity < quantity:
            raise ValueError("Insufficient stock")
        
        # Create purchase record
        total_price = float(sweet.price) * quantity
        purchase = self.purchase_repo.create(
            user_id=user_id,
            sweet_id=sweet_id,
            quantity=quantity,
            total_price=total_price
        )
        
        # Update sweet quantity
        sweet.quantity -= quantity
        self.db.commit()
        
        # Log inventory change
        self._create_inventory_log(
            sweet_id=sweet_id,
            action="PURCHASE",
            quantity_change=-quantity,
            performed_by=user_id,
            notes=f"Purchase of {quantity} units by user {user_id}"
        )
        
        return purchase
    
    def restock_sweet(self, sweet_id: int, quantity: int, user_id: int, notes: str = ""):
        """Restock a sweet"""
        sweet = self.sweet_repo.get_by_id(sweet_id)
        
        if not sweet:
            raise ValueError("Sweet not found")
        
        previous_quantity = sweet.quantity
        sweet.quantity += quantity
        self.db.commit()
        
        # Log inventory change
        log = self._create_inventory_log(
            sweet_id=sweet_id,
            action="RESTOCK",
            quantity_change=quantity,
            performed_by=user_id,
            notes=notes or f"Restock of {quantity} units"
        )
        
        return log
    
    def get_inventory_history(self, sweet_id: int) -> List[InventoryLog]:
        """Get inventory history for a sweet"""
        return self.db.query(InventoryLog)\
            .filter(InventoryLog.sweet_id == sweet_id)\
            .order_by(InventoryLog.created_at.desc())\
            .all()
    
    def _create_inventory_log(
        self,
        sweet_id: int,
        action: str,
        quantity_change: int,
        performed_by: int,
        notes: str = None
    ) -> InventoryLog:
        """Create an inventory log entry"""
        log = InventoryLog(
            sweet_id=sweet_id,
            action=action,
            quantity_change=quantity_change,
            performed_by=performed_by,
            notes=notes
        )
        self.db.add(log)
        self.db.commit()
        self.db.refresh(log)
        return log
