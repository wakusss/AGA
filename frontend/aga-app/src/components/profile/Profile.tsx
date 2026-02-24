import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";

import Post from "../posts/Post";

import { mockProfile } from "../mocks/profile";
import { mockPosts } from "../mocks/Post";

import { type UserProfile } from "../types/Profile";
import Header from "../header/Header";

export default function Profile() {
  const profile: UserProfile = mockProfile;
  const joinedAgo = formatDistanceToNow(new Date(profile.joinedAt), {
    addSuffix: true,
  });

  const [activeTab, setActiveTab] = useState<
    "posts" | "about" | "friends" | "photos"
  >("posts");

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto pt-6 md:pt-8 pb-12 px-4 sm:px-6 lg:px-8">
          {/* Profile */}
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

          {/* Pages  */}
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

            {activeTab === "posts" && (
              <div className="p-4 sm:p-6 space-y-6">
                {mockPosts.map((post) => (
                  <Post key={post.id} post={post} />
                ))}
              </div>
            )}

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
