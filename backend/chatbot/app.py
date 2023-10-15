from flask import Flask, render_template, request, jsonify
from chatbot import getResponse
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.post("/predict")
def predict():
    text = request.get_json().get("message")
    response = getResponse(text) 
    message = {"answer":response}
    print(response)
    return jsonify(message)

if (__name__ == "__main__"):
    app.run(debug=True, port=5001)