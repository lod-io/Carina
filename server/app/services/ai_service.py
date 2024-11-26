import logging
from typing import List
from app.models.chat import Message
import os
import openai
from dotenv import load_dotenv

logger = logging.getLogger(__name__)

load_dotenv()


class AIService:
    def __init__(self):

        self.client = openai.Client(
            api_key=os.getenv("CLOD_API_KEY"),
            base_url="https://api.clod.io/v1",
        )

    async def generate_question(self, messages: List[Message]) -> str:
        try:
            history = self._format_messages(messages)
            prompt = f"""Based on the previous context:
            {history}
            Generate a concise, high-level question to further clarify the software architecture."""

            response = self.client.chat.completions.create(
                model="gemini-1.5-flash",
                messages=[{"role": "user", "content": prompt}],
            )

            text = response.choices[0].message.content

            return text
        except Exception as e:
            error_msg = f"Error generating question: {str(e)}"
            print(error_msg)
            return error_msg

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

            response = self.client.chat.completions.create(
                model="gemini-1.5-flash",
                messages=[{"role": "user", "content": design_prompt}],
            )

            text = response.choices[0].message.content

            if not text:
                error_msg = "Failed to generate design document: Empty response from AI service"
                logger.error(error_msg)
                raise RuntimeError(error_msg)

            return text

        except Exception as e:
            error_msg = f"Failed to generate design document: {str(e)}"
            logger.error(error_msg, exc_info=True)
            raise RuntimeError(error_msg)

    def _format_messages(self, messages: List[Message]) -> str:
        try:
            return "\n".join([f"{msg.role}: {msg.content}" for msg in messages])
        except Exception as e:
            error_msg = f"Error formatting messages: {str(e)}"
            print(error_msg)
            return error_msg
