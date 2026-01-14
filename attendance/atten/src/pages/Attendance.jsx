import { useEffect, useState } from "react";
import { markAttendance } from "../services/attendance.js";
import api from "../services/api";

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  // 🔹 Load students
  useEffect(() => {
    api.get("/students/")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 🔹 Load subjects
  useEffect(() => {
    api.get("/subjects/")
      .then((res) => setSubjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 🔹 Mark attendance
const handleAttendance = async (studentId, status) => {
  try {
    if (!selectedSubject) {
      alert("Please select a subject");
      return;
    }

    // Example: get logged-in user id from localStorage (adjust to your auth)
    const userId = Number(localStorage.getItem("user_id")) || 15;

    await markAttendance({
      student_id: studentId,
      subject_id: Number(selectedSubject),
      date,
      status,
      marked_by: userId
    });

    alert(`Marked ${status}`);
  } catch (error) {
    console.error(error?.response?.data || error);
    alert("Failed to mark attendance");
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mark Attendance</h2>

      {/* Date */}
      <label>Date:</label>
      <br />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ padding: "6px", marginBottom: "10px" }}
      />

      <br />

      {/* Subject */}
      <label>Subject:</label>
      <br />
      <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
  <option value="">-- Select Subject --</option>
  {subjects.map((s) => (
    <option key={s.id} value={s.id}>{s.name}</option>
  ))}
</select>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table
          border="1"
          cellPadding="12"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead style={{ background: "#f2f2f2" }}>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Present</th>
              <th>Absent</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.roll_no}</td>
                <td>{s.name}</td>

                <td>
                  <button
                    onClick={() =>
                      handleAttendance(s.id, "PRESENT")
                    }
                    style={{
                      padding: "6px 14px",
                      background: "#4caf50",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Present
                  </button>
                </td>

                <td>
                  <button
                    onClick={() =>
                      handleAttendance(s.id, "ABSENT")
                    }
                    style={{
                      padding: "6px 14px",
                      background: "#f44336",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Absent
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
