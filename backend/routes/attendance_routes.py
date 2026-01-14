from flask import Blueprint, request, jsonify
from database import get_db_connection

attendance_bp = Blueprint("attendance_bp", __name__, url_prefix="/api/attendance")


# ----------------------------
# POST /api/attendance/
# Body: { student_id, subject_id, date, status, marked_by }
# marked_by should be a USERS.id (recommended), so ADMIN or TEACHER both work
# ----------------------------
@attendance_bp.route("/", methods=["POST"])
def mark_attendance():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"error": "No JSON body received"}), 400

    required = ["student_id", "subject_id", "date", "status", "marked_by"]
    missing = [k for k in required if k not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {missing}"}), 400

    student_id = data["student_id"]
    subject_id = data["subject_id"]
    date = data["date"]
    status = data["status"]
    marked_by = data["marked_by"]

    if status not in ["PRESENT", "ABSENT"]:
        return jsonify({"error": "status must be PRESENT or ABSENT"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # If you want "one record per student per subject per date"
        # then update existing row instead of inserting duplicates.
        cursor.execute(
            """
            SELECT id FROM attendance
            WHERE student_id=%s AND subject_id=%s AND date=%s
            """,
            (student_id, subject_id, date),
        )
        existing = cursor.fetchone()

        if existing:
            attendance_id = existing[0]
            cursor.execute(
                """
                UPDATE attendance
                SET status=%s, marked_by=%s
                WHERE id=%s
                """,
                (status, marked_by, attendance_id),
            )
        else:
            cursor.execute(
                """
                INSERT INTO attendance (student_id, subject_id, date, status, marked_by)
                VALUES (%s, %s, %s, %s, %s)
                """,
                (student_id, subject_id, date, status, marked_by),
            )

        conn.commit()
        return jsonify({"message": f"Marked {status}"}), 200

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e), "message": "Failed to mark attendance"}), 500

    finally:
        cursor.close()
        conn.close()


# ----------------------------
# GET /api/attendance/report?date=YYYY-MM-DD&subject_id=20
# Returns rows for report table
# ----------------------------
@attendance_bp.route("/report", methods=["GET"])
def attendance_report():
    date = request.args.get("date")
    subject_id = request.args.get("subject_id")

    if not date or not subject_id:
        return jsonify({"error": "date and subject_id are required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # This assumes:
        # attendance.student_id -> students.id
        # attendance.subject_id -> subjects.id
        # attendance.marked_by  -> users.id   (IMPORTANT)
        cursor.execute(
            """
            SELECT
                st.roll_no,
                st.name AS student_name,
                a.status,
                u.name AS marked_by_name,
                a.date
            FROM attendance a
            JOIN students st ON st.id = a.student_id
            JOIN users u ON u.id = a.marked_by
            WHERE a.date = %s AND a.subject_id = %s
            ORDER BY st.roll_no ASC
            """,
            (date, subject_id),
        )

        rows = cursor.fetchall()
        report = []
        for r in rows:
            report.append(
                {
                    "roll_no": r[0],
                    "student_name": r[1],
                    "status": r[2],
                    "marked_by": r[3],
                    "date": str(r[4]),
                }
            )

        return jsonify(report), 200

    except Exception as e:
        return jsonify({"error": str(e), "message": "Failed to fetch report"}), 500

    finally:
        cursor.close()
        conn.close()