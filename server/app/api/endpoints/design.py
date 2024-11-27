from fastapi import APIRouter, HTTPException, Depends
from app.models.design import DesignRequest, DesignResponse
from app.services.ai_service import AIService

router = APIRouter()


@router.post("/generate", response_model=DesignResponse)
async def generate_design(
    request: DesignRequest,
    ai_service: AIService = Depends(),
) -> DesignResponse:
    try:
        content = await ai_service.generate_design_doc(request.messages, request.model)
        return DesignResponse(content=content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
