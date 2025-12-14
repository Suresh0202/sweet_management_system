# Sweet Shop Management API

A FastAPI-based backend for managing sweet shop inventory and purchases.

## Features

- User authentication and authorization
- Sweet management (CRUD operations)
- Inventory tracking and purchase history
- Admin-only operations for restocking
- JWT-based security

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Run the application:
```bash
uvicorn app.main:app --reload
```

4. Access API docs at `http://localhost:8000/docs`

## Testing

Run tests with:
```bash
pytest
```

## Project Structure

- `app/models/` - SQLAlchemy database models
- `app/schemas/` - Pydantic request/response schemas
- `app/api/` - API endpoint definitions
- `app/services/` - Business logic
- `app/repositories/` - Database access layer
- `app/utils/` - Utility functions
- `tests/` - Test files
