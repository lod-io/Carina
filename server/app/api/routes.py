from fastapi import APIRouter
from app.api.endpoints import chat, design

api_router = APIRouter()
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(design.router, prefix="/design", tags=["design"])
