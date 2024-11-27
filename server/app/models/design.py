from pydantic import BaseModel
from typing import List
from .chat import Message


class DesignRequest(BaseModel):
    messages: List[Message]
    model: str


class DesignResponse(BaseModel):
    content: str
