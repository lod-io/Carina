from pydantic import BaseModel
from typing import List, Optional


class Message(BaseModel):
    role: str
    content: str


class ChatHistory(BaseModel):
    messages: List[Message]
