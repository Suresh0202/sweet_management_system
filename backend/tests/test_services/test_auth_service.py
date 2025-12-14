import pytest


def test_auth_service_register(db, test_user_data):
    """Test auth service registration"""
    from app.services.auth_service import AuthService
    
    auth_service = AuthService(db)
    token = auth_service.register(test_user_data)
    
    assert token is not None
    assert token.access_token
    assert token.token_type == "bearer"


def test_auth_service_login(db, test_user_data):
    """Test auth service login"""
    from app.services.auth_service import AuthService
    
    auth_service = AuthService(db)
    # Register first
    auth_service.register(test_user_data)
    
    # Login
    token = auth_service.login(test_user_data["username"], test_user_data["password"])
    assert token is not None
    assert token.access_token
