from flask import Flask, jsonify
from flask_cors import CORS
from routes.auth_routes import auth_bp

from routes.student_routes import student_bp
from routes.subject_routes import subject_bp
from routes.attendance_routes import attendance_bp
from routes.teacher_routes import teacher_bp

app = Flask(__name__)
app.secret_key = "your_secret_key"

# Allow Vite frontend to access /api/*
CORS(
    app,
    resources={r"/api/*": {"origins": "http://localhost:5173"}},
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
)

# allow both /route and /route/
app.url_map.strict_slashes = False

# Register blueprints (DO NOT add extra url_prefix here because blueprints already have it)
app.register_blueprint(auth_bp)
app.register_blueprint(student_bp)
app.register_blueprint(subject_bp)
app.register_blueprint(attendance_bp)
app.register_blueprint(teacher_bp)

@app.route("/")
def home():
    return jsonify({"message": "Backend running"}), 200

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)