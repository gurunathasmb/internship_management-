import React from "react";
const ProfileForm = () => (
  <form>
    <h3>Edit Profile</h3>
    <label>Name: <input type="text" /></label><br />
    <label>Email: <input type="email" /></label><br />
    <label>Contact: <input type="text" /></label><br />
    <label>Academic Details: <textarea /></label><br />
    <button type="submit">Update Profile</button>
  </form>
);
export default ProfileForm;
