from app import app
from flask import jsonify, make_response

@app.route("/")
def index():
    return make_response(jsonify({"info": "Welcome to ColumbiaFresh!"}), 200)

