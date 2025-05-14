import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import RoleDropdown from "./RoleDropdown";
import { AuthContext } from "../App";
import "../styles/login.css";

const roleRouteMap = {
  admin: "/admin",
  student: "/student",
  company: "/company",
  faculty: "/faculty",
};

const LoginForm = () => {
  const [role, setRole] = useState("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { setRole: setGlobalRole } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: username, // assuming email is used as username
      password,
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login
        const userRole = data.user.role;

        setGlobalRole(userRole); // update context if needed
        // Always store token temporarily in sessionStorage
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userRole", userRole);

// Store in localStorage if "Keep me logged in" is checked


        if (keepLoggedIn) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userRole", userRole);
        }

        navigate(roleRouteMap[userRole]);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error during login");
    }
  };

  return (
    <div className="login-bg">
      <form className="login-panel" onSubmit={handleSubmit}>
        <div className="login-fields">
          <label className="login-label" htmlFor="role">
            Role:
          </label>
          <RoleDropdown role={role} setRole={setRole} />

          <label className="login-label" htmlFor="username">
            Email:
          </label>
          <input
            id="username"
            type="email"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />

          <div className="login-row">
            <label className="login-label" htmlFor="password">
              Password:
            </label>
            <a href="#" className="forgot-link">
              Forgot your password?
            </a>
          </div>
          <input
            id="password"
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        <div className="login-footer">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={keepLoggedIn}
              onChange={() => setKeepLoggedIn(!keepLoggedIn)}
            />
            Keep me logged in
          </label>
          <button type="submit" className="login-btn">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
