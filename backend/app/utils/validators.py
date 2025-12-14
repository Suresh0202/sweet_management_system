import re
from typing import Optional


def validate_username(username: str) -> bool:
    """Validate username format"""
    if not username or len(username) < 3 or len(username) > 50:
        return False
    # Allow alphanumeric and underscores
    return bool(re.match(r"^[a-zA-Z0-9_]+$", username))


def validate_email(email: str) -> bool:
    """Validate email format"""
    email_pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    return bool(re.match(email_pattern, email))


def validate_password(password: str) -> bool:
    """Validate password strength"""
    if len(password) < 8:
        return False
    # At least one uppercase, one lowercase, one digit
    has_upper = bool(re.search(r"[A-Z]", password))
    has_lower = bool(re.search(r"[a-z]", password))
    has_digit = bool(re.search(r"\d", password))
    return has_upper and has_lower and has_digit


def validate_price(price: float) -> bool:
    """Validate price"""
    return price > 0


def validate_quantity(quantity: int) -> bool:
    """Validate quantity"""
    return quantity >= 0
