from fastapi import APIRouter
from app.api.api_v1.handlers import user
from app.api.auth.jwt import auth_router
from app.api.api_v1.handlers import voiceEmo
from app.api.api_v1.handlers import voiceEmo, textEmo

router = APIRouter()

router.include_router(user.user_router, prefix="/users", tags=["users"])
router.include_router(auth_router, prefix="/auth", tags=["auth"])
router.include_router(voiceEmo.voice_emo_router, prefix='/voiceEmo', tags=["voiceEmo"])
router.include_router(textEmo.text_emo_router, prefix='/texteEmo', tags=["textEmo"])
