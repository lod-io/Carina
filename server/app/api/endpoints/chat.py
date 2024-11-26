from fastapi import APIRouter, HTTPException, Depends
from app.models.chat import ChatHistory
from app.services.ai_service import AIService

router = APIRouter()


@router.post("/chat/next-question")
async def get_next_question(
    chat_history: ChatHistory,
    ai_service: AIService = Depends()
) -> str:
    try:
        return await ai_service.generate_question(chat_history.messages)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
