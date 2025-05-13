import React from "react";
const PrivateNotes = () => (
  <div>
    <h2>Private Notes</h2>
    <textarea rows={5} style={{width:"100%"}} placeholder="Add notes (only visible to company)"></textarea>
    <button style={{marginTop:8}}>Save Note</button>
  </div>
);
export default PrivateNotes;
