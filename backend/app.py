from database import db_session
from flask import request, jsonify
from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from models import *
from auth import *
from profileGenerator import *
from flask import make_response


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

    profile_pic = get_gravatar_url(data["email"])

    if User.query.count() == 0:
        # First user to register will be an admin
        user = User(
            username=data["username"],
            email=data["email"],
            password=hashed_password,
            profile_pic=profile_pic,
            user_role="admin"
        )
    else:
        # Set default role to "user"
        user = User(
            username=data["username"],
            email=data["email"],
            password=hashed_password,
            profile_pic=profile_pic,
            user_role="user"
        )

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

    return jsonify(
        {"success": "User logged in successfully", "user_id": user.id, "username": user.username}), 200


# Logout route
@app.route('/api/logout', methods=['POST'])
def logout():
    return jsonify({"success": "User logged out successfully"}), 200


# Get User Data
@app.route("/api/user/<int:user_id>", methods=["GET"])
def get_user_data(user_id):

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    bookings = [{"id": booking.id, "user_id": booking.user_id, "contact": booking.contact, "date": booking.date,
                 "service_type": booking.service_type, "pet_breed": booking.pet_breed} for booking in user.bookings]

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "profile_pic": user.profile_pic,
        "user_role": user.user_role,
        "contact": user.contact,
        "bookings": bookings
    }), 200


# Booking
@app.route("/api/Booking", methods=["POST"])
def booking():
    data = request.get_json()

    if not data or not data.get("name") or not data.get("contact") or not data.get("email") or not data.get("date") or not data.get("service_type") or not data.get("pet_breed"):
        return jsonify({"error": "Missing required fields"}), 400

    booking = Booking(user_id=data["user_id"], name=data["name"], contact=data["contact"],
                      email=data["email"], date=data["date"], service_type=data["service_type"], pet_breed=data["pet_breed"])
    db_session.add(booking)
    db_session.commit()

    return jsonify({"Success": "Book Successfully"}), 201


# Shutting down sessions
@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


# Initialization
if __name__ == "__main__":
    from database import init_db

    init_db()
    app.run(debug=True)
