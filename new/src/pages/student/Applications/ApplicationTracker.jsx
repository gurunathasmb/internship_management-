import React from "react";
const applications = [
  { id: 1, title: "Web Dev Intern", status: "Shortlisted", feedback: "Interview on Monday" },
  { id: 2, title: "Data Analyst Intern", status: "Applied", feedback: "" },
];
const ApplicationTracker = () => (
  <div>
    <h2>My Applications</h2>
    <table>
      <thead>
        <tr>
          <th>Internship</th>
          <th>Status</th>
          <th>Feedback</th>
        </tr>
      </thead>
      <tbody>
        {applications.map(app => (
          <tr key={app.id}>
            <td>{app.title}</td>
            <td>{app.status}</td>
            <td>{app.feedback}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export default ApplicationTracker;
