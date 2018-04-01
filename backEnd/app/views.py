from app import app
from flask import request, jsonify, make_response

@app.route("/")
def index():
    return make_response(jsonify({"info": "Hello World!"}), 200)
@app.route("/order",methods=['GET'])

def get_order():
    from app.models import Customer
    uid = request.args.get('query')
    customer = Customer.get_customer_info(uid)

    data = {
        'orderPlaceDate': "string",
        'totalPrice': "string",
        'shipTo': "string",
        'orderID': "string",
        'deliveredDate': "string",
        'soldBy': "string",
        'title': "string",
        'img': "string",
        'id': "string"
    }

    return jsonify({"data": data,
                    "info":"",
                    "status":True})