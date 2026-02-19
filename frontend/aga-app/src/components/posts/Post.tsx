import React from "react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

interface Post {
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  createAt: Date | string;
  image?: string;
}
interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);

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
          className="w-10 h-10 rounded-full object-cover"
        />

        <div>
          <div className="font-semibold">{post.author.name}</div>
          <div className="text-xs text-gray-500">
            {/* Время пока статично */}
            {timeAgo}
          </div>
        </div>
      </div>

      {/* Текст поста */}
      <div className="px-4 pb-4">{post.content}</div>
      {post.image && (
        <img
          src={post.image}
          alt="Post image"
          className="w-full object-cover max-h-[500px]"
        />
      )}

      <div className="flex border-t border-gray-200 divide-x divide-gray-200">
        <img
          src={
            liked
              ? "https://cdn-icons-png.flaticon.com/128/2107/2107845.png"
              : "https://cdn-icons-png.flaticon.com/128/1077/1077035.png"
          }
          alt="Like"
          className="w-6 h-6 mx-3 my-3 cursor-pointer"
          onClick={() => setLiked(!liked)}
        />
        <button className="flex-1 py-3 text-gray-600 hover:bg-gray-100">
          Комментировать
        </button>
        <button className="flex-1 py-3 text-gray-600 hover:bg-gray-100">
          Поделиться
        </button>
      </div>
    </div>
  );
}
