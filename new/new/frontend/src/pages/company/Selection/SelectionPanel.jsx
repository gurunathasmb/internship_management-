import React from "react";
import { Link } from "react-router-dom";
const SelectionPanel = () => (
  <div>
    <h2>Selection & Evaluation</h2>
    <p>Shortlist, reject, or mark as selected. Submit evaluations or upload offers.</p>
    <Link to="/company/selection/evaluation/1">Evaluate Applicant #1</Link>
    <br />
    <Link to="/company/selection/offer/1">Upload Offer for Applicant #1</Link>
  </div>
);
export default SelectionPanel;
