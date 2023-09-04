from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, Field

class TextEmoCreate(BaseModel):
    emotion_type: str = Field(..., emotion_type='Title', max_length=55, min_length=1)
    description: str = Field(..., emotion_type='Title', max_length=755, min_length=1)
    status: Optional[bool] = False
    
    
class TextEmoUpdate(BaseModel):
    emotion_type: Optional[str] = Field(..., emotion_type='Title', max_length=55, min_length=1)
    description: Optional[str] = Field(..., emotion_type='Title', max_length=755, min_length=1)
    status: Optional[bool] = False
    

class EmotionOutText(BaseModel):
    t_emotion_id: UUID
    status: bool
    emotion_type: str
    description: str
    created_at: datetime
    updated_at: datetime