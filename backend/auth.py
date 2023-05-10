# import jwt
# from functools import wraps
# from flask import request, jsonify, make_response
# from datetime import datetime, timedelta
# import os
# from models import *


# def token_required(f):
#     @wraps(f)
#     def decorated(*args, **kwargs):
#         token = None

#         if 'Authorization' in request.headers:
#             token = request.headers['Authorization']

#         if not token:
#             return jsonify({'error': 'Token is missing'}), 401

#         try:
#             data = jwt.decode(token, os.getenv(
#                 'SECRET_KEY'), algorithms=["HS256"])
#             current_user = User.query.filter_by(id=data['sub']).first()
#         except:
#             return jsonify({'error': 'Token is invalid'}), 401

#         return f(current_user, *args, **kwargs)

#     return decorated


# def generate_token(user_id):
#     payload = {
#         'exp': datetime.utcnow() + timedelta(days=1),
#         'iat': datetime.utcnow(),
#         'sub': user_id,
#     }
#     token = jwt.encode(payload, os.getenv("SECRET_KEY"), algorithm='HS256')
#     return token
