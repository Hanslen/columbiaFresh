from app import app
from flask import request, jsonify, make_response

@app.route("/")
def index():
    return make_response(jsonify({"info": "Hello World!"}), 200)

@app.route("/order",methods=['POST'])
def get_order():
    from app.models import Customer
    content = request.json
    token = content['token']
    uid = content['userId']
    (result, customer) = Customer.verify_token(token)
    order_list = []

    if result is False:
        return jsonify({"success": False, "msg": "Token Error"})

    if customer.uid == int(uid):
        from app.models import Order
        order_list = Order.find_order_by_user_id()
    return jsonify({"success": True, "msg": order_list})