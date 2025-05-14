import React from "react";
import { Link } from "react-router-dom";
const applicants = [
  { id: 1, name: "Alice", internship: "Frontend Developer", status: "Applied" },
  { id: 2, name: "Bob", internship: "Data Analyst", status: "Shortlisted" }
];
const ApplicantList = () => (
  <div>
    <h2>Applicants</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Internship</th>
          <th>Status</th>
          <th>Profile</th>
        </tr>
      </thead>
      <tbody>
        {applicants.map(app => (
          <tr key={app.id}>
            <td>{app.name}</td>
            <td>{app.internship}</td>
            <td>{app.status}</td>
            <td>
              <Link to={`/company/applications/${app.id}`}>View</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export default ApplicantList;
