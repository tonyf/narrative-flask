from flask import Flask, request, jsonify, render_template, json
from chatterbot import ChatBot
import sys
import os

app = Flask(__name__, static_url_path='')

chatbot = ChatBot(
    'Amy',
    io_adapter="chatterbot.adapters.io.JsonAdapter"
)
chatbot.train("chatterbot.corpus.english")
chatbot.train([
    "Hi",
    "Hello, how are you feeling today?",
    "I'm alright.",
    "Do you want to talk about what happened?",
    "Sure",
    "What do you remember?",
    "I was in the back of a car",
])

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/chatbot/', methods=['POST'])
def user_spoke():
    text = request.form['text']
    return chatbot.get_response(text)['text']

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 33507))
    app.run(host='0.0.0.0', port=port)
