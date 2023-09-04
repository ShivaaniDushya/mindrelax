from typing import List
from uuid import UUID
from app.models.user_model import User
from app.models.text_emo_model import TextEmo
from app.schemas.text_emo_schema import TextEmoCreate, TextEmoUpdate

class TextEmoService:
    @staticmethod
    async def list_temotions(user: User) -> List[TextEmo]:
        temotions = await TextEmo.find(TextEmo.owner.id == user.id).to_list()
        return temotions
    
    @staticmethod
    async def generate_t_emotion(user: User, data: TextEmoCreate) -> TextEmo:
        textEmo = TextEmo(**data.dict(), owner=user)
        return await textEmo.insert()
    
    @staticmethod
    async def retrieve_t_emotion(current_user: User, t_emotion_id: UUID):
        textEmo = await TextEmo.find_one(TextEmo.t_emotion_id == t_emotion_id, TextEmo.owner.id == current_user.id)
        return textEmo

