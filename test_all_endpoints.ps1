$API_BASE = "http://localhost:8001/api/v1"

Write-Host "`n========== API ENDPOINT TESTS ==========" -ForegroundColor Cyan

# Health Check
Write-Host "`nTEST 1: Health Check" -ForegroundColor Yellow
try {
    $resp = Invoke-WebRequest -Uri "http://localhost:8001/health" -UseBasicParsing -ErrorAction Stop
    Write-Host "✓ Backend OK - Status: $($resp.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "✗ Backend DOWN" -ForegroundColor Red
    exit
}

# Get all sweets
Write-Host "`nTEST 2: Get All Sweets (PUBLIC)" -ForegroundColor Yellow
try {
    $resp = Invoke-WebRequest -Uri "$API_BASE/sweets" -UseBasicParsing -ErrorAction Stop
    $sweets = $resp.Content | ConvertFrom-Json
    Write-Host "✓ Found $($sweets.Count) sweets" -ForegroundColor Green
    if ($sweets.Count -gt 0) {
        $sweetId = $sweets[0].id
    }
} catch {
    Write-Host "✗ Error: $_" -ForegroundColor Red
}

# Get single sweet
Write-Host "`nTEST 3: Get Single Sweet by ID (PUBLIC)" -ForegroundColor Yellow
if ($sweetId) {
    try {
        $resp = Invoke-WebRequest -Uri "$API_BASE/sweets/$sweetId" -UseBasicParsing -ErrorAction Stop
        Write-Host "✓ Retrieved sweet ID $sweetId" -ForegroundColor Green
    } catch {
        Write-Host "✗ Error: $_" -ForegroundColor Red
    }
}

# Login
Write-Host "`nTEST 4: Login (AUTH)" -ForegroundColor Yellow
$loginBody = @{ username = "admin"; password = "Admin@1234" } | ConvertTo-Json
try {
    $resp = Invoke-WebRequest -Uri "$API_BASE/auth/login" -Method POST -Body $loginBody `
        -ContentType "application/json" -UseBasicParsing -ErrorAction Stop
    $login = $resp.Content | ConvertFrom-Json
    $adminToken = $login.access_token
    Write-Host "✓ Logged in successfully" -ForegroundColor Green
} catch {
    Write-Host "✗ Login failed: $_" -ForegroundColor Red
}

# Get profile
Write-Host "`nTEST 5: Get Profile (AUTHENTICATED)" -ForegroundColor Yellow
if ($adminToken) {
    try {
        $headers = @{ "Authorization" = "Bearer $adminToken" }
        $resp = Invoke-WebRequest -Uri "$API_BASE/auth/profile" -Headers $headers `
            -UseBasicParsing -ErrorAction Stop
        $profile = $resp.Content | ConvertFrom-Json
        Write-Host "✓ User: $($profile.username), Admin: $($profile.is_admin)" -ForegroundColor Green
    } catch {
        Write-Host "✗ Error: $_" -ForegroundColor Red
    }
}

# Create sweet
Write-Host "`nTEST 6: Create Sweet (ADMIN)" -ForegroundColor Yellow
if ($adminToken) {
    $createBody = @{
        name = "DELETE_TEST_SWEET"
        category = "Test"
        price = 99.99
        quantity = 10
        description = "Test sweet"
        image_url = "https://via.placeholder.com/200"
    } | ConvertTo-Json
    
    try {
        $headers = @{ "Authorization" = "Bearer $adminToken" }
        $resp = Invoke-WebRequest -Uri "$API_BASE/sweets" -Method POST -Body $createBody `
            -ContentType "application/json" -Headers $headers -UseBasicParsing -ErrorAction Stop
        $created = $resp.Content | ConvertFrom-Json
        $testSweetId = $created.id
        Write-Host "✓ Created sweet ID: $testSweetId" -ForegroundColor Green
    } catch {
        Write-Host "✗ Error: $_" -ForegroundColor Red
    }
}

# Update sweet
Write-Host "`nTEST 7: Update Sweet (ADMIN)" -ForegroundColor Yellow
if ($adminToken -and $testSweetId) {
    $updateBody = @{ name = "UPDATED_SWEET"; price = 149.99 } | ConvertTo-Json
    try {
        $headers = @{ "Authorization" = "Bearer $adminToken" }
        $resp = Invoke-WebRequest -Uri "$API_BASE/sweets/$testSweetId" -Method PUT -Body $updateBody `
            -ContentType "application/json" -Headers $headers -UseBasicParsing -ErrorAction Stop
        Write-Host "✓ Sweet updated successfully" -ForegroundColor Green
    } catch {
        Write-Host "✗ Error: $_" -ForegroundColor Red
    }
}

# DELETE sweet - THE MAIN TEST
Write-Host "`nTEST 8: DELETE Sweet (ADMIN) *** MAIN TEST ***" -ForegroundColor Yellow
if ($adminToken -and $testSweetId) {
    try {
        $headers = @{ "Authorization" = "Bearer $adminToken" }
        $resp = Invoke-WebRequest -Uri "$API_BASE/sweets/$testSweetId" -Method DELETE `
            -Headers $headers -UseBasicParsing -ErrorAction Stop
        $deleteResp = $resp.Content | ConvertFrom-Json
        Write-Host "✓ DELETE SUCCESSFUL - Status: $($resp.StatusCode)" -ForegroundColor Green
        Write-Host "  Response: $($deleteResp.message)" -ForegroundColor Green
    } catch {
        Write-Host "✗ DELETE FAILED - Error: $($_.Exception.Message)" -ForegroundColor Red
        if ($_.Exception.Response) {
            Write-Host "  HTTP Status: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
        }
    }
}

# Purchase
Write-Host "`nTEST 9: Purchase Item (AUTHENTICATED)" -ForegroundColor Yellow
if ($adminToken -and $sweetId) {
    $purchaseBody = @{ sweet_id = $sweetId; quantity = 1 } | ConvertTo-Json
    try {
        $headers = @{ "Authorization" = "Bearer $adminToken" }
        $resp = Invoke-WebRequest -Uri "$API_BASE/inventory/purchase" -Method POST -Body $purchaseBody `
            -ContentType "application/json" -Headers $headers -UseBasicParsing -ErrorAction Stop
        Write-Host "✓ Purchase successful" -ForegroundColor Green
    } catch {
        Write-Host "✗ Error: $_" -ForegroundColor Red
    }
}

# Get purchase history
Write-Host "`nTEST 10: Get Purchase History (AUTHENTICATED)" -ForegroundColor Yellow
if ($adminToken) {
    try {
        $headers = @{ "Authorization" = "Bearer $adminToken" }
        $resp = Invoke-WebRequest -Uri "$API_BASE/inventory/purchases" -Headers $headers `
            -UseBasicParsing -ErrorAction Stop
        $purchases = $resp.Content | ConvertFrom-Json
        Write-Host "✓ Found $($purchases.Count) purchase records" -ForegroundColor Green
    } catch {
        Write-Host "✗ Error: $_" -ForegroundColor Red
    }
}

# Frontend
Write-Host "`nTEST 11: Frontend Connectivity" -ForegroundColor Yellow
try {
    $resp = Invoke-WebRequest -Uri "http://localhost:5173" -UseBasicParsing -ErrorAction Stop
    Write-Host "✓ Frontend is running on http://localhost:5173" -ForegroundColor Green
} catch {
    Write-Host "✗ Frontend not accessible" -ForegroundColor Red
}

Write-Host "`n========== TESTS COMPLETED ==========" -ForegroundColor Cyan
