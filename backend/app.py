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
            contact=data["contact"],
            password=hashed_password,
            profile_pic=profile_pic,
            user_role="admin"
        )
    else:
        # Set default role to "user"
        user = User(
            username=data["username"],
            email=data["email"],
            contact=data["contact"],
            password=hashed_password,
            profile_pic=profile_pic,
            user_role="user"
        )

    db_session.add(user)
    db_session.commit()

    return jsonify({"success": "User registered successfully"}), 201


# Add staff route
@app.route("/api/add-staff", methods=["POST"])
def add_staff():
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

    # User role is "staff"
    user = User(
        username=data["username"],
        email=data["email"],
        password=hashed_password,
        profile_pic=profile_pic,
        user_role="staff",
        contact=data.get("contact")  # Contact is optional
    )

    db_session.add(user)
    db_session.commit()

    return jsonify({"success": "Staff added successfully"}), 201


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
        {"success": "User logged in successfully", "user_id": user.id}), 200


# Logout route
@app.route('/api/logout', methods=['POST'])
def logout():
    return jsonify({"success": "User logged out successfully"}), 200


# Get Staff Data
@app.route("/api/staff", methods=["GET"])
def get_staff_data():

    # Fetch all users where user_role is 'staff'
    staffs = User.query.filter_by(user_role="staff").all()

    staff_data = [{"id": staff.id,
                   "username": staff.username,
                   "email": staff.email,
                   "profile_pic": staff.profile_pic,
                   "contact": staff.contact} for staff in staffs]

    return jsonify(staff_data), 200


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


@app.route("/api/AdoptionForm", methods=['POST'])
def form():
    data = request.get_json()

    if not data or not data.get('username') or not data.get('contact') or not data.get('email') or not data.get('petid') or not data.get('salary'):
        return jsonify({'error': 'Missing required fields'}),

    form = AdoptionForm(usrename=data['username'], contact=data['contact'],
                        email=data['email'], petid=data['petid'], salary=data['salary'])
    db_session.add(form)
    db_session.commit()

    return jsonify({"Success": "Successfully"}), 201


@app.route("/api/AdminAddDog", methods=['POST'])
def add():
    data = request.get_json()

    if not data or not data.get('petid') or not data.get('product_name') or not data.get('product_img') or not data.get('description'):
        return jsonify({'error': "Missing required fields"}),

    add = AdminAddDog(petID=data['petid'], Dogname=data['product_name'],
                      Image=data['product_img'], description=data['description'])
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
