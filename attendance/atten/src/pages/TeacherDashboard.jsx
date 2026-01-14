import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TeacherDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Teacher Dashboard</h2>

      <div
        style={{
          background: "#f5f5f5",
          padding: 15,
          borderRadius: 8,
          marginBottom: 15,
        }}
      >
        <h3 style={{ margin: 0 }}>
          Welcome {user?.name ? user.name : "Teacher"} 👋
        </h3>
        <p style={{ margin: "6px 0 0 0", color: "#555" }}>
          Role: {user?.role || "TEACHER"}
        </p>
      </div>

      <h3>Quick Actions</h3>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button onClick={() => navigate("/attendance")} style={btnStyle}>
          Mark Attendance
        </button>
        <button onClick={() => navigate("/reports")} style={btnStyle}>
          View Reports
        </button>
      </div>

      <div style={{ marginTop: 20, color: "#666" }}>
        <p style={{ margin: 0 }}>
          Tip: Go to <b>Mark Attendance</b> to select subject + date and mark
          attendance.
        </p>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  cursor: "pointer",
  background: "white",
};

export default TeacherDashboard;