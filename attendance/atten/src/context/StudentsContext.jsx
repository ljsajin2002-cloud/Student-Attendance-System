import { createContext, useState } from "react";

export const StudentsContext = createContext();

export const StudentsProvider = ({ children }) => {
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", roll_no: "101", class_name: "10-A" },
    { id: 2, name: "Jane Smith", roll_no: "102", class_name: "10-A" },
  ]);

  return (
    <StudentsContext.Provider value={{ students, setStudents }}>
      {children}
    </StudentsContext.Provider>
  );
};
