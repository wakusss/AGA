import { useState, useEffect, useRef } from "react";
import { type UserProfile } from "../types/Profile";
import { type Post } from "../types/Post";
import PostCard from "../posts/PostCard";
import Header from "../header/Header";
import {
  fetchPosts,
  fetchCurrentUserProfile,
  handleSubmitLoginData,
} from "@/lib/utils";
import api from "@/lib/api";
import ButtonLogOut from "../ui/ButtonLogOut";
import EditProfileDialog, {
  type ProfileFormData,
} from "../widgets/PopUpEditProfile";
import CreatePost from "../posts/CreatePost";

export default function Profile() {
  // ── Profile states ────────────────────────────────────────
  const [profile, setProfile] = useState<UserProfile>({
    id: 0,
    email: "",
    username: "",
    bio: "",
    avatarUrl: "/default-avatar.png",
    createdAt: "",
  });
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);

  // ── Posts states ──────────────────────────────────────────
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState<string | null>(null);

  // Load profile and post once on mount
  useEffect(() => {
    // Profile
    fetchCurrentUserProfile({
      onLoading: setProfileLoading,
      onSuccess: (data) => {
        const newProfile = {
          id: data.id,
          email: data.email,
          username: data.username,
          bio: data.bio,
          avatarUrl: data.avatarUrl,
          createdAt: data.createdAt,
        };
        setProfile(newProfile);

        setProfileLoading(false);
      },
      onError: (msg) => {
        setProfileError(msg);
        setProfileLoading(false);
      },
    });
  }, []);

  useEffect(() => {
    // Posts
    fetchPosts({
      userId: profile.id,
      onLoading: setPostsLoading,
      onError: setPostsError,
      onSuccess: (data) => {
        // Assuming server returns object { content: Post[], ... }
        if (data && Array.isArray(data.content)) {
          console.log(data);
          setPosts(data.content.sort());
        } else if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setPostsError("Invalid response format from server");
        }
        setPostsLoading(false);
      },
    });
  }, [profile?.id]);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const CLOUD_NAME = "dilkuprok";
  const UPLOAD_PRESET = "profile_avatar_unsigned";

  const handleSave = async (formData: ProfileFormData) => {
    try {
      let finalAvatarUrl = formData.avatarUrl;

      if (formData.avatarUrl?.startsWith("blob:")) {
        const blob = await fetch(formData.avatarUrl).then((r) => r.blob());
        const fd = new FormData();
        fd.append("file", blob);
        fd.append("upload_preset", UPLOAD_PRESET);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          { method: "POST", body: fd },
        );

        if (!res.ok) throw new Error("Cloudinary upload failed");

        const data = await res.json();
        finalAvatarUrl = data.secure_url;
      }

      // Send update to backend
      const response = await api.patch("/users/me", {
        username: formData.username,
        bio: formData.bio,
        avatarUrl: finalAvatarUrl,
      });

      setProfile(response.data);
    } catch (err) {
      console.error("Profile update error:", err);
      alert("Failed to save profile");
    } finally {
      dialogRef.current?.close();
    }
  };

  const [activeTab, setActiveTab] = useState<
    "posts" | "Create" | "about" | "friends" | "photos"
  >("posts");

  return (
    <>
      <Header />

      <div className="mt-20 max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Profile header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
            <div className="flex flex-col sm:flex-row gap-6">
              <img
                src={profile.avatarUrl}
                alt={`${profile.username} avatar`}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-gray-100"
              />
              <div className="text-center sm:text-left ">
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {profile.username}
                </h1>
                <p className="mt-3 text-gray-700">{profile.bio}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Since {new Date(profile.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-y-4">
              <button
                type="button"
                onClick={() => {
                  if (dialogRef.current) {
                    dialogRef.current.showModal();
                  } else {
                    console.error("dialogRef.current is null");
                  }
                }}
                className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
              <ButtonLogOut />
            </div>

            <EditProfileDialog
              key={`${profile.id}-${profile.username}-${profile.bio}-${profile.avatarUrl}`}
              ref={dialogRef}
              initialData={{
                username: profile.username,
                bio: profile.bio,
                avatarUrl: profile.avatarUrl,
              }}
              onSave={handleSave}
            />
          </div>
        </div>

        {/* Tabs */}
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
                        ? "text-blue-600 border-b-4 border-blue-600 font-semibold"
                        : "text-gray-600 hover:text-blue-700 hover:bg-blue-50/50"
                    }
                  `}
                >
                  {tab === "Create"
                    ? "Create"
                    : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ),
            )}
          </div>

          {/* Tab content */}
          {activeTab === "posts" && (
            <div className="p-4 sm:p-6 space-y-6 min-h-[300px]">
              {postsLoading ? (
                <div className="text-center py-10">Loading posts...</div>
              ) : postsError ? (
                <div className="text-red-600 text-center py-10">
                  {postsError}
                </div>
              ) : posts.length === 0 ? (
                <div className="text-gray-500 text-center py-10">
                  No posts yet. Create your first post!
                </div>
              ) : (
                posts.map((post) => <PostCard key={post.id} post={post} />)
              )}
            </div>
          )}

          {/* Create tab content */}
          {activeTab === "Create" && (
            <div className="p-4 sm:p-6">
              <CreatePost />
            </div>
          )}

          {activeTab !== "posts" && activeTab !== "Create" && (
            <div className="p-12 text-center text-gray-500 min-h-[300px]">
              {activeTab === "about" && "About section coming soon..."}
              {activeTab === "friends" && "Friends list coming soon..."}
              {activeTab === "photos" && "Photos coming soon..."}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
