import React from "react";
const EvaluationPanel = () => (
  <div>
    <h2>Evaluation & Feedback</h2>
    <form>
      <label>Student: <input type="text" /></label>
      <label>Internship: <input type="text" /></label>
      <label>Grade: <input type="text" /></label>
      <label>Remarks: <textarea /></label>
      <button type="submit">Submit Evaluation</button>
    </form>
    <p>Coordinate with company mentors for feedback and approve final reports here.</p>
  </div>
);
export default EvaluationPanel;
