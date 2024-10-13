from flask import Flask
from flask_restful import Api, Resource
from training import trainingBot
import nltk
nltk.download('punkt')
from nltk.stem import SnowballStemmer
stemmer = SnowballStemmer("english")

# things we need for Tensorflow
import numpy as np
import pandas as pd
import pickle
import json
from tensorflow import keras
from flask_cors import CORS
from functools import wraps

app = Flask(__name__)
cors = CORS(app)
api = Api(app)


@app.route('/chatRes/<string:message>', methods=['GET'])
# @token_required
def chatRes(message):
    # test=trainingBot()
    print(message)
    model = keras.models.load_model("./Model.h5")
    data = pickle.load(open("chatBotData.pkl", "rb"))
    words = data['words']
    classes = data['classes']

    def clean_up_sentence(sentence):
        # tokenize the pattern - split words into array
        sentence_words = nltk.word_tokenize(sentence)
        # stem each word - create short form for word
        sentence_words = [stemmer.stem(word.lower()) for word in sentence_words]
        print(sentence_words)
        return sentence_words

    # return bag of words array: 0 or 1 for each word in the bag that exists in the sentence
    def bow(sentence, words, show_details=True):
        # tokenize the pattern
        sentence_words = clean_up_sentence(sentence)
        # bag of words - matrix of N words, vocabulary matrix
        bag = [0] * len(words)
        for s in sentence_words:
            for i, w in enumerate(words):
                if w == s:
                    # assign 1 if current word is in the vocabulary position
                    bag[i] = 1
        return (np.array(bag))

    def classify_local(sentence):
        ERROR_THRESHOLD = 0.25

        with open('intentt.json') as json_data:
            intents = json.load(json_data)

        # generate probabilities from the model
        input_data = pd.DataFrame([bow(sentence, words)], dtype=float, index=['input'])
        results = model.predict([input_data])[0]
        # filter out predictions below a threshold, and provide intent index
        results = [[i, r] for i, r in enumerate(results) if r > ERROR_THRESHOLD]
        # sort by the strength of probability
        results.sort(key=lambda x: x[1], reverse=True)
        return_list = []
        for r in results:
            return_list.append((classes[r[0]], str(r[1])))
        label = return_list[0][0]
        # return tuple of intent and probability
        for intent in intents['intents']:
            if intent['tag'] == label:
                res = intent
        return res

    intent = classify_local(message)

    return {"data": intent}


if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=False)
