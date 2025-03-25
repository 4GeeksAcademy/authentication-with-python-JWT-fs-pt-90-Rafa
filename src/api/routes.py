"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required, current_user
from flask_jwt_extended import JWTManager


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# CREATE USER
@api.route('/sign_up', methods=['POST'])
def sign_up():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    new_user = User(email=email, is_active=True)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "user has been created successfully"}), 201


#  CREATE TOKEN
@api.route('/sign_in', methods=['POST'])
def sign_in():
    if not request.is_json:
        return jsonify({"error": "Invalid content type. Use JSON."}), 400

    data = request.get_json()  # Safely parse JSON

    email = data.get("email", None)
    password = data.get("password", None)

    if not email or not password:
        return jsonify({"error": "Email and password are required."}), 400

    user = User.query.filter_by(email=email).one_or_none()

    if not user or not user.check_password(password):
        return jsonify("Wrong username/password"), 401
    
    access_token = create_access_token(identity=user)

    return jsonify(access_token=access_token)


# CREATE PRIVATE ROUTE
@api.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():

    return jsonify(current_user.serialize()), 200