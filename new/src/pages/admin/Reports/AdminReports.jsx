import React from "react";
const dummyReports = [
  { id: 1, company: "ABC Corp", student: "Alice", type: "Final Report", status: "Received" },
  { id: 2, company: "XYZ Ltd", student: "Bob", type: "Progress Report", status: "Received" }
];
const AdminReports = () => (
  <div>
    <h2>All Reports</h2>
    <table>
      <thead>
        <tr>
          <th>Company</th>
          <th>Student</th>
          <th>Type</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {dummyReports.map(r => (
          <tr key={r.id}>
            <td>{r.company}</td>
            <td>{r.student}</td>
            <td>{r.type}</td>
            <td>{r.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export default AdminReports;
