import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    user_id: "",
    department: "",
    designation: "",
  });

  // ✅ NEW: Search state
  const [search, setSearch] = useState("");

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/teachers/");

      // supports both: [] OR { teachers: [] }
      const list = Array.isArray(res.data) ? res.data : res.data.teachers || [];
      setTeachers(list);
    } catch (err) {
      console.error("Failed to fetch teachers", err);
      alert("Failed to fetch teachers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const addTeacher = async () => {
    if (!form.user_id || !form.department || !form.designation) {
      return alert("user_id, department, designation are required");
    }

    try {
      await api.post("/teachers/", {
        user_id: Number(form.user_id),
        department: form.department,
        designation: form.designation,
      });

      setForm({ user_id: "", department: "", designation: "" });
      fetchTeachers();
      alert("Teacher added!");
    } catch (err) {
      console.error("Failed to add teacher", err);
      alert("Failed to add teacher");
    }
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

  // ✅ Filtered list (search by name/department/designation)
  const filteredTeachers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return teachers;

    return teachers.filter((t) => {
      const name = (t.user_name || "").toLowerCase();
      const dept = (t.department || "").toLowerCase();
      const desig = (t.designation || "").toLowerCase();
      return name.includes(q) || dept.includes(q) || desig.includes(q);
    });
  }, [teachers, search]);

  return (
    <div>
      <h2>Teachers</h2>

      {/* Add Teacher Form (UNCHANGED) */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
        <input
          name="user_id"
          type="number"
          placeholder="User ID (teacher)"
          value={form.user_id}
          onChange={handleChange}
        />
        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
        />
        <input
          name="designation"
          placeholder="Designation"
          value={form.designation}
          onChange={handleChange}
        />
        <button onClick={addTeacher}>Add Teacher</button>
      </div>

      {/* ✅ NEW: Search Filter */}
      <div style={{ marginBottom: 12 }}>
        <input
          placeholder="Search teacher (name / department / designation)..."
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

      {loading && <p>Loading...</p>}

      {!loading && filteredTeachers.length === 0 ? (
        <p>No teachers found.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Teacher Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Created At</th>
            </tr>
          </thead>

          <tbody>
            {filteredTeachers.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{highlightText(t.user_name || "-")}</td>
                <td>{highlightText(t.department || "-")}</td>
                <td>{highlightText(t.designation || "-")}</td>
                <td>{t.created_at || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Teachers;