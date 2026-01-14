import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // MOCK AUTH (backend later)
    login({
      role: role,
      name: role === "ADMIN" ? "Admin" : "Teacher",
    });

    navigate(role === "ADMIN" ? "/admin" : "/teacher");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Student Attendance Tracker</h2>

        {/* STEP 1: ROLE SELECTION */}
        {step === 1 && (
          <>
            <button
              className="login-btn admin"
              onClick={() => handleRoleSelect("ADMIN")}
            >
              Login as Admin
            </button>

            <button
              className="login-btn teacher"
              onClick={() => handleRoleSelect("TEACHER")}
            >
              Login as Teacher
            </button>
          </>
        )}

        {/* STEP 2: LOGIN FORM */}
        {step === 2 && (
          <form onSubmit={handleSubmit}>
            <p className="selected-role">
              Logging in as <strong>{role}</strong>
            </p>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="login-btn admin">
              Login
            </button>

            <button
              type="button"
              className="back-btn"
              onClick={() => setStep(1)}
            >
              ← Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
