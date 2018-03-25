from app import app, db
from flask import request, jsonify
from ...models import Customer

# {
#     userId: string,
#     token: string,
#     firstname: string,
#     lastname: string,
#     gender: int,
#     email: string,
#     introduction: string
# }

@app.route('/settings/update/basic', methods=['POST'])
def update_info():
    try:
        # read the posted values from the UI
        content = request.json
        token = content['token']
        (result, customer) = Customer.verify_token(token)
        if result is False:
            return jsonify({"success": False, "info": "Error"})

        customer.firstname = content['firstname']
        customer.lastname = content['lastname']
        customer.gender = int(content['lastname'])
        customer.introduction = content['introduction']

        db.session.commit()

        return jsonify({"success": True, "msg": "Success."})

    except Exception as e:
        print(e)
        return jsonify({"success": False, "msg": str(e)})

@app.route('/settings/update/password?userId=xxxxx')