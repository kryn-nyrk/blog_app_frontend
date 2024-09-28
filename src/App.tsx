import React from "react";
import BlogPosts from "./components/BlogPosts";
import CreatePost from "./components/CreatePost";

function App() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-4">Blog</h1>
      <CreatePost />
      <BlogPosts />
    </div>
  );
}

export default App;
