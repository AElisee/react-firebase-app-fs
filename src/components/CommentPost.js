import React, { useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase.config";
import CommentCard from "./CommentCard";
import { useDispatch } from "react-redux";
import { addComment } from "../actions/post.action";

const CommentPost = ({ post }) => {
  const [user, setUser] = useState(null);
  const answerRef = useRef([]);
  const dispatch = useDispatch();

  // verifie si un utilisateur est connecté
  // bien qu'on pouvaint le passer en prop, il n'est pas recommander trilling raison pour laquelle on le rappelle ici
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  // ------------

  const handleComment = (e) => {
    e.preventDefault();

    let data = [];
    if (post.comments === null) {
      data = [
        {
          commentAuthor: user.displayName,
          text: answerRef.current.value,
        },
      ];
    } else {
      data = [
        ...post.comments,
        {
          commentAuthor: user.displayName,
          text: answerRef.current.value,
        },
      ];
    }

    dispatch(addComment(post.id, data));
    answerRef.current.value = "";
  };

  return (
    <div className="comment-container">
      <h5 className="comment-title">
        {post.comments
          ? "Commentaires :"
          : "Soyez la première personne à commenter"}
      </h5>
      {post.comments &&
        post.comments.map((comment, index) => (
          <CommentCard key={index} comment={comment} />
        ))}

      {user ? (
        <form onSubmit={(e) => handleComment(e)}>
          <textarea
            placeholder="Envoyer un commentaire"
            // onChange={(e) => setAnswer(e.target.value)}
            ref={answerRef}
          ></textarea>
          <input type="submit" value="Envoyer" />
        </form>
      ) : (
        "Vous devez vous connecter pour envoyer un commentaire"
      )}
    </div>
  );
};

export default CommentPost;
