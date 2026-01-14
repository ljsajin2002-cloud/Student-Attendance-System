import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // If you store user in localStorage after login (optional)
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
      <h2>Admin Dashboard</h2>

      <div
        style={{
          background: "#f5f5f5",
          padding: 15,
          borderRadius: 8,
          marginBottom: 15,
        }}
      >
        <h3 style={{ margin: 0 }}>
          Welcome {user?.name ? user.name : "Admin"} 👋
        </h3>
        <p style={{ margin: "6px 0 0 0", color: "#555" }}>
          Role: {user?.role || "ADMIN"}
        </p>
      </div>

      <h3>Quick Actions</h3>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button onClick={() => navigate("/students")} style={btnStyle}>
          Manage Students
        </button>
        <button onClick={() => navigate("/teachers")} style={btnStyle}>
          Manage Teachers
        </button>
        <button onClick={() => navigate("/attendance")} style={btnStyle}>
          Mark Attendance
        </button>
        <button onClick={() => navigate("/reports")} style={btnStyle}>
          View Reports
        </button>
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

export default AdminDashboard;