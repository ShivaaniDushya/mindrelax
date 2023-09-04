from app.services.predict_emotion_from_text_cnn import *
from app.config import settings

import os

class TextFuncCNN:
    def analyse_text():
        return "Returning from TextFuncCNN:analyse_text"
    
    def predict_emotion(text):
        # PEFC = PredictEmotionFromTextCNN()

        scaler_path = os.path.join(
            settings.ROOT_DIR,"util","train_model",
            "lstm_with_suicidal_latest02.pkl",
        )

        scaler_path_emotion = os.path.join(
            settings.ROOT_DIR,"util","train_model",
            "emotion_model_lstm.pkl",
        )

        PEFC = PredictEmotionFromTextCNN(
            scaler_path, scaler_path_emotion
        )

        emotion = PEFC.prediction(text)
        # print(emotion)

        # response = {"emotion": emotion}
        return emotion
