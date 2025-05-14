import React, { useState } from "react";
import PostInternshipForm from "./PostInternshipForm";
import InternshipList from "./InternshipList";

const InternshipPosts = () => {
  const [reload, setReload] = useState(false);

  const refreshList = () => setReload(prev => !prev);

  return (
    <div>
      <PostInternshipForm onSuccess={refreshList} />
      <InternshipList reload={reload} />
    </div>
  );
};

export default InternshipPosts;
