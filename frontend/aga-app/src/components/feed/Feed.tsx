import React from "react";
import NavBar from "@/components/nav-bar/NavBar";
import PostCard from "../posts/PostCard";
import SearchBar from "./SearchBar";

export default function Feed() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      {/* SearchBar */}
      <SearchBar />
      {/* Content */}
      <div className="mt-16"></div>
    </div>
  );
}
