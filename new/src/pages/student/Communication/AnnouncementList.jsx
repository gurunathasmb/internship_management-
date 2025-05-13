import React from "react";
const announcements = [
  { id: 1, from: "Admin", message: "Welcome to the internship portal!" },
  { id: 2, from: "Faculty", message: "Submit your resume by Friday." },
];
const AnnouncementList = () => (
  <div>
    <h3>Announcements</h3>
    <ul className="announcement-list">
  {announcements.map(a => (
    <li key={a.id}><b>{a.from}:</b> {a.message}</li>
  ))}
</ul>
  </div>
);
export default AnnouncementList;
