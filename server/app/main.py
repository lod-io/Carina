from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from app.api.routes import api_router

app = FastAPI(
    title="AI Architect"
)

# Get environment variables with defaults
PORT = int(os.getenv("PORT", 8000))
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://carina-jx69.onrender.com"
]

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
