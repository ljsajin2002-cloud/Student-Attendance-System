from flask import Blueprint, jsonify
from database import get_db_connection

subject_bp = Blueprint("subjects", __name__, url_prefix="/api/subjects")

@subject_bp.route("/", methods=["GET"])
def get_subjects():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id, name, department, teacher_id
        FROM subjects
        ORDER BY id ASC
    """)

    rows = cursor.fetchall()
    data = []
    for r in rows:
        data.append({
            "id": r[0],
            "name": r[1],
            "department": r[2],
            "teacher_id": r[3],
        })

    cursor.close()
    conn.close()
    return jsonify(data), 200