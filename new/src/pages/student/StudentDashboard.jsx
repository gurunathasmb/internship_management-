import React from "react";
import { Routes, Route, Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import ProfilePage from "./Profile/ProfilePage";
import InternshipList from "./Internships/InternshipList";
import ApplicationTracker from "./Applications/ApplicationTracker";
import ChatHub from "./Communication/ChatHub";
import CertificateList from "./Certificates/CertificateList";
import ExperienceLetterRequest from "./Certificates/ExperienceLetterRequest";
import "../../styles/dashboard.css";

const navLinks = [
  { to: "/student/profile", label: "Profile" },
  { to: "/student/internships", label: "Internships" },
  { to: "/student/applications", label: "Applications" },
  { to: "/student/communication", label: "Communication" },
  { to: "/student/certificates", label: "Certificates" },
  { to: "/student/experience-letter", label: "Experience Letter" }
];

const StudentDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  setGlobalRole(null);
  navigate("/"); // or to login page
};

  return (
    <div className="student-dashboard">
      <aside className="student-sidebar">
        <h1>Student Portal</h1>
        <nav className="student-nav">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={location.pathname === link.to ? "active" : ""}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={logout}
          className="logout-btn"
          type="button"
          aria-label="Logout"
        >
          Logout
        </button>
      </aside>
      <main className="student-main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/student/profile" replace />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/internships/*" element={<InternshipList />} />
          <Route path="/applications" element={<ApplicationTracker />} />
          <Route path="/communication" element={<ChatHub />} />
          <Route path="/certificates" element={<CertificateList />} />
          <Route path="/experience-letter" element={<ExperienceLetterRequest />} />
        </Routes>
      </main>
    </div>
  );
};

export default StudentDashboard;
