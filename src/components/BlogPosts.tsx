import React, { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

const BlogPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:5000/posts");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/posts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // 削除が成功した場合、クライアント側でも投稿を削除
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        console.error("Failed to delete the post");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleEdit = (post: Post) => {
    // 編集中の投稿をセット
    setEditingPost(post);
  };

  const handleUpdate = async () => {
    if (!editingPost) return;

    try {
      const response = await fetch(
        `http://localhost:5000/posts/${editingPost.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editingPost.title,
            content: editingPost.content,
          }),
        }
      );

      if (response.ok) {
        const updatedPost = await response.json();
        setPosts(
          posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
        );
        setEditingPost(null);
      } else {
        console.error("Failed to update the post");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-4">Blog Posts</h1>

      {editingPost ? (
        <div>
          <h2 className="text-2xl font-semibold">Edit Post</h2>
          <input
            type="text"
            value={editingPost.title}
            onChange={(e) =>
              setEditingPost({ ...editingPost, title: e.target.value })
            }
            className="border p-2 w-full mb-2"
          />
          <textarea
            value={editingPost.content}
            onChange={(e) =>
              setEditingPost({ ...editingPost, content: e.target.value })
            }
            rows={6}
            className="border p-2 w-full mb-2"
          />
          <button
            onClick={handleUpdate}
            className="rounded-sm bg-green-500 hover:bg-green-400 p-2 text-white"
          >
            Update
          </button>
        </div>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="border-b py-2">
              <h2 className="text-2xl font-semibold">
                {post.id}: {post.title}
              </h2>
              <p>{post.content}</p>
              <p className="text-gray-500 text-right text-sm">
                投稿日: {post.created_at}
              </p>
              <button
                onClick={() => handleDelete(post.id)}
                className="rounded-sm bg-red-500 hover:bg-red-400 p-2 text-white"
              >
                Delete
              </button>
              <button
                onClick={() => handleEdit(post)}
                className="rounded-sm bg-green-500 hover:bg-green-400 p-2 text-white ml-2"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogPosts;
