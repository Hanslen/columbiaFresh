from app import app, db
from flask import request, jsonify

@app.route("/")
def index():
    return "Hello World!"

from app.models import Customer

@app.route('/signup', methods=['POST','GET'])
def signup():
    try:
        # read the posted values from the UI
        content = request.json
        customer = Customer(cname=content['name'], email=content['email'], password=content['pwd'])
        db.session.add(customer)
        db.session.commit()
        app.logger.info(customer.id)
        return jsonify({"id": customer.id})

    except Exception as e:
        print (e)
        return jsonify({"id" : None})