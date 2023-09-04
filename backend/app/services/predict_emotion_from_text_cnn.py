# Import the required libraries
import os
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense
import pickle
from app.config import settings
import itertools
import re
import nltk 
nltk.download('stopwords')
from nltk.corpus import stopwords
stopwords_list = set(stopwords.words('english'))
stopwords_temp = [re.sub("[']", "", stopword) for stopword in stopwords_list]
stopwords_set = set(stopwords_temp)

import string
punc_list = list(string.punctuation)

import spacy
nlp = spacy.load("en_core_web_sm")

import unicodedata

import tensorflow as tf



class PredictEmotionFromTextCNN:
    def __init__(self, scaler_path = None, scaler_path_emotion= None):
        if scaler_path is not None and scaler_path_emotion is not None:

            with open(scaler_path, 'rb') as f:
                self.scaler2 = pickle.load(f)

            with open(scaler_path_emotion, 'rb') as f:
                self.scaler3 = pickle.load(f)

            print("Done")

    def process_text(self, text):
        global i
        i=1
        i += 1
        if i == 1000:
            print(i)
        text_new = re.sub(r"['#@\$\"\.,!?~]", "",text)
        text_new = re.sub(r"[-_/]", " ", text_new)
        text_new = re.sub(r" +", " ", text_new) 
        text_new = re.sub(r'(.)\1{2,}', r'\1', text_new)
        text_new = re.sub(r'[\U00010000-\U0010ffff]', '', text_new)  # removing emojis
        word_splitted = nltk.word_tokenize(text_new) # word splitting
        word_splitted = [word.lower() for word in word_splitted] # lowercase
        word_splitted = [word for word in word_splitted if word not in punc_list and word not in stopwords_set]
        text_new = " ".join(word_splitted)
        doc = nlp(text_new)
        text_new = [token.lemma_ for token in doc] # lemmatization
        text_new = [token.lower() for token in text_new]
        return " ".join(text_new)
    
    def extract_features(self,text):
        tokenizer = Tokenizer(num_words=10000)
        tokenizer.fit_on_texts(text)

        text_seq = tokenizer.texts_to_sequences(text)

        text_pad = pad_sequences(text_seq, maxlen=64)
        
        predictions = self.scaler3.predict(text_pad)
        predicted_label = np.argmax(predictions[0])

        return str(predicted_label)

    def prediction(self, text):
        res=self.extract_features(text)
        return res


class MyObject: 
    def __init__(self): 
        self.my_list = []

    def __iter__(self): 
        return iter(self.my_list)


