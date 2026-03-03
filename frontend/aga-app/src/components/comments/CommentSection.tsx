import { getComments } from "@/lib/utils";
import { addComment } from "@/lib/utils";
import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import type { Comment } from "../types/Comment";

interface CommentSectionProps {
  postId: number;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAddingComment, setIsAddingComment] = useState(false);

  const handleSubmitComment = () => {
    setIsAddingComment(true);
    if (!newComment.trim()) return;
    addComment(
      postId,
      { content: newComment },
      {
        onLoading: (isLoading) => setLoading(isLoading),
        onError: (message) => {
          (setError(message), setIsAddingComment(false));
        },
        onSuccess: (newComment) => {
          setComments((prev) => [...prev, newComment]);
          setNewComment("");
          setIsAddingComment(false);
        },
      },
    );
  };

  useEffect(() => {
    getComments(postId, {
      onLoading: setLoading,
      onError: setError,
      onSuccess: (data) => {
        setComments(data.content);
      },
    });
  }, [postId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  return (
    <>
      <div className="flex gap-4 mt-4">
        <input
          type="text"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          disabled={isAddingComment}
        />
        <button
          onClick={handleSubmitComment}
          disabled={isAddingComment}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </div>

      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </>
  );
}
