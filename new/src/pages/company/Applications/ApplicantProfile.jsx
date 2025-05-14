import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ApplicantProfile = () => {
  const { applicantId } = useParams(); // Extract applicant ID from URL
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the applicant's detailed information
  useEffect(() => {
    const fetchApplicantProfile = async () => {
      try {
        // Make API request to get applicant details (replace with your backend URL)
        const response = await axios.get(`http://localhost:5000/api/company/applications/${applicantId}`);
        setApplicant(response.data); // Assuming response contains the applicant data
      } catch (err) {
        setError("Error fetching applicant profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicantProfile();
  }, [applicantId]); // Re-fetch when applicantId changes

  // Show loading or error message
  if (loading) {
    return <p>Loading applicant profile...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Display the applicant's profile data
  return (
    <div>
      <h2>Applicant Profile (ID: {applicantId})</h2>
      <div>
        <p><strong>Name:</strong> {applicant.name}</p>
        <p><strong>Internship:</strong> {applicant.internship}</p>
        <p><strong>Status:</strong> {applicant.status}</p>
        <p><strong>Email:</strong> {applicant.email}</p>
        <p><strong>Phone:</strong> {applicant.phone}</p>
        <p><strong>Resume:</strong> <a href={applicant.resumeUrl} target="_blank" rel="noopener noreferrer">Download Resume</a></p>
        <p><strong>Portfolio:</strong> <a href={applicant.portfolioUrl} target="_blank" rel="noopener noreferrer">View Portfolio</a></p>
      </div>
      <Link to={`/company/applications/${applicantId}/notes`}>Add Private Notes</Link>
    </div>
  );
};

export default ApplicantProfile;
