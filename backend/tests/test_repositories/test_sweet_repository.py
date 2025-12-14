import pytest


def test_sweet_repository_create(db):
    """Test creating a sweet"""
    from app.repositories.sweet_repository import SweetRepository
    
    sweet_repo = SweetRepository(db)
    sweet = sweet_repo.create(
        name="Test Sweet",
        price=5.99,
        quantity=10
    )
    
    assert sweet.id is not None
    assert sweet.name == "Test Sweet"


def test_sweet_repository_get_by_id(db):
    """Test getting sweet by ID"""
    from app.repositories.sweet_repository import SweetRepository
    
    sweet_repo = SweetRepository(db)
    created_sweet = sweet_repo.create(
        name="Test Sweet",
        price=5.99,
        quantity=10
    )
    
    sweet = sweet_repo.get_by_id(created_sweet.id)
    assert sweet is not None
    assert sweet.name == "Test Sweet"
