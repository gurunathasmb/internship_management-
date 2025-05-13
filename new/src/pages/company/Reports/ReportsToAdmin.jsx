import React, { useState } from "react";

// Dummy selected students data
const selectedStudents = [
  { id: 1, name: "Alice", internship: "Frontend Developer" },
  { id: 2, name: "Bob", internship: "Data Analyst" },
];

const ReportsToAdmin = () => {
  const [reports, setReports] = useState(
    selectedStudents.map(s => ({
      studentId: s.id,
      performance: "",
      remarks: ""
    }))
  );
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (idx, field, value) => {
    setReports(prev =>
      prev.map((r, i) => (i === idx ? { ...r, [field]: value } : r))
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Here you would send the reports to your backend API
    setSubmitted(true);
  };

  return (
    <div>
      <h2>Report Selected Students to Admin</h2>
      <form onSubmit={handleSubmit}>
        {selectedStudents.map((student, idx) => (
          <div key={student.id} className="internship-card">
            <h4>{student.name} ({student.internship})</h4>
            <label>
              Performance:
              <select
                value={reports[idx].performance}
                onChange={e => handleChange(idx, "performance", e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Average">Average</option>
                <option value="Needs Improvement">Needs Improvement</option>
              </select>
            </label>
            <label>
              Remarks:
              <textarea
                value={reports[idx].remarks}
                onChange={e => handleChange(idx, "remarks", e.target.value)}
                rows={2}
                required
              />
            </label>
          </div>
        ))}
        <button type="submit">Submit Report to Admin</button>
      </form>
      {submitted && (
        <div style={{ color: "green", marginTop: 16 }}>
          Report submitted to admin!
        </div>
      )}
    </div>
  );
};

export default ReportsToAdmin;
