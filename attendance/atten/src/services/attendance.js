import api from "./api";

// Mark attendance
export const markAttendance = (data) => {
  return api.post("/attendance/", data);
};

// Report
export const getAttendanceReport = (date, subjectId) => {
  return api.get(`/attendance/report?date=${date}&subject_id=${subjectId}`);
};