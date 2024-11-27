from fastapi import APIRouter, HTTPException, Depends
from app.models.chat import ChatRequest, ChatResponse
from app.services.ai_service import AIService

router = APIRouter()


@router.post("/next-question", response_model=ChatResponse)
async def get_next_question(
    request: ChatRequest,
    ai_service: AIService = Depends(),
) -> ChatResponse:
    try:
        content = await ai_service.generate_question(request.messages, request.model)
        return ChatResponse(content=content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
