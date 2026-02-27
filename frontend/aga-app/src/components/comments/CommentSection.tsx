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

  const handleSubmitComment = () => {
    addComment(
      postId,
      { content: newComment },
      {
        onLoading: (isLoading) => setLoading(isLoading),
        onError: (message) => setError(message),
        onSuccess: (newComment) => setComments((prev) => [...prev, newComment]),
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
  }, [handleSubmitComment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value.toString());
  };

  return (
    <>
      <input type="text" onChange={handleChange} />
      <button onClick={handleSubmitComment}>Submit Comment</button>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </>
  );
}
