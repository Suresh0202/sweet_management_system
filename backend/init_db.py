"""
Initialize the SQLite database with schema and create tables.
Run this before starting the application for the first time.
"""
import sqlite3
from pathlib import Path
from app.database import Base, engine

# SQL schema file path
SCHEMA_SQL = """
-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sweets Table
CREATE TABLE IF NOT EXISTS sweets (
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

-- Purchase History Table (Track all purchases)
CREATE TABLE IF NOT EXISTS purchase_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    sweet_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK(quantity > 0),
    total_price DECIMAL(10, 2) NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (sweet_id) REFERENCES sweets(id) ON DELETE CASCADE
);

-- Inventory Logs Table (Track restock operations)
CREATE TABLE IF NOT EXISTS inventory_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sweet_id INTEGER NOT NULL,
    action VARCHAR(20) NOT NULL,
    quantity_change INTEGER NOT NULL,
    performed_by INTEGER NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sweet_id) REFERENCES sweets(id) ON DELETE CASCADE,
    FOREIGN KEY (performed_by) REFERENCES users(id) ON DELETE CASCADE
);

-- Create Indexes for performance
CREATE INDEX IF NOT EXISTS idx_sweets_category ON sweets(category);
CREATE INDEX IF NOT EXISTS idx_sweets_name ON sweets(name);
CREATE INDEX IF NOT EXISTS idx_sweets_price ON sweets(price);
CREATE INDEX IF NOT EXISTS idx_purchase_history_user ON purchase_history(user_id);
CREATE INDEX IF NOT EXISTS idx_purchase_history_sweet ON purchase_history(sweet_id);
CREATE INDEX IF NOT EXISTS idx_inventory_logs_sweet ON inventory_logs(sweet_id);
"""


def init_db():
    """Initialize the database with the schema"""
    print("Initializing database...")
    
    # Create all tables using SQLAlchemy ORM
    Base.metadata.create_all(bind=engine)
    
    # Additional SQL initialization
    db_url = "sqlite:///./sweet_shop.db"
    db_path = Path(db_url.replace("sqlite:///", ""))
    
    try:
        conn = sqlite3.connect(str(db_path))
        cursor = conn.cursor()
        
        # Execute all SQL statements
        for statement in SCHEMA_SQL.split(';'):
            if statement.strip():
                cursor.execute(statement)
        
        conn.commit()
        conn.close()
        print("✓ Database initialized successfully!")
        print(f"✓ Database file: {db_path.absolute()}")
        
    except Exception as e:
        print(f"✗ Error initializing database: {e}")
        raise


if __name__ == "__main__":
    init_db()
