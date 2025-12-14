# Installation Guide

Complete step-by-step instructions for setting up the Sweet Shop Management application.

## Prerequisites

Before starting, ensure you have the following installed:
- **Python 3.8+** - [Download Python](https://www.python.org/downloads/)
- **Node.js 16+** - [Download Node.js](https://nodejs.org/)
- **Git** (optional) - [Download Git](https://git-scm.com/)
- **pip** (Python package manager - comes with Python)
- **npm** (Node package manager - comes with Node.js)

### Verify Installations

**Windows (PowerShell):**
```powershell
python --version
node --version
npm --version
```

**macOS/Linux (Terminal):**
```bash
python3 --version
node --version
npm --version
```

---

## Backend Setup (FastAPI)

### Step 1: Navigate to Backend Directory

```powershell
# Windows
cd backend

# macOS/Linux
cd backend
```

### Step 2: Create Virtual Environment

**Windows (PowerShell):**
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**Windows (Command Prompt):**
```cmd
python -m venv venv
venv\Scripts\activate.bat
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Upgrade pip

```powershell
# Windows
python -m pip install --upgrade pip

# macOS/Linux
python3 -m pip install --upgrade pip
```

### Step 4: Install Backend Dependencies

```powershell
pip install -r requirements.txt
```

### Step 5: Verify Installation

```powershell
pip list
```

You should see packages like:
- fastapi
- uvicorn
- sqlalchemy
- pydantic
- python-jwt
- passlib
- pytest
- etc.

### Step 6: Initialize Database

```powershell
python init_db.py
```

Expected output:
```
Initializing database...
✓ Database initialized successfully!
✓ Database file: C:\...\sweet_shop.db
```

### Step 7: Create Environment File

```powershell
# Copy example file
Copy-Item .env.example .env

# Edit .env with your settings (if needed)
```

Or create manually:
```powershell
@"
DATABASE_URL=sqlite:///./sweet_shop.db
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DEBUG=True
"@ | Out-File .env
```

### Step 8: Run Backend Server

```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Expected output:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started server process
INFO:     Application startup complete
```

Access the API at: `http://localhost:8000`
- API Docs: `http://localhost:8000/docs`
- Alternative Docs: `http://localhost:8000/redoc`

---

## Frontend Setup (React + TypeScript)

### Step 1: Navigate to Frontend Directory

```powershell
# Open new PowerShell window
cd frontend
```

### Step 2: Install Node Modules

```powershell
npm install
```

This will install all dependencies listed in `package.json`:
- react
- react-dom
- react-router-dom
- axios
- typescript
- vite
- tailwindcss
- vitest
- etc.

### Step 3: Verify Installation

```powershell
npm list
```

### Step 4: Create Environment File

```powershell
# Copy example file
Copy-Item .env.example .env
```

Or create manually:
```powershell
@"
VITE_API_URL=http://localhost:8000/api/v1
"@ | Out-File .env
```

### Step 5: Run Development Server

```powershell
npm run dev
```

Expected output:
```
  VITE v5.0.0  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

Access the app at: `http://localhost:5173`

---

## Full Installation Checklist

### Backend Checklist
- [ ] Python 3.8+ installed
- [ ] Navigate to `/backend` directory
- [ ] Virtual environment created (`venv` folder exists)
- [ ] Virtual environment activated (shows `(venv)` in terminal)
- [ ] pip upgraded to latest version
- [ ] `requirements.txt` installed via pip
- [ ] Database initialized with `init_db.py`
- [ ] `.env` file created
- [ ] Backend server running on `http://localhost:8000`

### Frontend Checklist
- [ ] Node.js 16+ installed
- [ ] Navigate to `/frontend` directory
- [ ] npm dependencies installed (`node_modules` folder exists)
- [ ] `.env` file created
- [ ] Frontend server running on `http://localhost:5173`

---

## Troubleshooting

### Backend Issues

**Issue: "python command not found"**
```powershell
# Use python3 instead (macOS/Linux)
python3 -m venv venv
python3 init_db.py

# Or add Python to PATH on Windows
```

**Issue: "Module not found" after pip install**
```powershell
# Make sure virtual environment is activated
# On Windows PowerShell, if activation fails:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\venv\Scripts\Activate.ps1
```

**Issue: Database initialization fails**
```powershell
# Delete existing database and try again
Remove-Item sweet_shop.db -ErrorAction SilentlyContinue
python init_db.py

# Check if SQLite is working
python -c "import sqlite3; print('SQLite OK')"
```

**Issue: Port 8000 already in use**
```powershell
# Use a different port
uvicorn app.main:app --reload --port 8001
```

### Frontend Issues

**Issue: "npm command not found"**
```powershell
# Reinstall Node.js from https://nodejs.org/
# Make sure to include npm in installation
npm --version
```

**Issue: "Cannot find module" after npm install**
```powershell
# Clear npm cache and reinstall
npm cache clean --force
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json
npm install
```

**Issue: Port 5173 already in use**
```powershell
# Vite will automatically use next available port
npm run dev
```

**Issue: Cannot connect to backend API**
```powershell
# Check .env file has correct API URL
# Make sure backend is running on port 8000
# Check browser console for CORS errors
```

---

## Running Both Servers Simultaneously

**Option 1: Multiple Terminal Windows**

Terminal 1 (Backend):
```powershell
cd backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload
```

Terminal 2 (Frontend):
```powershell
cd frontend
npm run dev
```

**Option 2: Using npm-run-all (Optional)**

In the root directory, create a combined script (if desired):
```powershell
# Install globally if needed
npm install -g npm-run-all
```

---

## Production Setup

### Backend for Production

```powershell
# Deactivate development virtual environment
deactivate

# Run with gunicorn (install if needed)
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 app.main:app
```

### Frontend for Production

```powershell
# Build optimized production bundle
npm run build

# Output will be in 'dist' folder
# Deploy the 'dist' folder to your web server
```

---

## Docker Setup (Optional)

If you have Docker installed, you can use the provided `docker-compose.yml`:

```powershell
# In root directory
docker-compose up
```

This starts both backend and frontend in containers.

---

## Summary of Commands

**Backend:**
```powershell
# Setup
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python init_db.py
Copy-Item .env.example .env

# Run
uvicorn app.main:app --reload

# Test
pytest
```

**Frontend:**
```powershell
# Setup
npm install
Copy-Item .env.example .env

# Run
npm run dev

# Test
npm run test

# Build
npm run build
```

---

## Next Steps

1. Start both servers (backend and frontend)
2. Access the application at `http://localhost:5173`
3. Create a test user account
4. Explore the features
5. Read the API documentation at `http://localhost:8000/docs`

For additional help, check the README files in the `/backend` and `/frontend` directories.
