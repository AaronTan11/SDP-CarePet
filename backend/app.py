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


# Add pet route
@app.route("/api/add-pet", methods=["POST"])
def add_pet():
    data = request.get_json()

    if not data or not data.get("petname") or not data.get("description"):
        return jsonify({"error": "Missing required fields"}), 400

    existing_pet = Pets.query.filter_by(petname=data["petname"]).first()

    if existing_pet:
        return jsonify({"error": "Pet with this name already exists"}), 409

    pet = Pets(
        petname=data["petname"],
        Image=get_pet_image(data["petname"]),
        description=data["description"]
    )

    db_session.add(pet)
    db_session.commit()

    return jsonify({"success": "Pet added successfully"}), 201


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
        {"user_id": user.id, "username": user.username, "user_role": user.user_role}), 200


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


# Get Pets Data
@app.route("/api/pets", methods=["GET"])
def get_pets():
    pets = Pets.query.all()

    pet_data = [{"pet_id": pet.id,
                 "pet_name": pet.petname,
                 "pet_image": pet.Image,
                 "description": pet.description} for pet in pets]

    return jsonify(pet_data), 200


# Booking
@app.route("/api/booking", methods=["POST"])
def booking():
    data = request.get_json()

    if not data or not data.get("name") or not data.get("contact") or not data.get("email") or not data.get("date") or not data.get("service_type") or not data.get("pet_breed"):
        return jsonify({"error": "Missing required fields"}), 400

    booking = Booking(user_id=data["id"], name=data["name"], contact=data["contact"],
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


# Update staff route
@app.route("/api/staff/<int:staff_id>", methods=["PUT"])
def update_staff(staff_id):
    data = request.get_json()

    if not data or not data.get("username") or not data.get("email"):
        return jsonify({"error": "Missing required fields"}), 400

    staff = User.query.get(staff_id)

    if not staff or staff.user_role != "staff":
        return jsonify({"error": "Staff not found"}), 404

    # Check for unique email and username
    existing_user_email = User.query.filter(
        User.email == data["email"], User.id != staff_id).first()
    existing_user_username = User.query.filter(
        User.username == data["username"], User.id != staff_id).first()

    if existing_user_email:
        return jsonify({"error": "User with this email already exists"}), 409

    if existing_user_username:
        return jsonify({"error": "User with this username already exists"}), 409

    staff.username = data["username"]
    staff.email = data["email"]
    staff.contact = data.get("contact", staff.contact)

    db_session.commit()

    return jsonify({"success": "Staff updated successfully"}), 200


# Update pet route
@app.route("/api/pets/<int:pet_id>", methods=["PUT"])
def update_pet(pet_id):
    data = request.get_json()

    if not data or not data.get("petname") or not data.get("description"):
        return jsonify({"error": "Missing required fields"}), 400

    pet = Pets.query.get(pet_id)

    if not pet:
        return jsonify({"error": "Pet not found"}), 404

    # Check for unique petname
    existing_pet = Pets.query.filter(
        Pets.petname == data["petname"], Pets.id != pet_id).first()

    if existing_pet:
        return jsonify({"error": "Pet with this name already exists"}), 409

    pet.petname = data["petname"]
    pet.description = data["description"]

    db_session.commit()

    return jsonify({"success": "Pet updated successfully"}), 200


# Delete staff route
@app.route("/api/staff/<int:staff_id>", methods=["DELETE"])
def delete_staff(staff_id):
    staff = User.query.get(staff_id)

    if not staff or staff.user_role != "staff":
        return jsonify({"error": "Staff not found"}), 404

    db_session.delete(staff)
    db_session.commit()

    return jsonify({"success": "Staff deleted successfully"}), 200


# Delete pet route
@app.route("/api/pets/<int:pet_id>", methods=["DELETE"])
def delete_pet(pet_id):
    pet = Pets.query.get(pet_id)

    if not pet:
        return jsonify({"error": "Pet not found"}), 404

    db_session.delete(pet)
    db_session.commit()

    return jsonify({"success": "Pet deleted successfully"}), 200


# Shutting down sessions
@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


# Initialization
if __name__ == "__main__":
    from database import init_db

    init_db()
    app.run(debug=True)
