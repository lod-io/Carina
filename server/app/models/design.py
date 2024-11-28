from pydantic import BaseModel
from typing import List
from .chat import Message


class DesignRequest(BaseModel):
    prev_design: str | None
    messages: List[Message]
    model: str


class DesignResponse(BaseModel):
    content: str
