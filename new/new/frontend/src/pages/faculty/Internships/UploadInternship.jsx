import React from "react";
const UploadInternship = () => (
  <div>
    <h2>Upload Internship</h2>
    <form>
      <label>Title: <input type="text" /></label>
      <label>Description: <textarea /></label>
      <label>Requirements: <input type="text" /></label>
      <button type="submit">Post Internship</button>
    </form>
  </div>
);
export default UploadInternship;
