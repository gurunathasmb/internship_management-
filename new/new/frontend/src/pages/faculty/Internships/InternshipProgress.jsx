import React from "react";
const progressReports = [
  { id: 1, student: "Alice", report: "Week 1 log...", status: "Submitted" },
  { id: 2, student: "Bob", report: "Week 2 log...", status: "Revision Requested" }
];
const InternshipProgress = () => (
  <div>
    <h2>Internship Progress Monitoring</h2>
    <table>
      <thead>
        <tr>
          <th>Student</th>
          <th>Report</th>
          <th>Status</th>
          <th>Faculty Comment</th>
        </tr>
      </thead>
      <tbody>
        {progressReports.map(r => (
          <tr key={r.id}>
            <td>{r.student}</td>
            <td>{r.report}</td>
            <td>{r.status}</td>
            <td>
              <textarea rows={1} placeholder="Comment" />
              <button>Approve</button>
              <button>Request Revision</button>
              <button>Escalate</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export default InternshipProgress;
