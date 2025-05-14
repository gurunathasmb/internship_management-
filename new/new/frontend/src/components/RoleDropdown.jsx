import React from "react";

const RoleDropdown = ({ role, setRole }) => (
  <select
    value={role}
    onChange={(e) => setRole(e.target.value)}
    className="role-dropdown"
  >
    {["student", "company", "faculty", "admin"].map((opt) => (
      <option key={opt} value={opt}>
        {opt.charAt(0).toUpperCase() + opt.slice(1)}
      </option>
    ))}
  </select>
);

export default RoleDropdown;
