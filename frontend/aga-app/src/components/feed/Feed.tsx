import React, { useEffect, useState } from "react";
import NavBar from "@/components/nav-bar/NavBar";
import PostCard from "../posts/PostCard";
import SearchBar from "./SearchBar";
import { fetchAllPosts } from "../../lib/utils"; // adjust path if needed

export default function Feed() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = () => {
    if (loading) return; // prevent multiple simultaneous requests

    fetchAllPosts({
      onLoading: setLoading,
      onSuccess: (loadedPosts) => {
        setPosts(loadedPosts);
        setError(null);
      },
      onError: (msg) => setError(msg),
    });
  };

  // Load posts once when component mounts
  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <SearchBar />

      <div className="mt-41 px-4 max-w-3xl mx-auto">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading posts...
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No posts available yet
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                handlePostDeleted={function (): void {
                  throw new Error("Function not implemented.");
                }}
                inProfile={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
