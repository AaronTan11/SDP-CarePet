from database import db_session
from flask import request, jsonify
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import *

import dotenv
import os

app = Flask(__name__)
CORS(app)

dotenv.load_dotenv()
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


# Routes
@app.route("/")
def home():
    return "Hello, World!"


# Shutting down sessions
@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


# Initialization
if __name__ == "__main__":
    from database import init_db

    init_db()
    app.run(debug=True)
