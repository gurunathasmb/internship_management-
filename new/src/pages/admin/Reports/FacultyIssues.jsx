import React, { useState, useEffect } from "react";

const FacultyIssues = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    // Simulate fetching from backend/localStorage
    const stored = JSON.parse(localStorage.getItem("facultyIssues") || "[]");
    setIssues(stored.reverse()); // Show latest first
  }, []);

  return (
    <div>
      <h2>Faculty-Reported Issues</h2>
      {issues.length === 0 ? (
        <p>No issues reported by faculty.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Faculty</th>
              <th>Date</th>
              <th>Issue</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue, idx) => (
              <tr key={idx}>
                <td>{issue.faculty}</td>
                <td>{issue.date}</td>
                <td>{issue.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FacultyIssues;
