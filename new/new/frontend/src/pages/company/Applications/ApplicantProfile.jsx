import React from "react";
import { useParams, Link } from "react-router-dom";
const ApplicantProfile = () => {
  const { applicantId } = useParams();
  return (
    <div>
      <h2>Applicant Profile (ID: {applicantId})</h2>
      <p>Detailed profile info here.</p>
      <Link to={`/company/applications/${applicantId}/notes`}>Add Private Notes</Link>
    </div>
  );
};
export default ApplicantProfile;
