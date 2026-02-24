import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";

import PostCard from "../posts/Post";
import Header from "../header/Header";
interface userProfile {
  id: number;
  isOwnProfile: boolean;
  name: string;
  avatar: string;
  bio?: string;
  location?: string;
  joinedAt: Date | string;
}
interface Post {
  author: {
    id: number;
    name: string;
    avatar: string;
  };
  id: number;
  content: string;
  createAt: Date | string;
  image?: string;
  likesCount?: number;
  isLikedByCurrentUser?: boolean;
}
const mockProfile: userProfile = {
  id: 0,
  isOwnProfile: true,
  name: "John Pork",
  avatar:
    "data:image/jpeg;base64,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",
  bio: "Just a regular guy who loves to chat!",
  location: "New York, USA",
  joinedAt: new Date("2022-01-15"),
};
const mockPosts: Post[] = [1, 2, 3].map((i) => ({
  id: i,
  author: mockProfile,
  content: `This is post number ${i}`,
  createAt: new Date("2022-01-15"),
  image: `https://picsum.photos/seed/${i}/600/400` ,
  likesCount: Math.floor(Math.random() * 100),
}));

export default function Profile() {
  const profile = mockProfile;
  const joinedAgo = formatDistanceToNow(new Date(profile.joinedAt), {
    addSuffix: true,
  });
  const [activeTab, setActiveTab] = useState<
    "posts" | "about" | "friends" | "photos"
  >("posts");
  return (
    <>
      {/* Nav bar */}
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Navbar предполагается уже выше в Layout или App */}

        <div className="max-w-4xl mx-auto pt-6 md:pt-8 pb-12 px-4 sm:px-6 lg:px-8">
          {/* Профильная карточка */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
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

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex border-b border-gray-200 px-2 sm:px-4">
              {(["posts", "about", "friends", "photos"] as const).map((tab) => (
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
              ))}
            </div>

            {/* Posts */}
            {activeTab === "posts" && (
              <div className="p-4 sm:p-6 space-y-6">
                {mockPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* Плейсхолдер для других табов (можно потом заполнить) */}
            {activeTab !== "posts" && (
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
