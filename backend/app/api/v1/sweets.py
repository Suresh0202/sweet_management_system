from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.sweet import Sweet, SweetCreate, SweetUpdate
from app.api.deps import get_current_user, get_current_admin
from app.services.sweet_service import SweetService

router = APIRouter()


@router.get("/", response_model=List[Sweet])
def get_sweets(
    skip: int = 0,
    limit: int = 100,
    category: str = None,
    db: Session = Depends(get_db)
):
    """Get all sweets with optional filtering"""
    sweet_service = SweetService(db)
    return sweet_service.get_all_sweets(skip, limit, category)


@router.get("/{sweet_id}", response_model=Sweet)
def get_sweet(sweet_id: int, db: Session = Depends(get_db)):
    """Get a specific sweet by ID"""
    sweet_service = SweetService(db)
    sweet = sweet_service.get_sweet_by_id(sweet_id)
    
    if not sweet:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sweet not found"
        )
    
    return sweet


@router.post("/", response_model=Sweet)
def create_sweet(
    sweet_create: SweetCreate,
    current_user = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Create a new sweet (admin only)"""
    sweet_service = SweetService(db)
    return sweet_service.create_sweet(sweet_create)


@router.put("/{sweet_id}", response_model=Sweet)
def update_sweet(
    sweet_id: int,
    sweet_update: SweetUpdate,
    current_user = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Update a sweet (admin only)"""
    sweet_service = SweetService(db)
    sweet = sweet_service.update_sweet(sweet_id, sweet_update)
    
    if not sweet:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sweet not found"
        )
    
    return sweet


@router.delete("/{sweet_id}")
def delete_sweet(
    sweet_id: int,
    current_user = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Delete a sweet (admin only)"""
    sweet_service = SweetService(db)
    success = sweet_service.delete_sweet(sweet_id)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sweet not found"
        )
    
    return {"success": True, "message": "Sweet deleted successfully"}
