import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import InternshipDetails from "./InternshipDetails";
import InternshipApply from "./InternshipApply";

const internships = [
  { id: 1, title: "Web Dev Intern", company: "ABC Corp", domain: "Web", location: "Remote", duration: "3 months" },
  { id: 2, title: "Data Analyst Intern", company: "XYZ Ltd", domain: "Data", location: "Bangalore", duration: "2 months" },
];

const InternshipList = () => (
  <div>
    <h2>Available Internships</h2>
    <div>
      {internships.map((i) => (
       <div className="internship-card" key={i.id}>
       <h4>{i.title} at {i.company}</h4>
       <p>Domain: {i.domain} | Location: {i.location} | Duration: {i.duration}</p>
       <Link to={`${i.id}`}>View Details</Link>
        </div>
      ))}
    </div>
    <Routes>
      <Route path=":internshipId" element={<InternshipDetails />} />
      <Route path=":internshipId/apply" element={<InternshipApply />} />
    </Routes>
  </div>
);

export default InternshipList;
