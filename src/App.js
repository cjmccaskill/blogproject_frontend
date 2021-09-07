import AllPosts from "./pages/AllPosts";
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

function App(props) {
  // Styles Object
  const h1 = {
    textAlign: "center",
    margin: "10px",
  };
  // URL for API
  const url = "https://cm-blog-project.herokuapp.com/blogs/";

  // State variables
  const [posts, setPosts] = useState([]);

  const getBlogs = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="App">
      <h1 style={h1}>My Blogs</h1>
      <Switch>
        <Route
          exact
          path="/"
          render={(routerprops) => <AllPosts {...routerprops} posts={posts} />}
        />
        <Route
          path="/post/:id"
          render={(routerProps) => (
            <SinglePost {...routerProps} posts={posts} />
          )}
        />
        <Route
          path="/new"
          render={(routerProps) => <Form {...routerProps} />}
        />
        <Route
          path="/edit"
          render={(routerProps) => <Form {...routerProps} />}
        />
      </Switch>
    </div>
  );
}

export default App;
