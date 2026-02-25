import React from "react";
import NavBar from "@/components/nav-bar/NavBar";
import PostCard from "../posts/Post";
import SearchBar from "./SearchBar";

import { mockPosts } from "../mocks/Post";

export default function Feed() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      {/* SearchBar */}
      <SearchBar />
      {/* Content */}
      <div className="mt-16">
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
