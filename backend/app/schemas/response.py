from pydantic import BaseModel
from typing import Optional, Any, Generic, TypeVar


T = TypeVar('T')


class ResponseModel(BaseModel, Generic[T]):
    success: bool
    message: str
    data: Optional[T] = None
    error: Optional[str] = None


class PaginatedResponse(BaseModel, Generic[T]):
    success: bool
    message: str
    data: list[T]
    total: int
    page: int
    per_page: int
