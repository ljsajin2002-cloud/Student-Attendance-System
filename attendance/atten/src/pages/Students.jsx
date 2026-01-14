import { useEffect, useMemo, useState } from "react";
import api from "../services/api"; // axios instance

function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    roll_no: "",
    department: "",
    year: "",
    user_id: "",
  });

  // ✅ NEW: Search state
  const [search, setSearch] = useState("");

  const fetchStudents = async () => {
    const res = await api.get("/students/");
    // supports both: [] OR { students: [] }
    const list = Array.isArray(res.data) ? res.data : res.data.students || [];
    setStudents(list);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addStudent = async () => {
    if (!form.name || !form.roll_no) {
      return alert("Name and Roll No are required");
    }

    await api.post("/students/", {
      ...form,
      year: form.year ? Number(form.year) : null,
      user_id: form.user_id ? Number(form.user_id) : null,
    });

    setForm({ name: "", roll_no: "", department: "", year: "", user_id: "" });
    fetchStudents();
    alert("Student added!");
  };

  // ✅ Highlight helper
  const highlightText = (text) => {
    const value = text ?? "";
    if (!search.trim()) return value;

    const s = search.trim();
    const regex = new RegExp(`(${s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");

    return value.split(regex).map((part, i) =>
      part.toLowerCase() === s.toLowerCase() ? (
        <span key={i} style={{ backgroundColor: "yellow", padding: "0 2px" }}>
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  // ✅ Filtered list (search by name/roll/department)
  const filteredStudents = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return students;

    return students.filter((s) => {
      const name = (s.name || "").toLowerCase();
      const roll = (s.roll_no || "").toLowerCase();
      const dept = (s.department || "").toLowerCase();
      return name.includes(q) || roll.includes(q) || dept.includes(q);
    });
  }, [students, search]);

  return (
    <div>
      <h2>Students</h2>

      {/* Add Student Form (UNCHANGED) */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "15px" }}>
        <input name="name" placeholder="Student Name" value={form.name} onChange={handleChange} />
        <input name="roll_no" placeholder="Roll No" value={form.roll_no} onChange={handleChange} />
        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />
        <input name="year" type="number" placeholder="Year" value={form.year} onChange={handleChange} />
        <input name="user_id" type="number" placeholder="User ID (optional)" value={form.user_id} onChange={handleChange} />
        <button onClick={addStudent}>Add Student</button>
      </div>

      {/* ✅ NEW: Search Filter */}
      <div style={{ marginBottom: 12 }}>
        <input
          placeholder="Search student (name / roll no / department)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            width: "320px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        {search.trim() && (
          <button
            onClick={() => setSearch("")}
            style={{
              marginLeft: 10,
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        )}
      </div>

      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Roll No</th>
            <th>Name</th>
            <th>Department</th>
            <th>Year</th>
            <th>User ID</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{highlightText(s.roll_no || "-")}</td>
              <td>{highlightText(s.name || "-")}</td>
              <td>{highlightText(s.department || "-")}</td>
              <td>{s.year ?? "-"}</td>
              <td>{s.user_id ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;