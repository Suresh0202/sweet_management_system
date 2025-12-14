#!/usr/bin/env python3
"""
Fix image URLs in the database - replace via.placeholder.com with Unsplash URLs
"""
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal
from app.models.sweet import Sweet

def fix_images():
    """Update image URLs for all sweets"""
    db = SessionLocal()
    
    # Map of sweet names to better Unsplash image URLs
    image_urls = {
        "Gulab Jamun": "https://images.unsplash.com/photo-1585701032271-a310e0c7badf?w=200&h=200&fit=crop",
        "Rasgulla": "https://images.unsplash.com/photo-1488477181946-6dd79a34bbe7?w=200&h=200&fit=crop",
        "Jalebi": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&h=200&fit=crop",
        "Laddu": "https://images.unsplash.com/photo-1599599810694-ad8d9c3d5bfe?w=200&h=200&fit=crop",
        "Barfi": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&h=200&fit=crop",
        "Halwa": "https://images.unsplash.com/photo-1585701032271-a310e0c7badf?w=200&h=200&fit=crop",
        "Kheer": "https://images.unsplash.com/photo-1488477181946-6dd79a34bbe7?w=200&h=200&fit=crop",
        "Peda": "https://images.unsplash.com/photo-1599599810694-ad8d9c3d5bfe?w=200&h=200&fit=crop",
    }
    
    try:
        sweets = db.query(Sweet).all()
        
        updated_count = 0
        for sweet in sweets:
            if sweet.name in image_urls:
                old_url = sweet.image_url
                sweet.image_url = image_urls[sweet.name]
                updated_count += 1
                print(f"Updated {sweet.name}: {old_url} -> {sweet.image_url}")
        
        db.commit()
        print(f"\n[OK] Updated {updated_count} sweet image URLs")
        
    except Exception as e:
        print(f"[ERROR] Error updating images: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    fix_images()
