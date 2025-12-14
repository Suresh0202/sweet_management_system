from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.purchase import PurchaseHistoryCreate
from app.api.deps import get_current_user, get_current_admin
from app.services.inventory_service import InventoryService

router = APIRouter()


@router.post("/purchase")
def purchase_sweet(
    purchase_data: PurchaseHistoryCreate,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Purchase a sweet"""
    inventory_service = InventoryService(db)
    
    try:
        purchase = inventory_service.purchase_sweet(
            user_id=current_user.id,
            sweet_id=purchase_data.sweet_id,
            quantity=purchase_data.quantity
        )
        return {
            "success": True,
            "message": "Purchase successful",
            "data": purchase
        }
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/restock")
def restock_sweet(
    sweet_id: int,
    quantity: int,
    current_user = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Restock a sweet (admin only)"""
    inventory_service = InventoryService(db)
    
    try:
        log = inventory_service.restock_sweet(sweet_id, quantity, current_user.id)
        return {
            "success": True,
            "message": "Restock successful",
            "data": log
        }
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get("/history/{sweet_id}")
def get_inventory_history(
    sweet_id: int,
    current_user = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Get inventory history for a sweet"""
    inventory_service = InventoryService(db)
    history = inventory_service.get_inventory_history(sweet_id)
    
    return {
        "success": True,
        "data": history
    }
