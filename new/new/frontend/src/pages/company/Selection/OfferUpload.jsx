import React from "react";
import { useParams } from "react-router-dom";
const OfferUpload = () => {
  const { applicantId } = useParams();
  return (
    <div>
      <h2>Upload Offer Letter (Applicant #{applicantId})</h2>
      <input type="file" />
      <button style={{marginTop:8}}>Upload</button>
    </div>
  );
};
export default OfferUpload;
