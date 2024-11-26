import logging
from typing import List
from app.models.chat import Message
from app.services.ai_service import AIService

logger = logging.getLogger(__name__)


class DesignService:
    def __init__(self, ai_service: AIService):
        self.ai_service = ai_service

    async def generate_design_doc(self, messages: List[Message]) -> str:
        if not messages:
            error_msg = "No messages provided for design document generation"
            logger.error(error_msg)
            raise ValueError(error_msg)

        try:
            history = self._format_messages(messages)
            design_prompt = f"""You are the AI Architect. Based on the following conversation history about the software architecture:

            {history}

            Create a professional, structured software architecture design document that includes:
            1. System Architecture Diagram
            2. Component Descriptions
            3. Communication and Interactions
            4. Technology Choices and Rationale
            5. Open Questions

            Be comprehensive and detailed."""

            response = self.ai_service.model.generate_content(design_prompt)
            if not response or not response.text:
                error_msg = "Failed to generate design document: Empty response from AI service"
                logger.error(error_msg)
                raise RuntimeError(error_msg)

            return response.text

        except Exception as e:
            error_msg = f"Failed to generate design document: {str(e)}"
            logger.error(error_msg, exc_info=True)
            raise RuntimeError(error_msg)

    def _format_messages(self, messages: List[Message]) -> str:
        return "\n".join([f"{msg.role}: {msg.content}" for msg in messages])
