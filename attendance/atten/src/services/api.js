import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
});

// Subjects
export const getSubjects = () => api.get("/subjects/");

// Students (if you need later)
export const getStudents = () => api.get("/students/");

export default api;