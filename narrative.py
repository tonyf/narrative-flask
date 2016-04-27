from flask import Flask, request, jsonify, render_template, json
from chatbot import Chatbot
import sys
import os

app = Flask(__name__, static_url_path='')
chatbot = Chatbot()

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/chatbot/', methods=['POST'])
def user_spoke():
    inputText = request.form['text']
    videoPlayed = request.form['videoPlayed'] == 'true'
    isLost = request.form['isLost'] == 'true'
    shouldEnd = request.form['last'] == 'true'

    outputText = chatbot.get_response(inputText, videoPlayed, isLost, shouldEnd)
    response = jsonify(text=outputText)
    return response

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 33507))
    app.debug = True
    app.run(host='0.0.0.0', port=port)
