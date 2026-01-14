import { createContext, useState } from "react";

export const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
  const [attendance, setAttendance] = useState([
    // example record
    // { student_id: 1, date: "2026-01-07", status: "Present" }
  ]);

  return (
    <AttendanceContext.Provider value={{ attendance, setAttendance }}>
      {children}
    </AttendanceContext.Provider>
  );
};
