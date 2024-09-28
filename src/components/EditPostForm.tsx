import React, { ChangeEvent } from "react";
import { Post } from "../types";

type EditPostFormProps = {
  editingPost: Post;
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onUpdate: () => void;
};

const EditPostForm: React.FC<EditPostFormProps> = ({
  editingPost,
  onTitleChange,
  onContentChange,
  onUpdate,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Edit Post</h2>
      <input
        type="text"
        value={editingPost.title}
        onChange={onTitleChange}
        className="border p-2 w-full mb-2"
      />
      <textarea
        value={editingPost.content}
        onChange={onContentChange}
        rows={6}
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={onUpdate}
        className="rounded-sm bg-green-500 hover:bg-green-400 p-2 text-white"
      >
        Update
      </button>
    </div>
  );
};

export default EditPostForm;
