import AllPosts from "./pages/AllPosts";
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";
import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";

function App(props) {
  // Styles Object
  const h1 = {
    textAlign: "center",
    margin: "10px",
  };

  const button = {
    backgroundColor: "navy",
    display: "block",
    margin: "10px auto",
  };
  // URL for API
  const url = "https://cm-blog-project.herokuapp.com/blogs/";

  // State variables
  const [posts, setPosts] = useState([]);

  const nullPost = {
    title: "",
    body: "",
  };

  const [targetPost, setTargetPost] = useState(nullPost);

  const getBlogs = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setPosts(data);
  };

  const addPost = async (newPost) => {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });
    getBlogs();
  };

  const getTargetPost = (post) => {
    setTargetPost(post);
    props.history.push("/edit");
  };

  const updatePost = async (post) => {
    const response = await fetch(url + post.id + "/", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    getBlogs();
  };

  const deletePost = async (post) => {
    const response = await fetch(url + post.id + "/", {
      method: "delete",
    });

    getBlogs();
    props.history.push("/");
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="App">
      <h1 style={h1}>My Blogs</h1>
      <Link to="/new">
        <button style={button}>Create New Blog</button>
      </Link>
      <Switch>
        <Route
          exact
          path="/"
          render={(routerprops) => <AllPosts {...routerprops} posts={posts} />}
        />
        <Route
          path="/post/:id"
          render={(routerProps) => (
            <SinglePost
              {...routerProps}
              posts={posts}
              editPost={getTargetPost}
              deletePost={deletePost}
            />
          )}
        />
        <Route
          path="/new"
          render={(routerProps) => (
            <Form
              {...routerProps}
              initialPost={nullPost}
              handleSubmit={addPost}
              buttonLabel="Create post"
            />
          )}
        />
        <Route
          path="/edit"
          render={(routerProps) => (
            <Form
              {...routerProps}
              initialPost={targetPost}
              handleSubmit={updatePost}
              buttonLabel="Update Todo"
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
