import React, { useState, useEffect, useRef, type ChangeEvent } from "react";
import { formatDistanceToNow } from "date-fns";
import { type UserProfile } from "../types/Profile";
import { type Post } from "../types/Post";
import PostCard from "../posts/PostCard";
import Header from "../header/Header";
import { fetchPosts, fetchCurrentUserProfile } from "@/lib/utils";
import ButtonLogOut from "../ui/ButtonLogOut";

export default function Profile() {
  // ── Profile states ────────────────────────────────────────
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);

  // ── Posts states ──────────────────────────────────────────
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState<string | null>(null);

  // ── Tabs & Create post states ─────────────────────────────
  const [activeTab, setActiveTab] = useState<
    "posts" | "Create" | "about" | "friends" | "photos"
  >("posts");

  const [postText, setPostText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("No file chosen");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Загрузка профиля один раз при монтировании
  useEffect(() => {
    fetchCurrentUserProfile({
      onLoading: setProfileLoading,
      onSuccess: (data) => {
        setProfile(data);
        setProfileLoading(false);
      },
      onError: (msg) => {
        setProfileError(msg);
        setProfileLoading(false);
      },
    });
  }, []);

  // Загрузка постов один раз при монтировании
  useEffect(() => {
    fetchPosts({
      onLoading: setPostsLoading,
      onError: setPostsError,
      onSuccess: (data) => {
        // Предполагаем, что сервер возвращает объект { content: Post[], ... }
        if (data && Array.isArray(data.content)) {
          setPosts(data.content);
        } else if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setPostsError("Неверный формат ответа от сервера");
        }
        setPostsLoading(false);
      },
    });
  }, []);

  const handleFileSelectClick = () => {
    fileInputRef.current?.click();
  };

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

  const handleCreatePost = () => {
    console.log("Создание поста:");
    console.log("Текст:", postText.trim() || "(пусто)");
    console.log("Файл:", selectedFile ? fileName : "не прикреплён");
  };

  // ── Рендеринг состояний загрузки / ошибок профиля ────────
  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Загрузка профиля...</div>
      </div>
    );
  }

  if (profileError || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-lg">
          {profileError || "Не удалось загрузить профиль"}
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="mt-20 max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Профильная шапка */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={profile.avatarUrl || "/default-avatar.png"}
              alt={`${profile.username} avatar`}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-gray-100"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold">
                {profile.username}
              </h1>
              <p className="text-gray-600 mt-1">{profile.email}</p>
              <p className="mt-3 text-gray-700">
                {profile.bio || "Нет описания"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                На платформе с{" "}
                {new Date(profile.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Можно добавить здесь кнопку редактирования профиля */}
        </div>

        {/* Табы */}
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
                    ? "Создать"
                    : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ),
            )}
          </div>
          <ButtonLogOut />
          {/* Содержимое табов */}
          {activeTab === "posts" && (
            <div className="p-4 sm:p-6 space-y-6 min-h-[300px]">
              {postsLoading ? (
                <div className="text-center py-10">Загрузка постов...</div>
              ) : postsError ? (
                <div className="text-red-600 text-center py-10">
                  {postsError}
                </div>
              ) : posts.length === 0 ? (
                <div className="text-gray-500 text-center py-10">
                  Пока нет постов
                </div>
              ) : (
                posts.map((post) => <PostCard key={post.id} post={post} />)
              )}
            </div>
          )}

          {activeTab === "Create" && (
            <div className="p-6 sm:p-8">
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Что у вас на уме?"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
              />

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  accept="image/*,.pdf"
                />

                <button
                  type="button"
                  onClick={handleFileSelectClick}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Выбрать файл
                </button>

                <span className="text-gray-600 text-sm truncate max-w-xs">
                  {fileName}
                </span>

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
                  Опубликовать
                </button>
              </div>
            </div>
          )}

          {activeTab !== "posts" && activeTab !== "Create" && (
            <div className="p-12 text-center text-gray-500 min-h-[300px]">
              {activeTab === "about" && "Раздел «О себе» скоро появится..."}
              {activeTab === "friends" && "Список друзей скоро появится..."}
              {activeTab === "photos" && "Фотографии скоро появятся..."}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
