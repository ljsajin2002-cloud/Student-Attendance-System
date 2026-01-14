from database import get_db_connection
from werkzeug.security import generate_password_hash


def find_user_by_email(email):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT id, name, email, password, role FROM users WHERE email = %s",
        (email,)
    )

    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if user:
        return {
            "id": user[0],
            "name": user[1],
            "email": user[2],
            "password": user[3],
            "role": user[4]
        }

    return None


def create_user(name, email, password, role):
    conn = get_db_connection()
    cursor = conn.cursor()

    hashed_password = generate_password_hash(password)

    cursor.execute(
        "INSERT INTO users (name, email, password, role) VALUES (%s, %s, %s, %s)",
        (name, email, hashed_password, role)
    )

    conn.commit()
    cursor.close()
    conn.close()
