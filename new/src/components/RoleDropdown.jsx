import React from "react";

const RoleDropdown = ({ role, setRole }) => {
  return (
    <select className="login-input" value={role} onChange={(e) => setRole(e.target.value)}>
      <option value="student">Student</option>
      <option value="faculty">Faculty</option>
      <option value="admin">Admin</option>
      <option value="company">Company</option>
    </select>
  );
};

export default RoleDropdown;
