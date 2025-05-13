import React, { useState } from "react";
import axios from "axios";

const DocumentUpload = () => {
  const [files, setFiles] = useState([]);
  const [email, setEmail] = useState("");

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    for (let file of files) {
      formData.append("documents", file);
    }
    formData.append("email", email);

    try {
      await axios.post("http://localhost:5000/api/student/upload-documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Documents uploaded!");
    } catch (err) {
      console.error(err);
      alert("Error uploading documents");
    }
  };

  return (
    <div>
      <h3>Upload Documents</h3>
      <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
      <input type="file" multiple onChange={handleFileChange} /><br />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default DocumentUpload;
