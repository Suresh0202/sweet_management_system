# Database Schema

This document describes the SQLite database schema for the Sweet Shop Management system.

## Tables

### Users Table
Stores user account information.

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Fields:**
- `id`: Unique identifier
- `username`: Unique username (max 50 chars)
- `email`: Unique email address
- `hashed_password`: BCrypt hashed password
- `is_admin`: Boolean flag for admin status
- `is_active`: Boolean flag for account status
- `created_at`: Account creation timestamp
- `updated_at`: Last update timestamp

---

### Sweets Table
Stores sweet product information.

```sql
CREATE TABLE sweets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK(price >= 0),
    quantity INTEGER NOT NULL DEFAULT 0 CHECK(quantity >= 0),
    description TEXT,
    image_url VARCHAR(255),
    created_by INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);
```

**Fields:**
- `id`: Unique identifier
- `name`: Sweet product name (max 100 chars)
- `category`: Product category (max 50 chars)
- `price`: Product price (decimal with 2 decimal places)
- `quantity`: Current stock quantity
- `description`: Product description
- `image_url`: URL to product image
- `created_by`: User ID of admin who created the sweet
- `created_at`: Record creation timestamp
- `updated_at`: Last update timestamp

---

### Purchase History Table
Tracks all purchase transactions.

```sql
CREATE TABLE purchase_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    sweet_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK(quantity > 0),
    total_price DECIMAL(10, 2) NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (sweet_id) REFERENCES sweets(id) ON DELETE CASCADE
);
```

**Fields:**
- `id`: Unique transaction identifier
- `user_id`: ID of purchasing user
- `sweet_id`: ID of purchased sweet
- `quantity`: Number of units purchased
- `total_price`: Total transaction amount
- `purchase_date`: Transaction timestamp

---

### Inventory Logs Table
Tracks inventory management operations (restocks and purchases).

```sql
CREATE TABLE inventory_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sweet_id INTEGER NOT NULL,
    action VARCHAR(20) NOT NULL, -- 'RESTOCK' or 'PURCHASE'
    quantity_change INTEGER NOT NULL,
    performed_by INTEGER NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sweet_id) REFERENCES sweets(id) ON DELETE CASCADE,
    FOREIGN KEY (performed_by) REFERENCES users(id) ON DELETE CASCADE
);
```

**Fields:**
- `id`: Unique log entry identifier
- `sweet_id`: ID of affected sweet
- `action`: Type of action ('RESTOCK' or 'PURCHASE')
- `quantity_change`: Amount of quantity change
- `performed_by`: User ID who performed the action
- `notes`: Optional notes about the action
- `created_at`: Operation timestamp

---

## Indexes

For optimized query performance:

```sql
CREATE INDEX idx_sweets_category ON sweets(category);
CREATE INDEX idx_sweets_name ON sweets(name);
CREATE INDEX idx_sweets_price ON sweets(price);
CREATE INDEX idx_purchase_history_user ON purchase_history(user_id);
CREATE INDEX idx_purchase_history_sweet ON purchase_history(sweet_id);
CREATE INDEX idx_inventory_logs_sweet ON inventory_logs(sweet_id);
```

---

## Database Initialization

To initialize the database, run:

```bash
cd backend
python init_db.py
```

This will:
1. Create all tables
2. Create all indexes
3. Set up foreign key constraints
4. Prepare the database for use

## Setup Instructions

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Initialize the database:
```bash
python init_db.py
```

3. Start the application:
```bash
uvicorn app.main:app --reload
```

The database file will be created as `sweet_shop.db` in the backend directory.

---

## Relationships

### Users → Sweets (created_by)
- One user can create many sweets
- If a user is deleted, their created sweets will have `created_by` set to NULL

### Users → Purchase History (user_id)
- One user can have many purchases
- If a user is deleted, their purchases are cascade deleted

### Sweets → Purchase History (sweet_id)
- One sweet can have many purchase records
- If a sweet is deleted, its purchase history is cascade deleted

### Users → Inventory Logs (performed_by)
- One user can perform many inventory operations
- If a user is deleted, their logs are cascade deleted

### Sweets → Inventory Logs (sweet_id)
- One sweet can have many inventory log entries
- If a sweet is deleted, its logs are cascade deleted

---

## Triggers

The database uses automatic triggers to maintain `updated_at` timestamps:

- **update_sweets_timestamp**: Automatically updates `sweets.updated_at` on record modification
- **update_users_timestamp**: Automatically updates `users.updated_at` on record modification
