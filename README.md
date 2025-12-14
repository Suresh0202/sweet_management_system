# 🍬 Sweet Shop Management System

A full-stack web application for managing a sweet shop's inventory, sales, and customer purchases.

## 📋 Project Overview

This is a complete e-commerce solution for a sweet shop with comprehensive inventory management, user authentication, purchase tracking, and admin controls. The system features real-time inventory updates, secure payment processing simulation, and detailed purchase history.

### Key Features
- ✅ User authentication with JWT tokens
- ✅ Sweet inventory management (CRUD operations)
- ✅ Shopping cart with quantity management
- ✅ Purchase history tracking per user
- ✅ Admin dashboard with inventory controls
- ✅ Real-time search and category filtering
- ✅ Inventory restock management
- ✅ Purchase payment processing
- ✅ Responsive UI with TypeScript type safety

## 🏗️ Architecture

### Backend (FastAPI)
- **Framework**: FastAPI with Uvicorn
- **Database**: SQLAlchemy ORM with SQLite
- **Authentication**: JWT-based with HTTPBearer security
- **API Documentation**: Automatic Swagger/ReDoc at `/docs`
- **Port**: 8001

**Key Endpoints:**
- Authentication: `/api/v1/auth/` (register, login)
- Sweets Management: `/api/v1/sweets/` (CRUD operations)
- Inventory: `/api/v1/inventory/` (purchase, restock, history)

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript 5.3
- **Build Tool**: Vite 5.4
- **Routing**: React Router v6
- **HTTP Client**: Axios with interceptors
- **State Management**: React Context API
- **Styling**: CSS3 with Tailwind utilities
- **Port**: 5173/5174

**Key Components:**
- AuthContext: User authentication state
- CartContext: Shopping cart management
- Protected Routes: Admin-only access control
- Lazy-loaded pages: Performance optimization

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

```powershell
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Initialize database
python init_db.py

# Run the backend server
python run.py
```

Backend runs on `http://localhost:8001`
API documentation: `http://localhost:8001/docs`

### Frontend Setup

```powershell
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create environment file
copy .env.example .env

# Start development server
npm run dev
```

Frontend runs on `http://localhost:5173` (or next available port)

### Docker Setup (Optional)

```powershell
# From root directory
docker-compose up
```

## 📁 Project Structure

```
sweet_shop_management/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── auth.py          # Authentication endpoints
│   │   │       ├── sweets.py        # Sweet CRUD endpoints
│   │   │       └── inventory.py     # Inventory & purchase endpoints
│   │   ├── models/
│   │   │   ├── sweet.py             # Sweet model
│   │   │   ├── user.py              # User model
│   │   │   ├── purchase.py          # Purchase history model
│   │   │   └── inventory_log.py     # Inventory log model
│   │   ├── schemas/                 # Pydantic request/response models
│   │   ├── services/                # Business logic layer
│   │   ├── repositories/            # Data access layer
│   │   ├── utils/
│   │   │   ├── security.py          # JWT & password utilities
│   │   │   └── exceptions.py        # Custom exceptions
│   │   ├── main.py                  # FastAPI application
│   │   ├── database.py              # Database configuration
│   │   └── config.py                # Application settings
│   ├── tests/                       # Unit and integration tests
│   ├── alembic/                     # Database migrations
│   ├── init_db.py                   # Database initialization
│   ├── run.py                       # Server startup script
│   └── requirements.txt             # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx             # Landing page
│   │   │   ├── Login.tsx            # Login page
│   │   │   ├── Register.tsx         # Registration page
│   │   │   ├── Dashboard.tsx        # Purchase history & stats
│   │   │   ├── AdminPanel.tsx       # Admin inventory management
│   │   │   ├── CartPage.tsx         # Shopping cart
│   │   │   └── NotFound.tsx         # 404 page
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.tsx       # Navigation
│   │   │   │   ├── Cart.tsx         # Cart display
│   │   │   │   └── Footer.tsx       # Footer
│   │   │   ├── auth/
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   └── sweets/
│   │   │       └── SweetCard.tsx    # Sweet product card
│   │   ├── context/
│   │   │   ├── AuthContext.tsx      # Authentication context
│   │   │   ├── CartContext.tsx      # Cart state management
│   │   │   └── SweetContext.tsx     # Sweets data context
│   │   ├── services/
│   │   │   ├── api.ts               # Axios configuration
│   │   │   ├── authService_new.ts   # Auth API calls
│   │   │   ├── sweetService_new.ts  # Sweet API calls
│   │   │   └── inventoryService_new.ts # Inventory API calls
│   │   ├── types/
│   │   │   ├── user.ts
│   │   │   ├── sweet.ts
│   │   │   ├── purchase.ts
│   │   │   └── api.ts
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useSweets.ts
│   │   │   └── useDebounce.ts
│   │   ├── App.tsx                  # Main app component
│   │   └── index.tsx                # Entry point
│   ├── public/                      # Static assets
│   ├── vite.config.ts               # Vite configuration
│   ├── tsconfig.json                # TypeScript configuration
│   └── package.json
│
├── README.md                        # This file
├── docker-compose.yml               # Docker configuration
└── .gitignore

```

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login and get JWT token |

### Sweets Management
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/sweets/` | Get all sweets | None |
| GET | `/api/v1/sweets/{id}` | Get sweet details | None |
| POST | `/api/v1/sweets/` | Create new sweet | Admin |
| PUT | `/api/v1/sweets/{id}` | Update sweet | Admin |
| DELETE | `/api/v1/sweets/{id}` | Delete sweet | Admin |

### Inventory & Purchases
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/inventory/purchase` | Record purchase | User |
| GET | `/api/v1/inventory/purchases` | Get user's purchase history | User |
| DELETE | `/api/v1/inventory/purchases` | Clear purchase history | User |
| POST | `/api/v1/inventory/restock` | Restock item (add quantity) | Admin |
| GET | `/api/v1/inventory/history/{sweet_id}` | Get inventory logs | Admin |

## 🛠️ Technology Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| FastAPI | 0.104+ | Web framework |
| Uvicorn | 0.24+ | ASGI server |
| SQLAlchemy | 2.0+ | ORM |
| Pydantic | 2.0+ | Data validation |
| PyJWT | 2.8+ | JWT authentication |
| python-multipart | 0.0.6+ | Form parsing |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.2+ | UI library |
| TypeScript | 5.3+ | Type safety |
| Vite | 5.4+ | Build tool |
| React Router | 6.20+ | Client-side routing |
| Axios | 1.6+ | HTTP client |
| Lucide React | 0.561+ | Icons |
| Tailwind CSS | (via CSS) | Styling |

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  username VARCHAR UNIQUE NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  hashed_password VARCHAR NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Sweets Table
```sql
CREATE TABLE sweets (
  id INTEGER PRIMARY KEY,
  name VARCHAR NOT NULL,
  category VARCHAR NOT NULL,
  price DECIMAL NOT NULL,
  quantity INTEGER NOT NULL,
  description VARCHAR,
  image_url VARCHAR,
  created_by INTEGER NOT NULL FOREIGN KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Purchase History Table
```sql
CREATE TABLE purchase_history (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL FOREIGN KEY,
  sweet_id INTEGER NOT NULL FOREIGN KEY,
  quantity INTEGER NOT NULL,
  total_price DECIMAL NOT NULL,
  purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Inventory Logs Table
```sql
CREATE TABLE inventory_logs (
  id INTEGER PRIMARY KEY,
  sweet_id INTEGER NOT NULL FOREIGN KEY,
  action VARCHAR NOT NULL,
  quantity_change INTEGER NOT NULL,
  performed_by INTEGER NOT NULL FOREIGN KEY,
  notes VARCHAR,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🧪 Testing

### Backend Testing
```powershell
cd backend

# Run all tests
pytest

# Run with coverage
pytest --cov=app tests/

# Run specific test file
pytest tests/test_auth.py

# Run specific test
pytest tests/test_auth.py::test_user_registration
```

Test coverage includes:
- Authentication (login, registration, token validation)
- CRUD operations for sweets
- Purchase and inventory management
- Error handling and edge cases

### Frontend Testing
```powershell
cd frontend

# Run tests
npm run test

# Run with coverage
npm run test -- --coverage
```

## 🔐 Security Features

1. **JWT Authentication**: Secure token-based authentication
2. **Password Hashing**: bcrypt for secure password storage
3. **CORS Configuration**: Restricted to allowed origins
4. **SQL Injection Prevention**: SQLAlchemy parameterized queries
5. **Authorization Checks**: Admin-only endpoints protected
6. **Environment Variables**: Sensitive config in .env files
7. **Foreign Key Constraints**: SQLite foreign key enforcement
8. **Cascade Deletes**: Proper data integrity on deletions

## 🚢 Deployment

### Production Build - Backend
```powershell
cd backend
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8001 app.main:app
```

### Production Build - Frontend
```powershell
cd frontend
npm run build
# Deploy `dist/` folder to Vercel, Netlify, or static hosting
```

## 📝 Development Guidelines

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat: Add new feature"

# Push and create PR
git push origin feature/feature-name
```

### Code Style
- Backend: Follow PEP 8 with Black formatter
- Frontend: ESLint + Prettier configuration included
- Meaningful variable and function names
- Comments for complex logic
- Type hints in Python, TypeScript types in React

### Adding New Features
1. Write tests first (TDD approach)
2. Implement feature
3. Ensure all tests pass
4. Update documentation
5. Commit with clear message

## 🤖 My AI Usage

### AI Tools Used
- **GitHub Copilot**: Code generation and suggestions
- **Claude AI (Haiku)**: Debugging, refactoring, and technical guidance

### How AI Was Utilized

#### 1. Code Generation & Boilerplate
- **Use Case**: Generated initial FastAPI endpoint structures, React component templates, and TypeScript type definitions
- **Impact**: Accelerated initial development by providing solid starting points that were then customized for specific requirements
- **Example**: Used to scaffold CRUD endpoint patterns in `inventory.py` and `sweets.py`

#### 2. Debugging & Error Resolution
- **Use Case**: Identified and resolved issues like:
  - DELETE endpoint NOT NULL constraint errors
  - 422 Unprocessable Entity validation errors
  - CORS configuration problems
  - Database schema mismatches (purchase_date vs purchased_at)
- **Impact**: Significantly reduced debugging time, typically resolving complex issues within minutes
- **Process**: Provided error messages and code context; AI suggested root causes and solutions

#### 3. Feature Implementation
- **Use Case**: Implemented complex features like:
  - Cart context with proper state management
  - Purchase history filtering and serialization
  - Payment processing flow with cart clearing
  - Inventory cascade delete logic
- **Impact**: Ensured features followed best practices and were properly integrated with existing code
- **Example**: AI helped design the CartContext structure to properly manage cart items with add/remove/clear operations

#### 4. Testing & Validation
- **Use Case**: Generated test scripts (`test_restock.py`, `test_endpoints_py.py`) and helped design test cases
- **Impact**: Enabled rapid validation of endpoints and identified edge cases
- **Example**: Created comprehensive endpoint testing scripts that validated request/response formats

#### 5. Bug Fixing & Edge Cases
- **Use Case**: Helped fix numerous bugs including:
  - Currency symbol display ($ → ₹)
  - Port configuration conflicts (8000/8001)
  - TypeScript compilation errors
  - Image URL issues (via.placeholder errors)
  - Cart persistence and clearing logic
- **Impact**: Each fix was implemented with understanding of the full system impact
- **Process**: AI provided targeted code changes rather than full rewrites

#### 6. Database Schema & Migrations
- **Use Case**: Designed database models, foreign key constraints, and cascade delete logic
- **Impact**: Ensured data integrity and proper relationships between entities
- **Example**: Added foreign key constraints and cascade deletes for proper cleanup when sweets are deleted

#### 7. Documentation & Code Organization
- **Use Case**: Created this README and organized project structure documentation
- **Impact**: Clear documentation for future developers
- **Process**: Used AI to structure information logically and comprehensively

### AI Workflow Reflections

**What Worked Well:**
1. **Problem Identification**: AI excelled at identifying root causes of errors quickly
2. **Best Practices**: Consistently suggested clean code patterns and architectural best practices
3. **Rapid Prototyping**: Generated working code that required minimal modification
4. **Comprehensive Solutions**: Provided full context-aware solutions rather than incomplete snippets
5. **Educational**: Explained *why* solutions work, improving understanding

**Challenges:**
1. **Context Limitations**: Sometimes needed to re-provide project context across conversations
2. **Over-complexity**: Occasionally generated solutions more complex than necessary
3. **Testing Coverage**: While helpful, required human judgment to ensure comprehensive test cases

**Overall Impact:**
- **Development Speed**: Estimated 40-50% faster than manual development
- **Code Quality**: AI suggestions often improved initial code with better error handling
- **Learning**: Working with AI suggestions improved understanding of best practices
- **Productivity**: Freed up time from boilerplate work for higher-level design decisions

### Key Commits with AI Co-authorship
All commits in this repository where AI assistance was used follow this format:

```
feat: Implement purchase history and payment processing

- Added DELETE /inventory/purchases endpoint
- Implemented cart clearing after payment
- Added "Buy Now" button with payment simulation
- Fixed purchase history serialization

Co-authored-by: GitHub Copilot <copilot@github.com>
```

## 📚 Additional Resources

### API Documentation
When running locally, visit:
- **Swagger UI**: `http://localhost:8001/docs`
- **ReDoc**: `http://localhost:8001/redoc`

### Useful Commands

**Backend:**
```bash
# Initialize database
python init_db.py

# Seed database with sample data
python seed_db.py

# Fix image URLs
python fix_images.py

# Run tests
pytest

# Format code
black app/ tests/
```

**Frontend:**
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Lint code
npm run lint
```

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```powershell
# Kill process on port 8001
netstat -ano | Select-String ":8001" | ForEach-Object { taskkill /PID $_.Split()[-2] /F }

# Start backend on different port
python run.py --port 8002
```

**CORS Errors**
- Ensure frontend URL is in `CORS_ORIGINS` in `backend/app/config.py`
- Check that API_URL in frontend `.env` matches backend address

**Database Errors**
- Delete `sweet_shop.db` and run `python init_db.py` to reset
- Ensure SQLite is properly installed

**Authentication Issues**
- Clear browser localStorage
- Check that JWT token hasn't expired (30 min default)
- Verify token is being sent in Authorization header

## 📄 License

MIT License - See LICENSE file for details

## 👨‍💻 Author

Developed with modern development practices including:
- Test-Driven Development (TDD)
- Clean Code principles
- Git version control
- AI-assisted development with transparent co-authorship

---

**Last Updated**: December 14, 2025
**Status**: ✅ Production Ready
