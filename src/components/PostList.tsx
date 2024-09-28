import React from "react";
import { Post } from "../types";

type PostListProps = {
  posts: Post[];
  onDelete: (id: number) => void;
  onEdit: (post: Post) => void;
};

const PostList: React.FC<PostListProps> = ({ posts, onDelete, onEdit }) => {
  return (
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
            onClick={() => onDelete(post.id)}
            className="rounded-sm bg-red-500 hover:bg-red-400 p-2 text-white"
          >
            Delete
          </button>
          <button
            onClick={() => onEdit(post)}
            className="rounded-sm bg-green-500 hover:bg-green-400 p-2 text-white ml-2"
          >
            Edit
          </button>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
