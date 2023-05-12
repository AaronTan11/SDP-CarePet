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

# Booking
@app.route("/api/Booking", methods=["POST"])
def booking():
    data = request.get_json()

    if not data or not data.get("name") or not data.get("contact") or not data.get("email") or not data.get("date"):
        return jsonify({"error": "Missing required fields"}), 400
    
    
    booking = Booking(name=data['name'],contact=data['contact'],email=data['email'],Date=data['date'])
    db_session.add(booking)
    db_session.commit()

    return jsonify({"Success": "Book Successfully"}),201


@app.route("/api/AdoptionForm", methods=['POST'])
def form():
    data = request.get_json()

    if not data or not data.get('username') or not data.get('contact') or not data.get('email') or not data.get('petid') or not data.get('salary'):
        return jsonify({'error': 'Missing required fields'}),

    form = AdoptionForm(usrename=data['username'], contact=data['contact'], email=data['email'], petid = data['petid'], salary= data['salary'])
    db_session.add(form)
    db_session.commit()

    return jsonify({"Success" : "Successfully"}), 201

@app.route("/api/AdminAddDog", methods =['POST'])
def add():
    data = request.get_json()

    if not data or not data.get('petID') or not data.get('Dogname') or not data.get('Image') or not data.get('description'):
        return jsonify({'error': "Missing required fields"}),

    add = AdminAddDog(petID=data["petID"], Dogname=data["Dogname"], Image=data["Image"], description=data["description"])
    db_session.add(add)
    db_session.commit() 

    return jsonify({"Success": "Added Successfully"}), 201
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
