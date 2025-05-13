import React from "react";
import { Link } from "react-router-dom";
const posts = [
  { id: 1, title: "Frontend Developer", status: "Active" },
  { id: 2, title: "Data Analyst", status: "Expired" }
];
const InternshipPosts = () => (
  <div>
    <h2>Internship Posts</h2>
    <Link to="edit/new">
      <button>Create New Internship</button>
    </Link>
    <div style={{marginTop:16}}>
      {posts.map(post => (
        <div className="internship-card" key={post.id}>
          <h4>{post.title}</h4>
          <p>Status: <b>{post.status}</b></p>
          <Link to={`edit/${post.id}`}>Edit</Link> |{" "}
          <Link to="/company/internships/stats">View Stats</Link> |{" "}
          <Link to="/company/internships/schedule">Interview Schedule</Link>
        </div>
      ))}
    </div>
  </div>
);
export default InternshipPosts;
