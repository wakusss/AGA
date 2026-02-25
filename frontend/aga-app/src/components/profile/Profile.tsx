import React, { useState, useRef, type ChangeEvent } from "react";
import { formatDistanceToNow } from "date-fns";

import Post from "../posts/Post";
import { mockProfile } from "../mocks/Profile";
import { mockPosts } from "../mocks/Post";
import { type UserProfile } from "../types/Profile";
import Header from "../header/Header";

export default function Profile() {
  const profile: UserProfile = mockProfile;

  // Format join date in English (date-fns uses English by default)
  const joinedAgo = formatDistanceToNow(new Date(profile.joinedAt), {
    addSuffix: true,
  });

  const [activeTab, setActiveTab] = useState<
    "posts" | "Create" | "about" | "friends" | "photos"
  >("posts");

  // ── Create tab related state ───────────────────────────────
  const [postText, setPostText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("No file chosen");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Opens the hidden file input dialog
  const handleFileSelectClick = () => {
    fileInputRef.current?.click();
  };

  // Handles file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
    } else {
      setFileName("No file chosen");
      setSelectedFile(null);
    }
  };

  // Handles post creation – currently logs to console
  const handleCreatePost = () => {
    console.log("New post:");
    console.log("Text:", postText.trim() || "(empty)");
    console.log("File:", selectedFile ? fileName : "not attached");

    // Optional: reset form after "posting"
    // setPostText("");
    // setFileName("No file chosen");
    // setSelectedFile(null);
    // if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto pt-6 md:pt-8 pb-12 px-4 sm:px-6 lg:px-8">
          {/* Profile header */}
          <div className="mt-16 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-5">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover ring-2 ring-blue-100 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                    {profile.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{joinedAgo}</p>

                  {profile.bio && (
                    <p className="mt-4 text-gray-700 leading-relaxed max-w-2xl">
                      {profile.bio}
                    </p>
                  )}

                  {profile.location && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                      <span>📍</span>
                      <span>{profile.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs navigation + content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex border-b border-gray-200 px-2 sm:px-4">
              {(["posts", "Create", "about", "friends", "photos"] as const).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      flex-1 py-4 px-3 sm:px-6 text-sm md:text-base font-medium text-center
                      transition-colors duration-150
                      ${
                        activeTab === tab
                          ? "text-blue-600 border-b-4 border-blue-600"
                          : "text-gray-600 hover:text-blue-700 hover:bg-blue-50/50"
                      }
                    `}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ),
              )}
            </div>

            {/* Posts tab content */}
            {activeTab === "posts" && (
              <div className="p-4 sm:p-6 space-y-6">
                {mockPosts.map((post) => (
                  <Post key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* Create post tab */}
            {activeTab === "Create" && (
              <div className="p-6 sm:p-8">
                {/* Post content input */}
                <textarea
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="What's on your mind?"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                />

                <div className="mt-4 flex flex-wrap items-center gap-4">
                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    accept="image/*,.pdf"
                  />

                  {/* Choose file button */}
                  <button
                    type="button"
                    onClick={handleFileSelectClick}
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Choose file
                  </button>

                  {/* Selected file name display */}
                  <span className="text-gray-600 text-sm truncate max-w-xs">
                    {fileName}
                  </span>

                  {/* Submit post button */}
                  <button
                    type="button"
                    onClick={handleCreatePost}
                    disabled={!postText.trim() && !selectedFile}
                    className={`
                      ml-auto px-6 py-2.5 rounded-full font-medium transition-colors
                      ${
                        postText.trim() || selectedFile
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }
                    `}
                  >
                    Post
                  </button>
                </div>
              </div>
            )}

            {/* Placeholder for other tabs */}
            {activeTab !== "posts" && activeTab !== "Create" && (
              <div className="p-12 text-center text-gray-500">
                {activeTab === "about" && "About section coming soon..."}
                {activeTab === "friends" && "Friends list coming soon..."}
                {activeTab === "photos" && "Photos coming soon..."}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
