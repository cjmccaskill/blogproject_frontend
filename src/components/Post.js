import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  // Styles
  const div = {
    textAlign: "center",
    border: "3px solid",
    margin: "10px auto",
    width: "80%",
  };

  return (
    <div style={div}>
      <Link to={`/post/${post.id}`}>
        <h3>{post.title}</h3>
      </Link>
      <p>{post.body}</p>
    </div>
  );
};

export default Post;
