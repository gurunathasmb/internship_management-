import React from "react";
const certificates = [
  { id: 1, name: "Web Dev Internship", url: "/certificates/webdev.pdf" },
];
const CertificateList = () => (
  <div>
    <h2>Certificates</h2>
    <ul className="certificate-list">
  {certificates.map(c => (
    <li key={c.id}>
      {c.name} - <a href={c.url} download>Download</a>
    </li>
  ))}
</ul>
  </div>
);
export default CertificateList;
