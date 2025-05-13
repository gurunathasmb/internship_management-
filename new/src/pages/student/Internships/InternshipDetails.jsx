import React from "react";
import { useParams, Link } from "react-router-dom";
const InternshipDetails = () => {
  const { internshipId } = useParams();
  // Fetch internship details by ID here
  return (
    <div>
      <h3>Internship Details (ID: {internshipId})</h3>
      <p>Description, requirements, etc.</p>
      <Link to="apply">Apply Now</Link>
    </div>
  );
};
export default InternshipDetails;
