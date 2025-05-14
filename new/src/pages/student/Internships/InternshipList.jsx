import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InternshipDetails from "./InternshipDetails";
import InternshipApply from "./InternshipApply";

const InternshipList = () => {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/student/internships", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setInternships(res.data);
      } catch (err) {
        console.error("Error fetching internships", err);
      }
    };

    fetchInternships();
  }, []);

  return (
    <div>
      <h2>Available Internships</h2>
      <div>
        {internships.map((i) => (
          <div className="internship-card" key={i._id}>
            <h4>{i.title} at {i.company}</h4>
            <p>Domain: {i.domain} | Location: {i.location} | Duration: {i.duration}</p>
            <Link to={`${i._id}`}>View Details</Link>
          </div>
        ))}
      </div>

      <Routes>
        <Route path=":internshipId" element={<InternshipDetails />} />
        <Route path=":internshipId/apply" element={<InternshipApply />} />
      </Routes>
    </div>
  );
};

export default InternshipList;
