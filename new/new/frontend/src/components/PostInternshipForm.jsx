import React, { useState } from "react";

function PostInternshipForm() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'internship'
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch('http://localhost:5000/api/internships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // ✅ Correct placement
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Internship/Job posted!');
        setForm({ title: '', description: '', type: 'internship' });
         if (onSuccess) onSuccess();
      } else {
        alert(data.message || 'Failed to post internship.');
      }
    } catch (err) {
      console.error('Server error:', err);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Post Internship/Job</h2>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      /><br />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      /><br />
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="internship">Internship</option>
        <option value="job">Job</option>
      </select><br />
      <button type="submit">Post</button>
    </form>
  );
}

export default PostInternshipForm;
