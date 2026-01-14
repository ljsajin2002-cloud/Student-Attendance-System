import { useEffect, useState } from "react";
import { getSubjects } from "../services/api";
import { getAttendanceReport } from "../services/attendance";

export default function Reports() {
  const [date, setDate] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSubjects()
      .then((res) => setSubjects(res.data))
      .catch(() => alert("Failed to load subjects"));
  }, []);

  const fetchReport = async () => {
    if (!date || !subjectId) {
      alert("Select Date & Subject");
      return;
    }

    setLoading(true);
    setReport([]);

    try {
      const res = await getAttendanceReport(date, subjectId);
      setReport(res.data);
    } catch (e) {
      alert("Failed to fetch report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Attendance Report</h2>

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div>
          <label>Date</label>
          <br />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div>
          <label>Subject</label>
          <br />
          <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
            <option value="">-- Select Subject --</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <button onClick={fetchReport} style={{ height: 30, marginTop: 18 }}>
          View Report
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && report.length > 0 && (
        <table border="1" cellPadding="8" style={{ marginTop: 20, width: "100%" }}>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student</th>
              <th>Status</th>
              <th>Marked By</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {report.map((r, i) => (
              <tr key={i}>
                <td>{r.roll_no}</td>
                <td>{r.student_name}</td>
                <td>{r.status}</td>
                <td>{r.marked_by}</td>
                <td>{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && report.length === 0 && date && subjectId && (
        <p style={{ marginTop: 15 }}>No records found.</p>
      )}
    </div>
  );
}