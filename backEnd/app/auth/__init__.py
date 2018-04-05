from flask import request, jsonify, make_response
from ..models import Customer

def check_token(func):
    def wrapper(*args, **kwargs):
        try:
            content = request.json
            token = content['token']
            (verify, customer, msg) = Customer.verify_token(token)

            if verify is False:
                return make_response(jsonify({'msg': msg}), 403)

            msg, success = func(customer, content, *args, **kwargs)
            if success is True:
                return make_response(jsonify(msg), 200)
            else:
                return make_response(jsonify({'error info': str(msg)}), 500)

        except Exception as e:
            return make_response(jsonify({'error info': str(e)}), 500)

    wrapper.__name__ = func.__name__
    return wrapper