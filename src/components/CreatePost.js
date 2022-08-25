import React, { useRef } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../utils/firebase.config";

const CreatePost = ({ uid, displayName }) => {
  const message = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      author: displayName,
      authorId: uid,
      message: message.current.value,
      comments: null,
      date: Date.now(),
    };
    await addDoc(collection(db, "posts"), data);
    message.current.value = "";
  };

  return (
    <div className="new-post-modal">
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea placeholder="message..." ref={message}></textarea>
        <input type="submit" value="Evoyer" />
      </form>
    </div>
  );
};

export default CreatePost;
