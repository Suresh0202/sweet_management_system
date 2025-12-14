from sqlalchemy.orm import Session
from app.repositories.user_repository import UserRepository


class UserService:
    def __init__(self, db: Session):
        self.db = db
        self.user_repo = UserRepository(db)
    
    def get_user_by_id(self, user_id: int):
        """Get user by ID"""
        return self.user_repo.get_by_id(user_id)
    
    def get_user_by_username(self, username: str):
        """Get user by username"""
        return self.user_repo.get_by_username(username)
    
    def get_user_by_email(self, email: str):
        """Get user by email"""
        return self.user_repo.get_by_email(email)
