import React from "react";
const FacultyProfile = () => (
  <div>
    <h2>Faculty Profile & Role Management</h2>
    <form>
      <label>Name: <input type="text" /></label>
      <label>Email: <input type="email" /></label>
      <label>Department: <input type="text" /></label>
      <label>Assigned Branches: <input type="text" /></label>
      <label>Availability: <input type="text" placeholder="e.g. Mon-Fri, 10am-4pm" /></label>
      <button type="submit">Update Profile</button>
    </form>
  </div>
);
export default FacultyProfile;
