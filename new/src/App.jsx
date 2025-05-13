import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/AuthForm";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import CompanyDashboard from "./pages/company/CompanyDashboard";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import "./styles/login.css";
import "./styles/dashboard.css";

// Context to provide login info (simple example)
export const AuthContext = React.createContext();

function App() {
  const [role, setRole] = useState(null);

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/student/*" element={<StudentDashboard />} />
          <Route path="/company/*" element={<CompanyDashboard />} />
          <Route path="/faculty/*" element={<FacultyDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
