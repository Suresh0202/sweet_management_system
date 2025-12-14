#!/usr/bin/env python3
"""
Test the restock endpoint directly
"""
import requests
import json

API_BASE = "http://localhost:8001/api/v1"

print("\n[TEST] Restock Endpoint Validation\n")

# 1. Login first
print("1. Login to get token...")
login_response = requests.post(f"{API_BASE}/auth/login", params={
    "username": "admin",
    "password": "Admin@1234"
})

if login_response.status_code != 200:
    print(f"[ERROR] Login failed: {login_response.status_code}")
    print(f"Response: {login_response.text}")
    exit(1)

token = login_response.json().get('access_token')
print(f"[OK] Token obtained: {token[:50]}...")

# 2. Test restock with valid payload
headers = {"Authorization": f"Bearer {token}"}

print("\n2. Testing restock endpoint...")
restock_payload = {
    "sweet_id": 3,
    "quantity": 10,
    "notes": "Test restock"
}

print(f"Payload: {json.dumps(restock_payload, indent=2)}")

restock_response = requests.post(
    f"{API_BASE}/inventory/restock",
    json=restock_payload,
    headers=headers
)

print(f"Status Code: {restock_response.status_code}")
print(f"Response: {restock_response.text}")

if restock_response.status_code == 200:
    print("\n[OK] Restock successful!")
else:
    print(f"\n[ERROR] Restock failed: {restock_response.status_code}")
    print("\nDetailed response:")
    try:
        print(json.dumps(restock_response.json(), indent=2))
    except:
        print(restock_response.text)
