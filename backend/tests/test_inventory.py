import pytest


def test_purchase_sweet_unauthorized(client):
    """Test purchasing sweet without authentication"""
    response = client.post(
        "/api/v1/inventory/purchase",
        json={"sweet_id": 1, "quantity": 2}
    )
    assert response.status_code == 403


def test_restock_sweet_unauthorized(client):
    """Test restocking sweet without authentication"""
    response = client.post(
        "/api/v1/inventory/restock",
        params={"sweet_id": 1, "quantity": 10}
    )
    assert response.status_code == 403


def test_get_inventory_history_unauthorized(client):
    """Test getting inventory history without authentication"""
    response = client.get("/api/v1/inventory/history/1")
    assert response.status_code == 403
