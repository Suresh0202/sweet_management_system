class CustomException(Exception):
    """Base custom exception"""
    pass


class AuthenticationException(CustomException):
    """Raised when authentication fails"""
    pass


class AuthorizationException(CustomException):
    """Raised when user is not authorized"""
    pass


class ResourceNotFoundException(CustomException):
    """Raised when a resource is not found"""
    pass


class InvalidDataException(CustomException):
    """Raised when provided data is invalid"""
    pass


class InsufficientStockException(CustomException):
    """Raised when there's insufficient stock"""
    pass
