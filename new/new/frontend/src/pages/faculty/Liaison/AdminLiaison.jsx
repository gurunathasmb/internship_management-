import React, { useState } from "react";

// Simulate sending to backend by saving in localStorage
const sendIssueToAdmin = (issue) => {
  const issues = JSON.parse(localStorage.getItem("facultyIssues") || "[]");
  issues.push(issue);
  localStorage.setItem("facultyIssues", JSON.stringify(issues));
};

const AdminLiaison = () => {
  const [issueText, setIssueText] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!issueText.trim()) return;
    sendIssueToAdmin({
      faculty: "Dr. Example", // Replace with real faculty name/id if available
      date: new Date().toLocaleString(),
      message: issueText
    });
    setIssueText("");
    setSent(true);
    setTimeout(() => setSent(false), 2000);
  };

  return (
    <div>
      <h2>Admin/Company Liaison Tools</h2>
      <form onSubmit={handleSubmit}>
        <h4>Flag Issue to Admin</h4>
        <label>
          Describe the issue:
          <textarea
            value={issueText}
            onChange={(e) => setIssueText(e.target.value)}
            rows={3}
            required
          />
        </label>
        <button type="submit">Send to Admin</button>
        {sent && <span style={{ color: "green", marginLeft: 16 }}>Issue sent!</span>}
      </form>
      {/* ...other liaison tools... */}
    </div>
  );
};

export default AdminLiaison;
