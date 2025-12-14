# Sweet Shop Management

A full-stack web application for managing a sweet shop's inventory and sales.

## Project Overview

This project consists of two main parts:

### Backend (FastAPI)
- RESTful API for sweet shop management
- User authentication and authorization
- Inventory management system
- Purchase history tracking
- SQLAlchemy ORM with SQLite database

### Frontend (React + TypeScript)
- Modern React UI with TypeScript
- User authentication pages
- Sweet browsing and purchasing
- Admin dashboard for inventory management
- Real-time search and filtering

## Quick Start

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

API will be available at `http://localhost:8000`
Docs at `http://localhost:8000/docs`

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend will be available at `http://localhost:5173`

## Project Structure

```
sweet-shop-management/
├── backend/          # FastAPI backend
│   ├── app/         # Application code
│   ├── tests/       # Test files
│   ├── alembic/     # Database migrations
│   └── requirements.txt
├── frontend/        # React frontend
│   ├── src/         # Source code
│   ├── public/      # Static files
│   ├── tests/       # Test files
│   └── package.json
└── docker-compose.yml  # For containerization
```

## API Endpoints

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/sweets/` - Get all sweets
- `POST /api/v1/sweets/` - Create new sweet (admin)
- `PUT /api/v1/sweets/{id}` - Update sweet (admin)
- `DELETE /api/v1/sweets/{id}` - Delete sweet (admin)
- `POST /api/v1/inventory/purchase` - Purchase sweet
- `POST /api/v1/inventory/restock` - Restock sweet (admin)

## Technologies

### Backend
- FastAPI
- SQLAlchemy
- Pydantic
- PyJWT
- SQLite

### Frontend
- React 18
- TypeScript
- React Router
- Axios
- Vite

## Testing

### Backend
```bash
cd backend
pytest
```

### Frontend
```bash
cd frontend
npm run test
```

## License

MIT License
