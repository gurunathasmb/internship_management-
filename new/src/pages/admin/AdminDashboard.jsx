import React from "react";
import { Routes, Route, Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import AdminReports from "./Reports/AdminReports";
import UserManagement from "./Users/UserManagement";
import InternshipOversight from "./Internships/InternshipOversight";
import AdminAnalytics from "./Analytics/AdminAnalytics";
import AuditTools from "./Audit/AuditTools";
import AdminAnnouncements from "./Communication/AdminAnnouncements";
import PlatformSettings from "./Settings/PlatformSettings";
import DocumentManagement from "./Documents/DocumentManagement";
import ScheduleOversight from "./Schedule/ScheduleOversight";
import FacultyCoordination from "./Faculty/FacultyCoordination";
import StudentOversight from "./Students/StudentOversight";
import SecurityBackup from "./Security/SecurityBackup";
import FacultyIssues from "./Reports/FacultyIssues";


const navLinks = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/reports", label: "Reports" },
  { to: "/admin/users", label: "User Management" },
  { to: "/admin/internships", label: "Internship Oversight" },
  { to: "/admin/analytics", label: "Analytics" },
  { to: "/admin/audit", label: "Audit & Verification" },
  { to: "/admin/communication", label: "Communication" },
  { to: "/admin/settings", label: "Platform Settings" },
  { to: "/admin/documents", label: "Document Management" },
  { to: "/admin/schedule", label: "Schedule Oversight" },
  { to: "/admin/faculty", label: "Faculty Coordination" },
  { to: "/admin/students", label: "Student Oversight" },
  { to: "/admin/security", label: "Security & Backup" },
  { to: "/admin/faculty-issues", label: "Faculty Issues" }
];

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="student-dashboard">
      <aside className="student-sidebar">
        <h1>Admin Portal</h1>
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
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/dashboard" element={<AdminAnalytics />} />
          <Route path="/reports" element={<AdminReports />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/internships" element={<InternshipOversight />} />
          <Route path="/analytics" element={<AdminAnalytics />} />
          <Route path="/audit" element={<AuditTools />} />
          <Route path="/communication" element={<AdminAnnouncements />} />
          <Route path="/settings" element={<PlatformSettings />} />
          <Route path="/documents" element={<DocumentManagement />} />
          <Route path="/schedule" element={<ScheduleOversight />} />
          <Route path="/faculty" element={<FacultyCoordination />} />
          <Route path="/students" element={<StudentOversight />} />
          <Route path="/security" element={<SecurityBackup />} />
          <Route path="/faculty-issues" element={<FacultyIssues />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;

