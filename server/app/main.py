from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from app.api.routes import api_router

app = FastAPI(
    title="AI Architect"
)

# Get environment variables with defaults
PORT = int(os.getenv("PORT", 8000))
CLIENT_URL = os.getenv("CLIENT_URL", "http://localhost:3000")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[CLIENT_URL],  # You can add multiple origins in this list
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
