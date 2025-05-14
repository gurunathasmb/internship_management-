import React, { useState, useEffect } from "react";
import axios from "axios";// Used to decode the JWT token and extract faculty ID
import * as jwtDecode from "jwt-decode";

const UploadInternship = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    facultyId: "", // This will store the faculty ID
  });

  const [message, setMessage] = useState("");

  // This effect will set the logged-in faculty's ID from the JWT token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode the JWT token
        setFormData((prevData) => ({
          ...prevData,
          facultyId: decodedToken.id, // Set the faculty ID from the token
        }));
      } catch (err) {
        console.error("Error decoding the token:", err);
      }
    } else {
      setMessage("Please log in first.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Get the token for authentication

    try {
      // Make the API request to upload the internship
      const response = await axios.post(
        "http://localhost:5000/api/faculty/internships", // Your API endpoint for creating internships
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }, // Include JWT token for authorization
        }
      );
      setMessage("Internship posted successfully!");
      setFormData({ title: "", description: "", requirements: "", facultyId: "" }); // Clear form after successful submission
    } catch (error) {
      console.error("Error uploading internship:", error.response?.data || error.message);
      setMessage("Failed to post internship. Please try again.");
    }
  };

  return (
    <div>
      <h2>Upload Internship</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Requirements:
            <input
              type="text"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <button type="submit">Post Internship</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadInternship;
