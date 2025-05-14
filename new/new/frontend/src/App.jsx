import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentDashboard from "./pages/student/StudentDashboard";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import CompanyDashboard from "./pages/company/CompanyDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

export const AuthContext = createContext();

function App() {
  const [role, setRole] = useState(null);

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
           <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/student/*"
            element={role === "student" ? <StudentDashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/faculty/*"
            element={role === "faculty" ? <FacultyDashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/company/*"
            element={role === "company" ? <CompanyDashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/admin/*"
            element={role === "admin" ? <AdminDashboard /> : <Navigate to="/" />}
          />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
