from flask import Blueprint, jsonify
from database import get_db_connection

student_bp = Blueprint("students", __name__, url_prefix="/api/students")

@student_bp.route("/", methods=["GET"])
def get_students():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT 
            students.id,
            users.name,
            users.email,
            students.roll_no,
            students.department,
            students.year
        FROM students
        JOIN users ON students.user_id = users.id
        ORDER BY students.id ASC
    """)

    columns = [col[0] for col in cursor.description]
    rows = cursor.fetchall()
    data = [dict(zip(columns, row)) for row in rows]

    cursor.close()
    conn.close()
    return jsonify(data), 200