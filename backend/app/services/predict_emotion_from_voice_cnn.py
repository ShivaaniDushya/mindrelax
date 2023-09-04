import time
import os
import numpy as np

# import pyaudio
import wave
import librosa
from scipy.stats import zscore

import tensorflow as tf
from tensorflow.keras import backend as K
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Dense, Dropout, Activation, TimeDistributed
from tensorflow.keras.layers import Conv2D, MaxPooling2D, BatchNormalization, Flatten
from tensorflow.keras.layers import LSTM
from tensorflow.keras.models import Sequential, model_from_json
import pickle


class PredictEmotionFromVoiceCNN:

    def __init__(self, json_file_path = None, load_weight_path_for_new_model = None,scaler_path = None, encoder_path = None):
        
        
        if json_file_path is not None and load_weight_path_for_new_model is not None and scaler_path is not None and encoder_path is not None:
            self.json_file = open(json_file_path, 'r')  
            self.loaded_model_json = self.json_file.read()
            self.json_file.close()
            self.loaded_model = model_from_json(self.loaded_model_json)
            # load weights into new model
            self.loaded_model.load_weights(load_weight_path_for_new_model)

            print("Loaded model from disk")
            
            with open(scaler_path, 'rb') as f:
               self.scaler2 = pickle.load(f)

            with open(encoder_path, 'rb') as f:
               self.encoder2 = pickle.load(f)

            print("Done")


        


    # def voice_recording(self, filename, duration=5, sample_rate=16000, chunk=1024, channels=1):

        
    #     # p = pyaudio.PyAudio()
    #     # stream = p.open(format=pyaudio.paInt16,
    #     #                 channels=channels,
    #     #                 rate=sample_rate,
    #     #                 input=True,
    #     #                 frames_per_buffer=chunk)

        
    #     frames = []

        
    #     print('* Start Recording *')
    #     stream.start_stream()
    #     start_time = time.time()
    #     current_time = time.time()

       
    #     while (current_time - start_time) < duration:

            
    #         data = stream.read(chunk)

            
    #         frames.append(data)

            
    #         current_time = time.time()

        
    #     stream.stop_stream()
    #     stream.close()
    #     p.terminate()
    #     print('* End Recording * ')

        
    #     wf = wave.open(filename, 'w')
    #     wf.setnchannels(channels)
    #     wf.setsampwidth(p.get_sample_size(pyaudio.paInt16))
    #     wf.setframerate(sample_rate)
    #     wf.writeframes(b''.join(frames))
    #     wf.close()


    
        
    
    def extract_features(slef, data,sr=22050,frame_length=2048,hop_length=512):
        result=np.array([])

        def zcr(data,frame_length,hop_length):
            zcr=librosa.feature.zero_crossing_rate(data,frame_length=frame_length,hop_length=hop_length)
            return np.squeeze(zcr)
    
        def rmse(data,frame_length=2048,hop_length=512):
            rmse=librosa.feature.rms(y=data,frame_length=frame_length,hop_length=hop_length)
            return np.squeeze(rmse)
    
        def rmse(data,frame_length=2048,hop_length=512):
            rmse=librosa.feature.rms(y=data,frame_length=frame_length,hop_length=hop_length)
            return np.squeeze(rmse)
    
        def mfcc(data,sr,frame_length=2048,hop_length=512,flatten:bool=True):
            mfcc=librosa.feature.mfcc(y=data,sr=sr)
            return np.squeeze(mfcc.T)if not flatten else np.ravel(mfcc.T)

        result=np.hstack((result,
                      zcr(data,frame_length,hop_length),
                      rmse(data,frame_length,hop_length),
                      mfcc(data,sr,frame_length,hop_length)
                     ))
        return result
    
    
    def get_predict_feat(self, path):
        d, s_rate= librosa.load(path, duration=2.5, offset=0.5)
        res=self.extract_features(d)
        result=np.array(res)
        result=np.reshape(result,newshape=(1,2376))
        i_result = self.scaler2.transform(result)
        final_result=np.expand_dims(i_result, axis=2)

        return final_result
    

    def prediction(self, path1):
        res=self.get_predict_feat(path1)
        predictions=self.loaded_model.predict(res)
        y_pred = self.encoder2.inverse_transform(predictions)
        return y_pred[0][0]