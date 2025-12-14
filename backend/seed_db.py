"""
Seed the database with admin user and sample sweets.
Run this after initializing the database.
"""
import sys
import os

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal
from app.models.user import User
from app.models.sweet import Sweet
from app.utils.security import hash_password


def seed_admin_user():
    """Create default admin user"""
    db = SessionLocal()
    
    try:
        # Check if admin already exists
        admin = db.query(User).filter(User.username == "admin").first()
        if admin:
            print("✓ Admin user already exists")
            return
        
        # Create admin user
        admin_user = User(
            username="admin",
            email="admin@sweetshop.com",
            hashed_password=hash_password("Admin@1234"),
            is_admin=True,
            is_active=True
        )
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        
        print(f"✓ Admin user created successfully!")
        print(f"  Username: admin")
        print(f"  Password: Admin@1234")
        print(f"  Email: admin@sweetshop.com")
        
        return admin_user
        
    except Exception as e:
        print(f"✗ Error creating admin user: {e}")
        db.rollback()
    finally:
        db.close()


def seed_sample_sweets(admin_user_id):
    """Create sample sweets"""
    db = SessionLocal()
    
    sample_sweets = [
        {
            "name": "Gulab Jamun",
            "category": "Dessert",
            "price": 150.00,
            "quantity": 50,
            "description": "Soft and spongy dessert balls soaked in sugar syrup",
            "image_url": "https://images.unsplash.com/photo-1585701032271-a310e0c7badf?w=200&h=200&fit=crop"
        },
        {
            "name": "Rasgulla",
            "category": "Dessert",
            "price": 120.00,
            "quantity": 60,
            "description": "Soft and spongy dessert in light sugar syrup",
            "image_url": "https://images.unsplash.com/photo-1488477181946-6dd79a34bbe7?w=200&h=200&fit=crop"
        },
        {
            "name": "Jalebi",
            "category": "Fried Sweets",
            "price": 80.00,
            "quantity": 80,
            "description": "Bright orange sweet pretzel-shaped fried sweet",
            "image_url": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&h=200&fit=crop"
        },
        {
            "name": "Laddu",
            "category": "Balls",
            "price": 100.00,
            "quantity": 70,
            "description": "Round sweet made with flour, ghee and sugar",
            "image_url": "https://images.unsplash.com/photo-1599599810694-ad8d9c3d5bfe?w=200&h=200&fit=crop"
        },
        {
            "name": "Barfi",
            "category": "Fudge",
            "price": 200.00,
            "quantity": 40,
            "description": "Dense and fudgy sweet made with condensed milk",
            "image_url": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&h=200&fit=crop"
        },
        {
            "name": "Halwa",
            "category": "Pudding",
            "price": 180.00,
            "quantity": 35,
            "description": "Warm and creamy pudding made with semolina or wheat",
            "image_url": "https://images.unsplash.com/photo-1585701032271-a310e0c7badf?w=200&h=200&fit=crop"
        },
        {
            "name": "Kheer",
            "category": "Pudding",
            "price": 90.00,
            "quantity": 45,
            "description": "Creamy rice pudding made with milk and condensed milk",
            "image_url": "https://images.unsplash.com/photo-1488477181946-6dd79a34bbe7?w=200&h=200&fit=crop"
        },
        {
            "name": "Peda",
            "category": "Fudge",
            "price": 110.00,
            "quantity": 55,
            "description": "Soft and smooth milk-based fudge",
            "image_url": "https://images.unsplash.com/photo-1599599810694-ad8d9c3d5bfe?w=200&h=200&fit=crop"
        },
    ]
    
    try:
        for sweet_data in sample_sweets:
            # Check if sweet already exists
            existing = db.query(Sweet).filter(Sweet.name == sweet_data["name"]).first()
            if existing:
                print(f"  - {sweet_data['name']} already exists")
                continue
            
            sweet = Sweet(
                name=sweet_data["name"],
                category=sweet_data["category"],
                price=sweet_data["price"],
                quantity=sweet_data["quantity"],
                description=sweet_data["description"],
                image_url=sweet_data["image_url"],
                created_by=admin_user_id
            )
            db.add(sweet)
        
        db.commit()
        print(f"✓ Sample sweets created successfully!")
        
    except Exception as e:
        print(f"✗ Error creating sample sweets: {e}")
        db.rollback()
    finally:
        db.close()


def seed_database():
    """Seed the entire database"""
    print("\n" + "="*50)
    print("SEEDING DATABASE")
    print("="*50 + "\n")
    
    print("Creating admin user...")
    admin_user = seed_admin_user()
    
    if admin_user:
        print("\nCreating sample sweets...")
        seed_sample_sweets(admin_user.id)
    
    print("\n" + "="*50)
    print("DATABASE SEEDING COMPLETE!")
    print("="*50 + "\n")
    
    print("DEFAULT ADMIN CREDENTIALS:")
    print("  Username: admin")
    print("  Password: Admin@1234")
    print("  Email: admin@sweetshop.com")
    print()


if __name__ == "__main__":
    seed_database()
