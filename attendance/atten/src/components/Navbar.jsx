import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return null; // Hide navbar on login page

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h3>Attendance Tracker</h3>

      <div style={styles.links}>
        {user.role === "ADMIN" && (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/students">Students</Link>
            <Link to="/teachers">Teachers</Link>
            <Link to="/reports">Reports</Link>
          </>
        )}

        {user.role === "TEACHER" && (
          <>
            <Link to="/teacher">Dashboard</Link>
            <Link to="/attendance">Attendance</Link>
            <Link to="/reports">Reports</Link>
          </>
        )}

        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    background: "#1e293b",
    color: "#fff",
  },
  links: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
};

export default Navbar;
