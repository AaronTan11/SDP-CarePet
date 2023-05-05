from database import db_session
from flask import request, jsonify
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from models import *

import dotenv
import os

app = Flask(__name__)

bcrypt = Bcrypt(app)
CORS(app, origins=["http://localhost:3000"])


dotenv.load_dotenv()
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


# Routes
# Register route
@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()

    if not data or not data.get("username") or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Missing required fields"}), 400

    existing_user_email = User.query.filter_by(email=data["email"]).first()
    existing_user_username = User.query.filter_by(
        username=data["username"]).first()

    if existing_user_email:
        return jsonify({"error": "User with this email already exists"}), 409

    if existing_user_username:
        return jsonify({"error": "User with this username already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(
        data["password"]).decode("utf-8")

    user = User(username=data["username"],
                email=data["email"], password=hashed_password)
    db_session.add(user)
    db_session.commit()

    return jsonify({"success": "User registered successfully"}), 201


# Login route
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Missing required fields"}), 400

    user = User.query.filter_by(email=data["email"]).first()
    if not user or not bcrypt.check_password_hash(user.password, data["password"]):
        return jsonify({"error": "Invalid email or password"}), 401

    return jsonify({"success": "User logged in successfully", "user_id": user.id, "username": user.username}), 200


# Getting Users


# Shutting down sessions
@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


# Initialization
if __name__ == "__main__":
    from database import init_db

    init_db()
    app.run(debug=True)
