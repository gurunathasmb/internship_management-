import React from "react";
const InternshipPostEditor = () => (
  <div>
    <h2>Create/Edit Internship Post</h2>
    <form>
      <label>Title: <input type="text" /></label>
      <label>Description: <textarea /></label>
      <label>Status: 
        <select>
          <option>Draft</option>
          <option>Active</option>
          <option>Expired</option>
        </select>
      </label>
      <button type="submit">Save</button>
    </form>
  </div>
);
export default InternshipPostEditor;
