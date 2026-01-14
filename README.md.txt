📊 Student Attendance Management System

A full-stack Student Attendance Management System built using React, Flask, and MySQL.
This application allows Admins and Teachers to manage students, teachers, and attendance records efficiently.

🚀 Features
👨‍💼 Admin

Login as Admin (mock authentication)

Manage students

Manage teachers

View attendance reports

👨‍🏫 Teacher

Login as Teacher (mock authentication)

Mark student attendance

View attendance reports

📅 Attendance

Mark attendance as Present / Absent

Prevent duplicate attendance entries

Attendance stored in MySQL database

📈 Reports

Filter attendance by date and subject

View student-wise attendance reports

🛠️ Tech Stack
Frontend

React (Vite)

Axios

React Router

Backend

Flask

Flask-CORS

MySQL

Database

MySQL

📂 Project Structure
Student-Attendance-System/
├── backend/
│   └── backend/
│       ├── app.py
│       ├── database.py
│       ├── routes/
│       └── models/
│
├── attendance/
│   └── atten/
│       ├── src/
│       ├── package.json
│       └── vite.config.js
│
└── README.md

⚙️ Installation & Setup
🔹 Prerequisites

Node.js (v16+ recommended)

Python (v3.9+)

MySQL

Git

🔹 Backend Setup (Flask)
cd backend/backend
pip install -r requirements.txt
python app.py


Backend runs on:
http://localhost:5000

Configure MySQL credentials inside database.py

🔹 Frontend Setup (React)
cd attendance/atten
npm install
npm run dev


Frontend runs on:
http://localhost:5173

🔐 Authentication Note

Authentication is mocked on the frontend for project scope

Backend authentication APIs are implemented but not enforced

Admin and Teacher roles are selected at login for demo purposes

## 📸 Screenshots

### 🔐 Login Page
![Login Page](images/login.png)

### 🔐 student Page
![Login Page](images/student.png)

### 🧑‍💼 Admin Dashboard
![Admin Dashboard](images/dashboard.png)

### 📅 Mark Attendance
![Mark Attendance](images/attendance.png)

### 📈 Attendance Report
![Attendance Report](images/report.png)

🎥 Walkthrough Video

project walkthrough video-https://drive.google.com/file/d/1wpMUHn3t2wr5Wm_RXzVzJyEJuOE6JcPA/view?usp=sharing


📌 Project Status

✅ Core functionality completed
✅ Backend & frontend integrated
✅ Ready for internship submission

👤 Author

Sajin LJ
Student Attendance Management System
Internship Project

📄 License

This project is for educational and internship evaluation purposes.