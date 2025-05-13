import React from "react";
const internships = [
  { id: 1, title: "Web Dev Intern", student: "Alice", status: "Applied" },
  { id: 2, title: "Data Analyst", student: "Bob", status: "Recommended" }
];
const InternshipOversight = () => (
  <div>
    <h2>Internship Application Oversight</h2>
    <table>
      <thead>
        <tr>
          <th>Internship</th>
          <th>Student</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {internships.map(i => (
          <tr key={i.id}>
            <td>{i.title}</td>
            <td>{i.student}</td>
            <td>{i.status}</td>
            <td>
              <button>Approve</button>
              <button>Recommend</button>
              <button>Suggest</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export default InternshipOversight;
