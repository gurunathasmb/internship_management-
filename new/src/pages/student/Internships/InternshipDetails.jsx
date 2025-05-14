import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const InternshipDetails = () => {
  const { internshipId } = useParams();
  const [internship, setInternship] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/student/internships`);
        const found = res.data.find((i) => i._id === internshipId);
        setInternship(found);
      } catch (err) {
        console.error("Failed to fetch details", err);
      }
    };
    fetchDetails();
  }, [internshipId]);

  if (!internship) return <p>Loading...</p>;

  return (
    <div>
      <h3>{internship.title}</h3>
      <p><strong>Company:</strong> {internship.company}</p>
      <p><strong>Domain:</strong> {internship.domain}</p>
      <p><strong>Location:</strong> {internship.location}</p>
      <p><strong>Duration:</strong> {internship.duration}</p>
      <p><strong>Description:</strong> {internship.description}</p>
      <Link to="apply">Apply Now</Link>
    </div>
  );
};

export default InternshipDetails;
