from sqlalchemy.orm import Session
from typing import List, Optional
from app.schemas.sweet import SweetCreate, SweetUpdate
from app.repositories.sweet_repository import SweetRepository


class SweetService:
    def __init__(self, db: Session):
        self.db = db
        self.sweet_repo = SweetRepository(db)
    
    def get_all_sweets(
        self,
        skip: int = 0,
        limit: int = 100,
        category: Optional[str] = None
    ) -> List:
        """Get all sweets with optional category filter"""
        return self.sweet_repo.get_all(skip, limit, category)
    
    def get_sweet_by_id(self, sweet_id: int):
        """Get a sweet by ID"""
        return self.sweet_repo.get_by_id(sweet_id)
    
    def create_sweet(self, sweet_create: SweetCreate):
        """Create a new sweet"""
        return self.sweet_repo.create(
            name=sweet_create.name,
            description=sweet_create.description,
            price=sweet_create.price,
            quantity=sweet_create.quantity,
            category=sweet_create.category,
            image_url=sweet_create.image_url
        )
    
    def update_sweet(self, sweet_id: int, sweet_update: SweetUpdate):
        """Update a sweet"""
        sweet = self.sweet_repo.get_by_id(sweet_id)
        if not sweet:
            return None
        
        update_data = sweet_update.dict(exclude_unset=True)
        return self.sweet_repo.update(sweet, update_data)
    
    def delete_sweet(self, sweet_id: int) -> bool:
        """Delete a sweet"""
        sweet = self.sweet_repo.get_by_id(sweet_id)
        if not sweet:
            return False
        
        return self.sweet_repo.delete(sweet)
