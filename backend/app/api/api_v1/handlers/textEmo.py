from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends
from app.models.user_model import User
from app.api.deps.user_deps import get_current_user
from app.schemas.text_emo_schema import TextEmoCreate, TextEmoUpdate, EmotionOutText
from app.services.text_emo_service import TextEmoService
from app.models.text_emo_model import TextEmo
from app.util.text_record_func_cnn import TextFuncCNN
from app.config import settings
from app.services.text_emo_service import TextEmoService

text_emo_router = APIRouter()

@text_emo_router.get(
    "/", summary="Get past all emotions of the user", response_model=List[EmotionOutText]
)
async def list(current_user: User = Depends(get_current_user)):
    return await TextEmoService.list_temotions(current_user)

@text_emo_router.get("/sample_get", summary="Text output")
def sample_function_text():
    return {"Hello": "World"}

@text_emo_router.post("/analysis", summary="Text input")
def analyse_text(query_string: str):
    return {
        "dataReceived": query_string
        }

@text_emo_router.post("/predict_emotion", summary="Text Emotion Prediction")
def emotion_pred_text(textinput: str):
    return TextFuncCNN.predict_emotion([textinput])
