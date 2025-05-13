import React from "react";
import { useParams } from "react-router-dom";
const EvaluationPanel = () => {
  const { applicantId } = useParams();
  return (
    <div>
      <h2>Evaluation for Applicant #{applicantId}</h2>
      <form>
        <label>Evaluation: <textarea /></label>
        <button type="submit">Submit Evaluation</button>
      </form>
    </div>
  );
};
export default EvaluationPanel;
