import React from "react";
import { Link } from "react-router-dom";
const students = [
  { id: 1, name: "Alice", status: "Applied" },
  { id: 2, name: "Bob", status: "Interning" }
];
const StudentSupervision = () => (
  <div>
    <h2>Student Supervision</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Profile</th>
        </tr>
      </thead>
      <tbody>
        {students.map(s => (
          <tr key={s.id}>
            <td>{s.name}</td>
            <td>{s.status}</td>
            <td>
              <Link to={`/faculty/supervision/${s.id}`}>View</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export default StudentSupervision;
