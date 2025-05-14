import React from "react";
import { Routes, Route, Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import InternshipPosts from "./Internships/InternshipPosts";
import ApplicationStats from "./Internships/ApplicationStats";
import InterviewSchedule from "./Internships/InterviewSchedule";
import InternshipPostEditor from "./Internships/InternshipPostEditor";
import ApplicantList from "./Applications/ApplicantList";
import ApplicantProfile from "./Applications/ApplicantProfile";
import PrivateNotes from "./Applications/PrivateNotes";
import SelectionPanel from "./Selection/SelectionPanel";
import EvaluationPanel from "./Selection/EvaluationPanel";
import OfferUpload from "./Selection/OfferUpload";
import CompanyChatHub from "./Communication/CompanyChatHub";
import CompanyAnnouncements from "./Communication/CompanyAnnouncements";
import InterviewInvites from "./Communication/InterviewInvites";
import CompanyAnalytics from "./Analytics/CompanyAnalytics";
import ReportsToAdmin from "./Reports/ReportsToAdmin";


const navLinks = [
  { to: "/company/internships", label: "Internship Posts" },
  { to: "/company/applications", label: "Applicants" },
  { to: "/company/selection", label: "Selection & Evaluation" },
  { to: "/company/communication", label: "Communication" },
  { to: "/company/analytics", label: "Analytics" },
  { to: "/company/reports", label: "Reports to Admin" }
];

const CompanyDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="student-dashboard">
      <aside className="student-sidebar">
        <h1>Company Portal</h1>
        <nav className="student-nav">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={location.pathname.startsWith(link.to) ? "active" : ""}
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
          <Route path="/" element={<Navigate to="/company/internships" replace />} />
          <Route path="/internships" element={<InternshipPosts />} />
          <Route path="/internships/stats" element={<ApplicationStats />} />
          <Route path="/internships/schedule" element={<InterviewSchedule />} />
          <Route path="/internships/edit/:id" element={<InternshipPostEditor />} />
          <Route path="/applications" element={<ApplicantList />} />
          <Route path="/applications/:applicantId" element={<ApplicantProfile />} />
          <Route path="/applications/:applicantId/notes" element={<PrivateNotes />} />
          <Route path="/selection" element={<SelectionPanel />} />
          <Route path="/selection/evaluation/:applicantId" element={<EvaluationPanel />} />
          <Route path="/selection/offer/:applicantId" element={<OfferUpload />} />
          <Route path="/communication" element={<CompanyChatHub />} />
          <Route path="/communication/announcements" element={<CompanyAnnouncements />} />
          <Route path="/communication/interview-invites" element={<InterviewInvites />} />
          <Route path="/analytics" element={<CompanyAnalytics />} />
          <Route path="/reports" element={<ReportsToAdmin />} />
        </Routes>
      </main>
    </div>
  );
};

export default CompanyDashboard;
