import React from "react";
const dummyInternships = [
  { id: 1, title: "Web Dev Intern", company: "ABC Corp", status: "Pending" },
  { id: 2, title: "Data Analyst", company: "XYZ Ltd", status: "Active" }
];
const InternshipOversight = () => (
  <div>
    <h2>Internship Oversight</h2>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Company</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {dummyInternships.map(i => (
          <tr key={i.id}>
            <td>{i.title}</td>
            <td>{i.company}</td>
            <td>{i.status}</td>
            <td>
              <button>Approve</button>
              <button>Reject</button>
              <button>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export default InternshipOversight;
