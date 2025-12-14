import pytest


def test_sweet_service_create(db, test_sweet_data):
    """Test creating a sweet"""
    from app.services.sweet_service import SweetService
    from app.schemas.sweet import SweetCreate
    
    sweet_service = SweetService(db)
    sweet_create = SweetCreate(**test_sweet_data)
    sweet = sweet_service.create_sweet(sweet_create)
    
    assert sweet.id is not None
    assert sweet.name == test_sweet_data["name"]
    assert sweet.price == test_sweet_data["price"]


def test_sweet_service_get_all(db, test_sweet_data):
    """Test getting all sweets"""
    from app.services.sweet_service import SweetService
    from app.schemas.sweet import SweetCreate
    
    sweet_service = SweetService(db)
    sweet_create = SweetCreate(**test_sweet_data)
    sweet_service.create_sweet(sweet_create)
    
    sweets = sweet_service.get_all_sweets()
    assert len(sweets) > 0
