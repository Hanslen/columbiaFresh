from app import app
from flask import request, jsonify

@app.route("/")
def index():
    return "Hello World!"
