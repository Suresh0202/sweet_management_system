# Complete Setup & Testing Guide

## 🎯 Project Overview

This is a **full-stack Sweet Shop Management System** built with:
- **Backend**: FastAPI + SQLAlchemy + SQLite + JWT Authentication
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Database**: SQLite with proper schema and migrations

## ✅ Prerequisites

Before starting, ensure you have:
- Python 3.8+ (`python --version`)
- Node.js 16+ (`node --version`)
- npm 7+ (`npm --version`)
- Git (optional, for version control)

## 🚀 Quick Start (5 minutes)

### Terminal 1: Start Backend
```powershell
cd backend
.\venv\Scripts\Activate.ps1  # Windows
# source venv/bin/activate  # macOS/Linux

python init_db.py  # Initialize database
uvicorn app.main:app --reload
```

Backend runs at: `http://localhost:8000`
API Docs: `http://localhost:8000/docs`

### Terminal 2: Start Frontend
```powershell
cd frontend
npm run dev
```

Frontend runs at: `http://localhost:5175` (or next available port)

## 📋 Step-by-Step Installation

### Backend Setup

1. **Create Virtual Environment**
```powershell
cd backend
python -m venv venv
```

2. **Activate Virtual Environment**
```powershell
# Windows PowerShell
.\venv\Scripts\Activate.ps1

# Windows Command Prompt
venv\Scripts\activate.bat

# macOS/Linux
source venv/bin/activate
```

3. **Install Dependencies**
```powershell
pip install -r requirements.txt
```

4. **Initialize Database**
```powershell
python init_db.py
```

Expected output:
```
Initializing database...
✓ Database initialized successfully!
✓ Database file: ./sweet_shop.db
```

5. **Create Environment File**
```powershell
Copy-Item .env.example .env
```

Edit `.env` if needed:
```
DATABASE_URL=sqlite:///./sweet_shop.db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DEBUG=True
```

6. **Start Backend Server**
```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

1. **Navigate to Frontend Directory**
```powershell
cd frontend
```

2. **Install Dependencies**
```powershell
npm install
```

This installs 50+ packages (takes 2-3 minutes)

3. **Create Environment File**
```powershell
Copy-Item .env.example .env
```

File should contain:
```
VITE_API_URL=http://localhost:8000/api/v1
```

4. **Start Development Server**
```powershell
npm run dev
```

Frontend opens at `http://localhost:5175`

## 🧪 Testing the Application

### Test Scenarios

#### 1. User Registration & Login
```
1. Go to http://localhost:5175/register
2. Create account:
   - Username: testuser
   - Email: test@example.com
   - Password: Test@1234
   - Confirm Password: Test@1234
3. Click Register
4. Should auto-login and redirect to home
```

#### 2. Browse Sweets
```
1. Homepage shows all available sweets
2. Try filters:
   - Search by name (e.g., "chocolate")
   - Filter by category
3. Verify sweets display correctly
```

#### 3. Purchase Sweet
```
1. Select a sweet from list
2. Adjust quantity (1-available stock)
3. Click "Buy" button
4. Should show success message
5. Quantity should decrease
```

#### 4. View Purchase History
```
1. Click "Dashboard" in navbar
2. View all your purchases
3. Check total spent amount
```

#### 5. Admin Functions (if admin user)
```
1. Click "Admin" in navbar (only visible if admin)
2. See all sweets in table format
3. Test operations:
   - Add new sweet (+ button)
   - Edit sweet (pencil icon)
   - Delete sweet (trash icon)
   - Restock (refresh icon)
```

#### 6. Logout
```
1. Click "Logout" button in navbar
2. Should redirect to login page
3. Trying to access protected routes should redirect to login
```

## 🔒 Test User Accounts

### Create Test Users via API

Use this to test with curl or Postman:

```bash
# Register
curl -X POST "http://localhost:8000/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"Test@1234"}'

# Login
curl -X POST "http://localhost:8000/api/v1/auth/login?username=testuser&password=Test@1234"
```

Or use the UI:
- **Regular User**: Navigate to /register and create account
- **Admin User**: Create via database directly (advanced)

## 📊 Test Data

### Add Some Test Sweets (via Admin Panel)

1. Login as admin
2. Go to Admin panel
3. Click "Add New Sweet"
4. Fill form:
   ```
   Name: Chocolate Truffles
   Category: Chocolate
   Price: 12.99
   Quantity: 50
   Description: Delicious homemade chocolate truffles
   Image URL: (optional)
   ```
5. Click "Add Sweet"

Repeat with more items in different categories.

## 🐛 Troubleshooting

### Backend Issues

**Error: Port 8000 already in use**
```powershell
# Use different port
uvicorn app.main:app --reload --port 8001
```

**Error: Database not found**
```powershell
# Reinitialize database
python init_db.py
```

**Error: ModuleNotFoundError**
```powershell
# Ensure venv is activated and dependencies installed
pip install -r requirements.txt
```

**Error: CORS issues**
- Backend has CORS enabled for http://localhost:5173
- If using different port, update vite.config.ts

### Frontend Issues

**Error: Cannot find module**
```powershell
# Clear cache and reinstall
npm cache clean --force
rm -r node_modules
npm install
```

**Error: Port 5173/5174/5175 already in use**
```powershell
# Vite auto-switches to next available port
# Check which port is actually running
npm run dev  # It will show the correct port
```

**Error: Cannot reach backend API**
```
1. Verify backend is running on port 8000
2. Check VITE_API_URL in .env
3. Check browser console for CORS errors
4. Verify .env.example exists and was copied to .env
```

**Blank page or 404 errors**
```
1. Check index.html is in root directory (not public/)
2. Check tsconfig.node.json exists
3. Rebuild: rm -r node_modules && npm install
```

## 📈 API Testing

### Using API Documentation

FastAPI provides interactive API docs:

1. **Swagger UI**: http://localhost:8000/docs
2. **ReDoc**: http://localhost:8000/redoc

### Manual Testing with curl

```bash
# Get all sweets
curl http://localhost:8000/api/v1/sweets

# Get specific sweet
curl http://localhost:8000/api/v1/sweets/1

# Search sweets
curl "http://localhost:8000/api/v1/sweets/search?q=chocolate&category=Chocolate"

# Purchase sweet (requires auth token)
curl -X POST http://localhost:8000/api/v1/inventory/purchase \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"sweet_id": 1, "quantity": 2}'
```

## 📱 Production Build

### Build Frontend for Production
```powershell
cd frontend
npm run build
```

Output in `dist/` folder - ready to deploy to Vercel, Netlify, etc.

### Build Backend for Production
```powershell
# Use gunicorn instead of uvicorn
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 app.main:app
```

## 📚 Key Files Reference

| File | Purpose |
|------|---------|
| `backend/init_db.py` | Initialize database schema |
| `backend/requirements.txt` | Python dependencies |
| `backend/app/main.py` | FastAPI application setup |
| `frontend/vite.config.ts` | Vite build configuration |
| `frontend/tsconfig.json` | TypeScript configuration |
| `.env` | Environment variables |
| `DATABASE_SCHEMA.md` | Database structure documentation |

## 🔄 Development Workflow

### Making Changes

**Backend Changes:**
1. Edit Python files
2. Server auto-reloads (if using `--reload`)
3. Changes take effect immediately
4. Test in API docs (http://localhost:8000/docs)

**Frontend Changes:**
1. Edit React/TypeScript files
2. HMR (Hot Module Replacement) auto-updates
3. Changes visible instantly in browser
4. Save file → see update in 1-2 seconds

### Committing Code

```bash
git add .
git commit -m "feat: Add sweet filtering"
git push
```

## ✅ Validation Checklist

Before considering the project complete:

- [ ] Backend starts without errors
- [ ] Database initializes successfully  
- [ ] Frontend compiles without errors
- [ ] Can access API docs at /docs
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Can browse sweets on home page
- [ ] Can purchase sweets
- [ ] Can view purchase history
- [ ] Can access admin panel (if admin)
- [ ] Can add/edit/delete sweets (admin)
- [ ] Can logout
- [ ] Protected routes work correctly
- [ ] Error messages display properly
- [ ] Responsive design works on mobile

## 📞 Support

If you encounter issues:

1. **Check logs**: Look at terminal output for error messages
2. **Verify prerequisites**: Python 3.8+, Node 16+
3. **Reinstall dependencies**: `pip install -r requirements.txt`, `npm install`
4. **Clear cache**: `npm cache clean --force`
5. **Check ports**: Ensure ports 8000 and 5175 are available
6. **Read error messages**: They usually indicate the exact problem

## 🎉 Success!

When everything is working:
- Backend API running on `http://localhost:8000`
- Frontend UI running on `http://localhost:5175`
- Can register, login, browse, purchase, and manage inventory
- All features working as expected

**Congratulations! Your Sweet Shop Management System is ready to use!** 🎂

---

For more information, see:
- `README.md` - Project overview
- `INSTALLATION.md` - Detailed installation steps
- `DEPENDENCIES.md` - Package information
- `DATABASE_SCHEMA.md` - Database structure
- `FRONTEND_COMPLETION.md` - Frontend implementation details
