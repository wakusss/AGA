import React from "react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

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
interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);

  function toggleLike() {
    setLiked((prev) => !prev);
    post.isLikedByCurrentUser = !post.isLikedByCurrentUser;
    if (post.isLikedByCurrentUser) {
      post.likesCount = (post.likesCount || 0) + 1;
    } else {
      post.likesCount = (post.likesCount || 0) - 1;
    }
  }

  const timeAgo = formatDistanceToNow(new Date(post.createAt), {
    addSuffix: true,
  });
  return (
    <div className="bg-white rounded-xl shadow-md mb-4 border border-gray-200 max-w-2xl mx-auto">
      {/* Шапка */}
      <div className="flex items-center gap-3 p-4">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="w-10 h-10 rounded-full object-cover ring-1 ring-blue-100"
        />

        <div>
          <div className="font-semibold text-gray-900">{post.author.name}</div>
          <div className="text-xs text-gray-500">{timeAgo} · 🌐</div>
        </div>
      </div>

      {/* Текст поста */}
      <div className="px-4 pb-3 text-gray-800 whitespace-pre-line leading-relaxed">
        {post.content}
      </div>

      {post.image && (
        <img
          src={post.image}
          alt="Post image"
          className="w-full object-cover max-h-[560px] bg-gray-50"
          loading="lazy"
        />
      )}

      <div className="flex border-t border-gray-200 divide-x divide-gray-200">
        <button
          onClick={toggleLike}
          className={`flex items-center justify-center gap-2 flex-1 py-3 text-sm font-medium transition-colors ${
            liked
              ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <img
            src={
              liked
                ? "https://cdn-icons-png.flaticon.com/128/2107/2107845.png"
                : "https://cdn-icons-png.flaticon.com/128/1077/1077035.png"
            }
            alt="Like"
            className="w-5 h-5"
          />
          Like
        </button>

        <button className="flex-1 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
          Comment
        </button>

        <button className="flex-1 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
          Share
        </button>
      </div>

      {/* Количество лайков теперь под кнопками, как в FB */}
      {post.likesCount && post.likesCount > 0 && (
        <div className="px-4 py-2 text-sm text-gray-500 border-t border-gray-100 bg-blue-50/30">
          {post.likesCount} {post.likesCount === 1 ? "like" : "likes"}
        </div>
      )}
    </div>
  );
}
