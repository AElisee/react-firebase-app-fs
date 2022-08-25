import React, { useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../utils/firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import CommentCard from "./CommentCard";

const CommentPost = ({ post }) => {
  const [user, setUser] = useState(null);
  const AnswerRef = useRef();

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
          text: AnswerRef.current.value,
        },
      ];
    } else {
      data = [
        ...post.comments,
        {
          commentAuthor: user.displayName,
          text: AnswerRef.current.value,
        },
      ];
    }

    updateDoc(doc(db, "posts", post.id), { comments: data });
    AnswerRef.current.value = "";
  };

  return (
    <div className="comment-container">
      <h5 className="comment-title">
        {post.comments ? "Commentaires :" : "Soyez le premier à commenter"}
      </h5>
      {post.comments &&
        post.comments.map((comment, index) => (
          <CommentCard key={index} comment={comment} />
        ))}

      {user ? (
        <form onSubmit={(e) => handleComment(e)}>
          <textarea
            placeholder="Envoyer un commentaire"
            ref={AnswerRef}
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
