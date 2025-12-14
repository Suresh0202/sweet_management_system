import pytest
from fastapi.testclient import TestClient


def test_register(client, test_user_data):
    """Test user registration"""
    response = client.post(
        "/api/v1/auth/register",
        json=test_user_data
    )
    assert response.status_code == 200
    assert "access_token" in response.json()


def test_register_duplicate_username(client, test_user_data):
    """Test registration with duplicate username"""
    # First registration
    client.post("/api/v1/auth/register", json=test_user_data)
    
    # Second registration with same username
    response = client.post(
        "/api/v1/auth/register",
        json=test_user_data
    )
    assert response.status_code == 400


def test_login(client, test_user_data):
    """Test user login"""
    # Register first
    client.post("/api/v1/auth/register", json=test_user_data)
    
    # Login
    response = client.post(
        "/api/v1/auth/login",
        params={
            "username": test_user_data["username"],
            "password": test_user_data["password"]
        }
    )
    assert response.status_code == 200
    assert "access_token" in response.json()


def test_login_invalid_credentials(client):
    """Test login with invalid credentials"""
    response = client.post(
        "/api/v1/auth/login",
        params={
            "username": "nonexistent",
            "password": "wrongpassword"
        }
    )
    assert response.status_code == 401
