import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) return null;

  const isActive = (path) =>
    location.pathname === path ? "active" : "";

  return (
    <aside className="sidebar">
      <h3>Menu</h3>

      {user.role === "ADMIN" && (
        <>
          <Link className={isActive("/admin")} to="/admin">
            Dashboard
          </Link>
          <Link className={isActive("/students")} to="/students">
            Students
          </Link>
          <Link className={isActive("/teachers")} to="/teachers">
            Teachers
          </Link>
            <Link className={isActive("/attendance")} to="/attendance">
            Attendance
          </Link>
          <Link className={isActive("/reports")} to="/reports">
            Reports
          </Link>
        </>
      )}

      {user.role === "TEACHER" && (
        <>
          <Link className={isActive("/teacher")} to="/teacher">
            Dashboard
          </Link>
          <Link className={isActive("/attendance")} to="/attendance">
            Attendance
          </Link>
          <Link className={isActive("/reports")} to="/reports">
            Reports
          </Link>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
