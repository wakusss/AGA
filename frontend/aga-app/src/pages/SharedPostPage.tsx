import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Post } from "@/components/types/Post";
import { getPost } from "@/lib/utils";

import Header from "@/components/header/Header";
import PostCard from "@/components/posts/PostCard";

export default function SharedPostPage() {
  const [post, setPost] = useState<Post>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { postId } = useParams<{ postId: string }>();
  const postIdNumber = Number(postId);

  useEffect(() => {
    getPost(postIdNumber, {
      onError: (message) => setError(message),
      onLoading: (isLoading) => setLoading(isLoading),
      onSuccess: (sharedPostData) => {
        setPost(sharedPostData);
      },
    });
  }, []);

  return (
    <>
      <Header />
      <div className="h-32"></div>
      {loading && <h1 className="text-center text-xl">Loading...</h1>}
      {post ? <PostCard post={post} /> : ""}
      {error && <h1 className="text-center text-xl">{error}</h1>}
    </>
  );
}
