from fastapi import APIRouter, HTTPException, Depends
from app.models.chat import ChatRequest, ChatResponse
from app.services.ai_service import AIService
from app.dependencies import get_ai_service

router = APIRouter()


@router.post("/next-question", response_model=ChatResponse)
async def get_next_question(
    request: ChatRequest,
    ai_service: AIService = Depends(get_ai_service),
) -> ChatResponse:
    try:
        content = await ai_service.generate_question(request.messages, request.model)
        return ChatResponse(content=content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
