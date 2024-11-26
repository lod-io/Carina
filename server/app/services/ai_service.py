from typing import List
import google.generativeai as genai
from app.models.chat import Message
from app.core.config import settings


class AIService:
    def __init__(self):
        genai.configure(api_key=settings.GOOGLE_API_KEY)
        self.model = genai.GenerativeModel('gemini-1.5-flash')

    async def generate_question(self, messages: List[Message]) -> str:
        try:
            history = self._format_messages(messages)
            prompt = f"""Based on the previous context:
            {history}
            Generate a concise, high-level question to further clarify the software architecture."""

            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            error_msg = f"Error generating question: {str(e)}"
            print(error_msg)
            return error_msg

    def _format_messages(self, messages: List[Message]) -> str:
        try:
            return "\n".join([f"{msg.role}: {msg.content}" for msg in messages])
        except Exception as e:
            error_msg = f"Error formatting messages: {str(e)}"
            print(error_msg)
            return error_msg
