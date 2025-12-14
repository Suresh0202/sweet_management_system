from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import auth, sweets, inventory
from app.config import settings

app = FastAPI(
    title="Sweet Shop Management API",
    description="API for managing sweet shop inventory and purchases",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(sweets.router, prefix="/api/v1/sweets", tags=["sweets"])
app.include_router(inventory.router, prefix="/api/v1/inventory", tags=["inventory"])


@app.get("/")
def root():
    return {"message": "Welcome to Sweet Shop Management API"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
