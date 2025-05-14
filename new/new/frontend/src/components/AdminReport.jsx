import React, { useEffect, useState } from "react";

function AdminReport() {
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch('/api/admin/students').then(res => res.json()).then(setStudents);
    fetch('/api/admin/companies').then(res => res.json()).then(setCompanies);
    fetch('/api/admin/applications-report').then(res => res.json()).then(setApplications);
  }, []);

  return (
    <div>
      <h2>Admin Reports</h2>
      <h3>Students: {students.length}</h3>
      <ul>
        {students.map(s => <li key={s._id}>{s.username} ({s.email})</li>)}
      </ul>
      <h3>Companies: {companies.length}</h3>
      <ul>
        {companies.map(c => <li key={c._id}>{c.username} ({c.email})</li>)}
      </ul>
      <h3>Applications:</h3>
      <ul>
        {applications.map(app => (
          <li key={app._id}>
            <b>{app.title}</b> at {app.company.username} - 
            {app.applications.length} applicants
            <ul>
              {app.applications.map(stu => (
                <li key={stu._id}>{stu.username} ({stu.email})</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminReport;
