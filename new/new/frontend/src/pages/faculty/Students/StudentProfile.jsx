import React from "react";
import { useParams } from "react-router-dom";
const StudentProfile = () => {
  const { studentId } = useParams();
  return (
    <div>
      <h2>Student Profile (ID: {studentId})</h2>
      <p>Academic records, resume, internships, etc.</p>
      <label>Internal Remarks: <textarea rows={2} /></label>
      <button>Save Remark</button>
    </div>
  );
};
export default StudentProfile;
