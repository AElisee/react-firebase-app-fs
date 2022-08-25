import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase.config";

const Delete = ({ postId }) => {
  const handleDelete = () => {
    deleteDoc(doc(db, "posts", postId));
  };
  return (
    <div className="delete" onClick={() => handleDelete()}>
      <i className="fa-solid fa-trash-can"></i>
    </div>
  );
};

export default Delete;
