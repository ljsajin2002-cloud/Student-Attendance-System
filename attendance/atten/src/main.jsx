import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/auth-context";
import { StudentsProvider } from "./context/StudentsContext";
import { TeachersProvider } from "./context/TeachersContext";
import { AttendanceProvider } from "./context/AttendanceContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <StudentsProvider>
        <TeachersProvider>
          <AttendanceProvider>
            <App />
          </AttendanceProvider>
        </TeachersProvider>
      </StudentsProvider>
    </AuthProvider>
  </React.StrictMode>
);