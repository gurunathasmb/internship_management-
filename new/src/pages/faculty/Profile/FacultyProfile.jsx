import React, { useState, useEffect } from "react";
import axios from "axios";
import * as jwtDecode from "jwt-decode";
const FacultyProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    contact: "",
    department: "",
    officeLocation: "",
    skills: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch faculty profile on component mount
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Please log in first.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/faculty/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err.response?.data || err.message);
        setMessage("Error fetching profile, please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        "http://localhost:5000/api/faculty/profile",
        profile,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(res.data.message || "Profile updated successfully!");
    } catch (err) {
      console.error("Error submitting profile:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Failed to update profile.");
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h2>Faculty Profile & Role Management</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "0.75rem" }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <label>Email (Read-Only):</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            readOnly
            style={{ width: "100%", padding: "0.5rem", backgroundColor: "#f0f0f0" }}
          />
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <label>Contact:</label>
          <input
            type="text"
            name="contact"
            value={profile.contact}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={profile.department}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <label>Office Location:</label>
          <input
            type="text"
            name="officeLocation"
            value={profile.officeLocation}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <label>Skills:</label>
          <input
            type="text"
            name="skills"
            value={profile.skills}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Update Profile
        </button>
      </form>

      {message && <p style={{ color: "green", marginTop: "1rem" }}>{message}</p>}
    </div>
  );
};

export default FacultyProfile;
