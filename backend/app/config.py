from pydantic_settings import BaseSettings
from typing import List
import json


class Settings(BaseSettings):
    # MongoDB Configuration
    MONGODB_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "nike_store"
    
    # JWT Configuration
    SECRET_KEY: str = "your-secret-key-here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS Configuration - Parse from JSON string in env
    CORS_ORIGINS: str = '["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:3000"]'
    
    # Server Configuration
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    class Config:
        env_file = ".env"
        case_sensitive = True

    @property
    def cors_origins_list(self) -> List[str]:
        """Parse CORS_ORIGINS string to list"""
        if isinstance(self.CORS_ORIGINS, str):
            try:
                return json.loads(self.CORS_ORIGINS)
            except:
                return self.CORS_ORIGINS.split(',')
        return self.CORS_ORIGINS


settings = Settings()
