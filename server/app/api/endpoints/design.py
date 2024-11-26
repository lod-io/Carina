from fastapi import APIRouter, HTTPException, Depends
from app.models.design import DesignRequest, DesignResponse
from app.services.design_service import DesignService
from app.services.ai_service import AIService

router = APIRouter()


@router.post("/generate", response_model=DesignResponse)
async def generate_design(
    request: DesignRequest,
    ai_service: AIService = Depends(),
) -> DesignResponse:
    try:
        design_service = DesignService(ai_service)
        content = await design_service.generate_design_doc(request.messages)
        return DesignResponse(content=content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
