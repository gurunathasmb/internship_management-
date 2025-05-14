import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import RoleDropdown from "./RoleDropdown"; // reuse from login
import "../styles/Register.css"; // reuse the same CSS

const RegisterForm = () => {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace this with your API call to backend
    const userData = { role, name, email, username, password };
    console.log("Registering user:", userData);

    // Optional: You can POST to /api/register and handle response
    
  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Registered successfully! Please login.");
      navigate("/login");
    } else {
      alert(data.message || "Registration failed.");
    }
  } catch (error) {
    alert("Server error. Please try again later.");
    console.error("Registration error:", error);
  }
};
    // Navigate to login or role dashboard
  

  return (
    <div className="login-bg">
      <form className="login-panel" onSubmit={handleSubmit}>
        <div className="login-fields">
          <h2 style={{ textAlign: "center" }}>Register</h2>

          <label className="login-label" htmlFor="role">Role:</label>
          <RoleDropdown role={role} setRole={setRole} />

          <label className="login-label" htmlFor="name">Full Name:</label>
          <input
            id="name"
            type="text"
            className="login-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="login-label" htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="login-label" htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label className="login-label" htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="login-footer">
          <button type="submit" className="login-btn">Register</button>
        </div>

        <p style={{ textAlign: "center", marginTop: "16px" }}>
          Already registered?{" "}
          <Link to="/login" style={{ color: "#2563eb", textDecoration: "underline" }}>
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
