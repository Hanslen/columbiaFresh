from app import app
from flask import request, jsonify

@app.route("/")
def index():
    return jsonify(status=200, info='Hello World!')
