import pytest


def test_get_sweets(client):
    """Test getting all sweets"""
    response = client.get("/api/v1/sweets/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_create_sweet_unauthorized(client, test_sweet_data):
    """Test creating sweet without authentication"""
    response = client.post(
        "/api/v1/sweets/",
        json=test_sweet_data
    )
    assert response.status_code == 403


def test_get_sweet_not_found(client):
    """Test getting non-existent sweet"""
    response = client.get("/api/v1/sweets/999")
    assert response.status_code == 404
