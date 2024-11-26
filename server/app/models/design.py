from pydantic import BaseModel
from typing import List
from .chat import Message


class DesignRequest(BaseModel):
    messages: List[Message]


class DesignResponse(BaseModel):
    content: str
