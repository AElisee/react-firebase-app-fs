import React from "react";
import { useDispatch } from "react-redux";
import { deletePost, getPosts } from "../actions/post.action";

const Delete = ({ postId }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deletePost(postId));
    // pour ressoudre l'erreur dans la console j'ai fait à nouveau getPosts()
    dispatch(getPosts());
  };
  return (
    <div className="delete" onClick={() => handleDelete()}>
      <i className="fa-solid fa-trash-can"></i>
    </div>
  );
};

export default Delete;
