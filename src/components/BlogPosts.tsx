import React, { useEffect, useState } from "react";
import { Post } from "../types";
import PostList from "./PostList";
import EditPostForm from "./EditPostForm";

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
        <EditPostForm
          editingPost={editingPost}
          onTitleChange={(e) =>
            setEditingPost({ ...editingPost, title: e.target.value })
          }
          onContentChange={(e) =>
            setEditingPost({ ...editingPost, content: e.target.value })
          }
          onUpdate={handleUpdate}
        />
      ) : (
        <PostList posts={posts} onDelete={handleDelete} onEdit={handleEdit} />
      )}
    </div>
  );
};
export default BlogPosts;
