import pytest


def test_user_repository_create(db):
    """Test creating a user"""
    from app.repositories.user_repository import UserRepository
    
    user_repo = UserRepository(db)
    user = user_repo.create(
        username="testuser",
        email="test@example.com",
        hashed_password="hashedpassword"
    )
    
    assert user.id is not None
    assert user.username == "testuser"


def test_user_repository_get_by_username(db):
    """Test getting user by username"""
    from app.repositories.user_repository import UserRepository
    
    user_repo = UserRepository(db)
    user_repo.create(
        username="testuser",
        email="test@example.com",
        hashed_password="hashedpassword"
    )
    
    user = user_repo.get_by_username("testuser")
    assert user is not None
    assert user.username == "testuser"
