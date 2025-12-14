from fastapi import APIRouter, Depends, HTTPException, status, Body
from sqlalchemy.orm import Session
from pydantic import BaseModel, ConfigDict
from app.database import get_db
from app.schemas.purchase import PurchaseHistoryCreate
from app.api.deps import get_current_user, get_current_admin
from app.services.inventory_service import InventoryService

router = APIRouter()


class RestockRequest(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    sweet_id: int
    quantity: int
    notes: str = ""


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
    restock_data: RestockRequest = Body(...),
    current_user = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Restock a sweet (admin only)"""
    inventory_service = InventoryService(db)
    
    print(f"DEBUG: Restock request received")
    print(f"DEBUG: sweet_id={restock_data.sweet_id}, quantity={restock_data.quantity}, notes={restock_data.notes}")
    print(f"DEBUG: current_user={current_user.username if current_user else 'None'}")
    
    try:
        log = inventory_service.restock_sweet(
            sweet_id=restock_data.sweet_id,
            quantity=restock_data.quantity,
            user_id=current_user.id,
            notes=restock_data.notes
        )
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


@router.get("/purchases")
def get_user_purchases(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all purchases for the current user"""
    from app.models.purchase import PurchaseHistory
    purchases = db.query(PurchaseHistory).filter(
        PurchaseHistory.user_id == current_user.id
    ).order_by(PurchaseHistory.purchase_date.desc()).all()
    
    # Serialize with sweet name
    result = []
    for purchase in purchases:
        result.append({
            "id": purchase.id,
            "user_id": purchase.user_id,
            "sweet_id": purchase.sweet_id,
            "sweet_name": purchase.sweet.name if purchase.sweet else "N/A",
            "quantity": purchase.quantity,
            "total_price": float(purchase.total_price),
            "purchased_at": purchase.purchase_date.isoformat()
        })
    
    return {
        "success": True,
        "data": result
    }


@router.delete("/purchases")
def clear_user_purchases(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Clear all purchases for the current user"""
    from app.models.purchase import PurchaseHistory
    
    try:
        # Delete all purchases for current user
        deleted_count = db.query(PurchaseHistory).filter(
            PurchaseHistory.user_id == current_user.id
        ).delete()
        
        db.commit()
        
        return {
            "success": True,
            "message": f"Deleted {deleted_count} purchase(s)",
            "deleted_count": deleted_count
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to clear purchases: {str(e)}"
        )