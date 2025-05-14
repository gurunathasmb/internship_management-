import React from "react";
import { Routes, Route, Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import FacultyProfile from "./Profile/FacultyProfile";
import UploadInternship from "./Internships/UploadInternship";
import InternshipOversight from "./Internships/InternshipOversight";
import InternshipProgress from "./Internships/InternshipProgress";
import EvaluationPanel from "./Internships/EvaluationPanel";
import StudentSupervision from "./Students/StudentSupervision";
import StudentProfile from "./Students/StudentProfile";
import FacultyChatHub from "./Communication/FacultyChatHub";
import FacultyAnalytics from "./Analytics/FacultyAnalytics";
import FacultyCalendar from "./Calendar/FacultyCalendar";
import AdminLiaison from "./Liaison/AdminLiaison";

const navLinks = [
  { to: "/faculty/dashboard", label: "Dashboard" },
  { to: "/faculty/profile", label: "Profile & Role" },
  { to: "/faculty/upload-internship", label: "Upload Internship" },
  { to: "/faculty/supervision", label: "Student Supervision" },
  { to: "/faculty/oversight", label: "Internship Oversight" },
  { to: "/faculty/progress", label: "Progress Monitoring" },
  { to: "/faculty/evaluation", label: "Evaluation & Feedback" },
  { to: "/faculty/communication", label: "Communication" },
  { to: "/faculty/calendar", label: "Calendar" },
  { to: "/faculty/liaison", label: "Admin/Company Liaison" }
];

const FacultyDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="student-dashboard">
      <aside className="student-sidebar">
        <h1>Faculty Portal</h1>
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
          onClick={handleLogout}
          className="logout-btn"
          type="button"
          aria-label="Logout"
        >
          Logout
        </button>
      </aside>
      <main className="student-main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/faculty/dashboard" replace />} />
          <Route path="/dashboard" element={<FacultyAnalytics />} />
          <Route path="/profile" element={<FacultyProfile />} />
          <Route path="/upload-internship" element={<UploadInternship />} />
          <Route path="/supervision" element={<StudentSupervision />} />
          <Route path="/supervision/:studentId" element={<StudentProfile />} />
          <Route path="/oversight" element={<InternshipOversight />} />
          <Route path="/progress" element={<InternshipProgress />} />
          <Route path="/evaluation" element={<EvaluationPanel />} />
          <Route path="/communication" element={<FacultyChatHub />} />
          <Route path="/calendar" element={<FacultyCalendar />} />
          <Route path="/liaison" element={<AdminLiaison />} />
        </Routes>
      </main>
    </div>
  );
};

export default FacultyDashboard;
