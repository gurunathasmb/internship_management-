import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import RoleDropdown from "./RoleDropdown";
import { AuthContext } from "../App";

const roleRouteMap = {
  admin: "/admin",
  student: "/student",
  company: "/company",
  faculty: "/faculty",
};

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { setRole: setGlobalRole } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister && password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    const url = `http://localhost:5000/api/auth/${isRegister ? "register" : "login"}`;
    const payload = isRegister
      ? { username, password, role, email }
      : { username, password, role };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      if (!isRegister) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        setGlobalRole(data.role);
        navigate(roleRouteMap[data.role]);
      } else {
        alert("Registration successful!");
        setIsRegister(false);
        setUsername("");
        setPassword("");
        setConfirm("");
        setEmail("");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="login-bg">
      <form className="login-panel" onSubmit={handleSubmit}>
        <div className="login-fields">
          <h2>{isRegister ? "Register" : "Login"}</h2>

          <label className="login-label">Role:</label>
          <RoleDropdown role={role} setRole={setRole} />

          <label className="login-label">Username:</label>
          <input
            type="text"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {isRegister && (
            <>
              <label className="login-label">Email:</label>
              <input
                type="email"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </>
          )}

          <label className="login-label">Password:</label>
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {isRegister && (
            <>
              <label className="login-label">Confirm Password:</label>
              <input
                type="password"
                className="login-input"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </>
          )}
        </div>

        <div className="login-footer">
          <button type="submit" className="login-btn">
            {isRegister ? "Register" : "Login"}
          </button>
          <p style={{ marginTop: "10px" }}>
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              style={{ color: "blue", background: "none", border: "none", cursor: "pointer" }}
            >
              {isRegister ? "Login here" : "Register here"}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
