import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/student/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err.response?.data || err.message);
        setMessage("No profile found. Click below to create one.");
      }
    };

    fetchProfile();
  }, [token]);

  const handleEditClick = () => {
    setFormData(profile); // populate form with existing data
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/student/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Profile saved successfully!");
      setProfile(formData);
      setShowForm(false);
    } catch (err) {
      console.error("Error submitting profile:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Failed to save profile.");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <h2>Student Dashboard</h2>

      {profile ? (
        <>
          <div style={{ marginBottom: "1rem", backgroundColor: "#f8f8f8", padding: "1rem", borderRadius: "8px" }}>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Contact:</strong> {profile.contact}</p>
            <p><strong>Academic Details:</strong> {profile.academicDetails}</p>
            <p><strong>Address:</strong> {profile.address}</p>
            <p><strong>Date of Birth:</strong> {profile.dateOfBirth}</p>
            <p><strong>Gender:</strong> {profile.gender}</p>
            <p><strong>Course:</strong> {profile.course}</p>
            <p><strong>Year:</strong> {profile.yearOfStudy}</p>
            <p><strong>University:</strong> {profile.universityName}</p>
            <p><strong>Skills:</strong> {profile.skills}</p>
            <p><strong>Experience:</strong> {profile.experience}</p>
            <button onClick={handleEditClick} style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
              Edit Profile
            </button>
          </div>
        </>
      ) : (
        <button onClick={() => setShowForm(true)}>Create Profile</button>
      )}

      {showForm && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "#fff",
            padding: "2rem",
            borderRadius: "10px",
            width: "90%",
            maxWidth: "600px",
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
          }}>
            <h3>{profile ? "Edit" : "Create"} Profile</h3>
            <form onSubmit={handleSubmit}>
              {[
                { label: "Name", name: "name" },
                { label: "Email", name: "email", type: "email" },
                { label: "Contact", name: "contact" },
                { label: "Academic Details", name: "academicDetails" },
                { label: "Address", name: "address" },
                { label: "Date of Birth", name: "dateOfBirth", type: "date" },
                { label: "Course", name: "course" },
                { label: "Year of Study", name: "yearOfStudy" },
                { label: "University Name", name: "universityName" },
                { label: "Skills", name: "skills" },
                { label: "Experience", name: "experience" },
              ].map(({ label, name, type = "text" }) => (
                <div key={name} style={{ marginBottom: "0.75rem" }}>
                  <label>{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={formData?.[name] || ""}
                    onChange={handleChange}
                    required={["name", "email", "contact"].includes(name)}
                    style={{ width: "100%", padding: "0.5rem" }}
                  />
                </div>
              ))}

              <div style={{ marginBottom: "0.75rem" }}>
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData?.gender || ""}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "0.5rem" }}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <button type="submit" style={{ padding: "0.5rem 1rem", marginRight: "1rem" }}>
                Save
              </button>
              <button type="button" onClick={() => setShowForm(false)} style={{ padding: "0.5rem 1rem" }}>
                Cancel
              </button>
            </form>
            {message && <p style={{ color: "green", marginTop: "1rem" }}>{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
