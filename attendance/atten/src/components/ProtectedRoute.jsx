import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  // If role is an array, check includes
  if (Array.isArray(role) && !role.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  // If role is single value
  if (role && !Array.isArray(role) && user.role !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
