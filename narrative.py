from flask import Flask, request, jsonify, render_template, json
from chatbot import ChatBot
import sys
import os

app = Flask(__name__, static_url_path='')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/chatbot/', methods=['POST'])
def user_spoke():
    text = request.form['text']
    videoPlayed = request.form['videoPlayed']
    isLost = request.form['isLost']
    return chatbot.get_response(text, videoPlayed, isLost)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 33507))
    app.run(host='0.0.0.0', port=port)
