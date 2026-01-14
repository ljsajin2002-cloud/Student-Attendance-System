

# NOTE:
# Authentication routes are implemented but currently
# frontend uses mock login for project scope.

from flask import Blueprint, request, jsonify
from models.user_model import create_user, find_user_by_email
from werkzeug.security import check_password_hash

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"message": "Missing fields"}), 400

    if find_user_by_email(email):
        return jsonify({"message": "User already exists"}), 409

    # ✅ pass role
    create_user(name, email, password, "USER")

    return jsonify({"message": "User registered successfully"}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = find_user_by_email(email)

    if not user:
        return jsonify({"message": "Invalid email or password"}), 401

    if not check_password_hash(user["password"], password):
        return jsonify({"message": "Invalid email or password"}), 401

    return jsonify({
        "message": "Login successful",
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "role": user["role"]
        }
    }), 200

@auth_bp.route("/profile", methods=["GET"])
def profile():
    return jsonify({
        "message": "Profile endpoint working"
    }), 200


