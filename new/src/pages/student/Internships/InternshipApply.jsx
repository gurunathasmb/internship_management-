import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const InternshipApply = () => {
  const { internshipId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleApply = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/student/apply/${internshipId}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setMessage(res.data.message);
      setTimeout(() => navigate("/student/internships"), 2000);
    } catch (err) {
      console.error("Application failed", err);
      setMessage("Failed to apply. Try again.");
    }
  };

  return (
    <div>
      <h3>Apply for Internship</h3>
      {message ? <p>{message}</p> : <button onClick={handleApply}>Confirm Apply</button>}
    </div>
  );
};

export default InternshipApply;
