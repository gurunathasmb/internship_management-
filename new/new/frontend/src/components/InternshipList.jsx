import React, { useEffect, useState } from "react";

function InternshipList({ showApply = false, reload = false }) {
  const [internships, setInternships] = useState([]);

  const fetchInternships = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/internships');
      const data = await res.json();
      setInternships(data);
    } catch (err) {
      console.error('Error fetching internships:', err);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, [reload]);

  const applyToInternship = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/internships/${id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();

      if (res.ok) {
        alert(data.message || 'Application successful!');
        fetchInternships(); // Refresh the list
      } else {
        alert(data.message || 'Failed to apply.');
      }
    } catch (err) {
      console.error('Error applying:', err);
      alert('Server error. Try again later.');
    }
  };

  return (
    <div>
      <h2>Available Internships & Jobs</h2>
      {internships.length === 0 ? (
        <p>No internships posted yet.</p>
      ) : (
        <ul>
          {internships.map((item) => (
            <li key={item._id} style={{ marginBottom: "20px" }}>
              <strong>{item.title}</strong> ({item.type})<br />
              <b>Description:</b> {item.description}<br />
              <em>Company: {item.company?.username || "N/A"}</em><br />
              <b>Applicants:</b> {item.applications?.length || 0}
              {showApply && (
                <div>
                  <button onClick={() => applyToInternship(item._id)}>
                    Apply
                  </button>
                </div>
              )}
              {item.applications?.length > 0 && (
                <ul>
                  {item.applications.map(stu => (
                    <li key={stu._id}>{stu.username} ({stu.email})</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InternshipList;
