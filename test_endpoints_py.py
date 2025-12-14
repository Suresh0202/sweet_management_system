#!/usr/bin/env python3
"""
Comprehensive API endpoint testing script
Tests all endpoints without modifying code
"""

import requests
import json

API_BASE = "http://localhost:8001/api/v1"
FRONTEND_URL = "http://localhost:5173"

print("\n" + "="*50)
print("SWEET SHOP API ENDPOINT TESTS")
print("="*50)

# Test 1: Health Check
print("\nTEST 1: Health Check")
try:
    resp = requests.get("http://localhost:8001/health")
    print(f"[OK] Backend OK - Status: {resp.status_code}")
except Exception as e:
    print(f"[ERROR] Backend Error: {e}")
    exit(1)

# Test 2: Get all sweets (PUBLIC)
print("\nTEST 2: Get All Sweets (PUBLIC)")
try:
    resp = requests.get(f"{API_BASE}/sweets")
    data = resp.json()
    print(f"[OK] Found {len(data)} sweets")
    if len(data) > 0:
        sweet_id = data[0]['id']
        print(f"     First sweet: ID={sweet_id}, Name={data[0]['name']}")
except Exception as e:
    print(f"[ERROR] Error: {e}")

# Test 3: Get single sweet (PUBLIC)
print("\nTEST 3: Get Single Sweet by ID")
try:
    resp = requests.get(f"{API_BASE}/sweets/{sweet_id}")
    data = resp.json()
    print(f"[OK] Sweet: {data['name']}, Price: Rs{data['price']}")
except Exception as e:
    print(f"[ERROR] Error: {e}")

# Test 4: Login
print("\nTEST 4: Login (AUTH)")
try:
    resp = requests.post(f"{API_BASE}/auth/login", params={
        "username": "admin",
        "password": "Admin@1234"
    })
    login_data = resp.json()
    admin_token = login_data.get('access_token')
    if admin_token:
        print(f"[OK] Logged in successfully")
        print(f"     Token: {admin_token[:50]}...")
    else:
        print(f"[ERROR] No token in response: {login_data}")
except Exception as e:
    print(f"[ERROR] Login Error: {e}")
    exit(1)

# Test 5: Create Sweet (ADMIN)
print("\nTEST 5: Create Sweet (ADMIN)")
headers = {"Authorization": f"Bearer {admin_token}"}
create_data = {
    "name": "DELETE_TEST_SWEET",
    "category": "Test",
    "price": 99.99,
    "quantity": 10,
    "description": "API Test Sweet",
    "image_url": ""
}
try:
    resp = requests.post(f"{API_BASE}/sweets", json=create_data, headers=headers)
    print(f"     Status Code: {resp.status_code}")
    if resp.status_code == 200:
        data = resp.json()
        test_sweet_id = data['id']
        print(f"[OK] Created sweet ID: {test_sweet_id}")
    else:
        print(f"[ERROR] Create failed: {resp.status_code}")
except Exception as e:
    print(f"[ERROR] Error: {e}")

# Test 6: Update Sweet (ADMIN)
print("\nTEST 6: Update Sweet (ADMIN)")
update_data = {
    "name": "UPDATED_SWEET",
    "price": 149.99
}
try:
    resp = requests.put(f"{API_BASE}/sweets/{test_sweet_id}", json=update_data, headers=headers)
    if resp.status_code == 200:
        data = resp.json()
        print(f"[OK] Updated: {data['name']}, Price: Rs{data['price']}")
    else:
        print(f"[ERROR] Update failed: {resp.status_code}")
except Exception as e:
    print(f"[ERROR] Error: {e}")

# Test 7: DELETE Sweet (MAIN TEST)
print("\nTEST 7: DELETE Sweet (ADMIN) *** MAIN TEST ***")
try:
    resp = requests.delete(f"{API_BASE}/sweets/{test_sweet_id}", headers=headers)
    print(f"     Status Code: {resp.status_code}")
    if resp.status_code == 200:
        data = resp.json()
        print(f"[OK] DELETE SUCCESSFUL")
        print(f"     Response: {data.get('message', 'OK')}")
    else:
        print(f"[ERROR] DELETE FAILED: {resp.status_code}")
        print(f"     Response: {resp.text}")
except Exception as e:
    print(f"[ERROR] DELETE ERROR: {e}")

# Test 8: Purchase (AUTHENTICATED)
print("\nTEST 8: Purchase Item (AUTHENTICATED)")
purchase_data = {
    "sweet_id": sweet_id,
    "quantity": 1
}
try:
    resp = requests.post(f"{API_BASE}/inventory/purchase", json=purchase_data, headers=headers)
    if resp.status_code == 200:
        data = resp.json()
        print(f"[OK] Purchase successful - Total: Rs{data.get('total_price')}")
    else:
        print(f"[ERROR] Purchase failed: {resp.status_code}")
except Exception as e:
    print(f"[ERROR] Error: {e}")

# Test 9: Get Purchase History
print("\nTEST 9: Get Purchase History (AUTHENTICATED)")
try:
    resp = requests.get(f"{API_BASE}/inventory/purchases", headers=headers)
    if resp.status_code == 200:
        data = resp.json()
        print(f"[OK] Found {len(data)} purchase records")
    else:
        print(f"[ERROR] Failed: {resp.status_code}")
except Exception as e:
    print(f"[ERROR] Error: {e}")

# Test 10: Frontend
print("\nTEST 10: Frontend Connectivity")
try:
    resp = requests.get(FRONTEND_URL)
    if resp.status_code == 200:
        print(f"[OK] Frontend is running on {FRONTEND_URL}")
    else:
        print(f"[ERROR] Frontend returned status: {resp.status_code}")
except Exception as e:
    print(f"[ERROR] Frontend not accessible: {e}")

print("\n" + "="*50)
print("TESTS COMPLETED")
print("="*50 + "\n")
