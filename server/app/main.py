from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from app.api.routes import api_router

app = FastAPI(
    title="AI Architect"
)

# Get environment variables with defaults
PORT = int(os.getenv("PORT", 8000))

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://carina-jx69.onrender.com",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=[
        "Content-Type",
        "Authorization"
    ],
    expose_headers=["Content-Type"]
)

app.include_router(api_router)
