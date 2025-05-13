import React from "react";
const ApplicationStats = () => (
  <div>
    <h2>Application Stats</h2>
    <p>Filter by internship, status, date, etc. (coming soon)</p>
    <table>
      <thead>
        <tr>
          <th>Internship</th>
          <th>Applications</th>
          <th>Selected</th>
          <th>Conversion Rate</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Frontend Developer</td>
          <td>32</td>
          <td>4</td>
          <td>12.5%</td>
        </tr>
      </tbody>
    </table>
  </div>
);
export default ApplicationStats;
