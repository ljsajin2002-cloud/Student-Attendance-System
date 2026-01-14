import { createContext, useState } from "react";

export const TeachersContext = createContext();

export const TeachersProvider = ({ children }) => {
  const [teachers, setTeachers] = useState([
    { id: 1, name: "Mr. Smith", employee_id: "T101", subject: "Math" },
    { id: 2, name: "Ms. Johnson", employee_id: "T102", subject: "Science" },
  ]);

  return (
    <TeachersContext.Provider value={{ teachers, setTeachers }}>
      {children}
    </TeachersContext.Provider>
  );
};
