import React from "react";

const CreatePost = () => {
  return (
    <div className="new-post-modal">
      <form>
        <textarea placeholder="message..."></textarea>
        <input type="submit" value="Evoyer" />
      </form>
    </div>
  );
};

export default CreatePost;
