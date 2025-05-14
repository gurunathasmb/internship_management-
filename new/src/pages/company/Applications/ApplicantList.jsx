import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ApplicantList = () => {
  // State to store applicants, loading state, and error state
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch applicants from the backend on component mount
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        // Replace with your backend API endpoint
        const response = await axios.get('http://localhost:5000/api/company/applicants');
        setApplicants(response.data); // Assuming response is an array of applicants
      } catch (err) {
        setError("Error fetching applicants.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  // Show loading or error message if applicable
  if (loading) {
    return <p>Loading applicants...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
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
};

export default ApplicantList;
