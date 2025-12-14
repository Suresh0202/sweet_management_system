from sqlalchemy.orm import Session
from app.schemas.user import UserCreate
from app.schemas.auth import Token
from app.utils.security import hash_password, verify_password, create_access_token
from app.repositories.user_repository import UserRepository


class AuthService:
    def __init__(self, db: Session):
        self.db = db
        self.user_repo = UserRepository(db)
    
    def register(self, user_create: UserCreate) -> Token:
        """Register a new user"""
        # Check if user already exists
        if self.user_repo.get_by_username(user_create.username):
            raise ValueError("Username already exists")
        
        if self.user_repo.get_by_email(user_create.email):
            raise ValueError("Email already exists")
        
        # Hash password and create user
        hashed_password = hash_password(user_create.password)
        user = self.user_repo.create(
            username=user_create.username,
            email=user_create.email,
            hashed_password=hashed_password
        )
        
        # Create token
        access_token = create_access_token(data={"sub": user.username})
        
        user_dict = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_admin": user.is_admin,
            "is_active": user.is_active,
            "created_at": user.created_at.isoformat() if user.created_at else None
        }
        
        return Token(
            access_token=access_token,
            token_type="bearer",
            user=user_dict,
            user_id=user.id
        )
    
    def login(self, username: str, password: str) -> Token:
        """Login user"""
        user = self.user_repo.get_by_username(username)
        
        if not user or not verify_password(password, user.hashed_password):
            return None
        
        access_token = create_access_token(data={"sub": user.username})
        
        user_dict = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_admin": user.is_admin,
            "is_active": user.is_active,
            "created_at": user.created_at.isoformat() if user.created_at else None
        }
        
        return Token(
            access_token=access_token,
            token_type="bearer",
            user=user_dict,
            user_id=user.id
        )
