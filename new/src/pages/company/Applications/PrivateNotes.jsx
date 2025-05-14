import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PrivateNotes = () => {
  const { applicantId } = useParams(); // Get the applicant ID from the URL
  const [note, setNote] = useState(""); // To store the entered note
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle change in the note textarea
  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  // Handle save note button click
  const handleSaveNote = async () => {
    if (!note.trim()) {
      setError("Note cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      // Make an API request to save the note (replace with actual endpoint)
      const response = await axios.post(`http://localhost:5000/api/company/applications/${applicantId}/notes`, { note });
      alert("Note saved successfully!"); // Show success message
      setNote(""); // Clear the textarea
    } catch (err) {
      setError("Error saving the note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Private Notes</h2>
      <textarea
        rows={5}
        style={{ width: "100%" }}
        value={note}
        onChange={handleNoteChange}
        placeholder="Add notes (only visible to company)"
      ></textarea>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button style={{ marginTop: 8 }} onClick={handleSaveNote} disabled={loading}>
        {loading ? "Saving..." : "Save Note"}
      </button>
    </div>
  );
};

export default PrivateNotes;
