import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "AI Architect"
    GOOGLE_API_KEY: str

    class Config:
        env_file = ".env"


settings = Settings()
