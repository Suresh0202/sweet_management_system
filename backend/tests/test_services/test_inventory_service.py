import pytest


def test_restock_sweet(db, test_sweet_data):
    """Test restocking a sweet"""
    from app.services.sweet_service import SweetService
    from app.services.inventory_service import InventoryService
    from app.schemas.sweet import SweetCreate
    
    sweet_service = SweetService(db)
    inventory_service = InventoryService(db)
    
    # Create sweet
    sweet_create = SweetCreate(**test_sweet_data)
    sweet = sweet_service.create_sweet(sweet_create)
    
    # Restock
    log = inventory_service.restock_sweet(sweet.id, 5, performed_by_id=1)
    
    assert log is not None
    assert log.action == "RESTOCK"
    assert log.quantity_change == 5
