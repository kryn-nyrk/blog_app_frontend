import React, { useState } from "react";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setMessage("Title and content required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setMessage("Post created successfully!");
        setTitle("");
        setContent("");
      } else {
        setMessage("Failed to create post");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again");
    }
  };

  return (
    <div className="container mx-auto my-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} space-y-4>
        <div>
          <label className="block font-medium">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter the content"
            rows={6}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-400 text-white p-2 rounded"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
