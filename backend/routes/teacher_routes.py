from flask import Blueprint, request, jsonify
from database import get_db_connection

teacher_bp = Blueprint("teacher_bp", __name__, url_prefix="/api/teachers")


@teacher_bp.route("/", methods=["GET"])
def get_teachers():
    conn = get_db_connection()
    cur = conn.cursor()

    # teachers.user_id joins users.id to show teacher username/email if needed
    cur.execute("""
        SELECT 
            t.id, t.user_id, t.department, t.designation, t.created_at,
            u.name AS user_name, u.email AS user_email
        FROM teachers t
        LEFT JOIN users u ON u.id = t.user_id
        ORDER BY t.id DESC
    """)
    rows = cur.fetchall()

    cur.close()
    conn.close()

    data = []
    for r in rows:
        data.append({
            "id": r[0],
            "user_id": r[1],
            "department": r[2],
            "designation": r[3],
            "created_at": str(r[4]) if r[4] else None,
            "user_name": r[5],
            "user_email": r[6],
        })

    return jsonify(data), 200


@teacher_bp.route("/", methods=["POST"])
def add_teacher():
    body = request.get_json() or {}

    user_id = body.get("user_id")
    department = body.get("department")
    designation = body.get("designation")

    if not user_id or not department or not designation:
        return jsonify({"message": "user_id, department, designation are required"}), 400

    conn = get_db_connection()
    cur = conn.cursor()

    # Optional: ensure user exists and has TEACHER role
    cur.execute("SELECT id, role FROM users WHERE id = %s", (user_id,))
    user = cur.fetchone()
    if not user:
        cur.close()
        conn.close()
        return jsonify({"message": "User not found"}), 404

    try:
        cur.execute(
            "INSERT INTO teachers (user_id, department, designation) VALUES (%s, %s, %s)",
            (user_id, department, designation)
        )
        conn.commit()
    except Exception as e:
        conn.rollback()
        cur.close()
        conn.close()
        return jsonify({"message": "Failed to add teacher", "error": str(e)}), 500

    cur.close()
    conn.close()

    return jsonify({"message": "Teacher added successfully"}), 201