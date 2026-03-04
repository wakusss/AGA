import { formatDistanceToNow, set } from "date-fns";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { type Post } from "../types/Post";
import CommentSection from "../comments/CommentSection";
import { deletePost } from "../../lib/utils";
import EditPostDialog from "../widgets/PopUpEditPost";

type PostCardProps = {
  id: string | number;
  content: string;
  onDeleted: (id: string | number) => void;
};

export default function PostCard({
  post,
  handlePostDeleted,
}: {
  post: Post;
  handlePostDeleted: () => void;
}) {
  const [liked, setLiked] = useState(post.likedByCurrentUser);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [showComments, setShowComments] = useState(false);

  const toggleLike = async () => {
    const newLiked = !liked;

    setLiked(newLiked);
    setLikesCount(newLiked ? likesCount + 1 : likesCount - 1);

    try {
      if (newLiked) {
        await api.post(`/posts/${post.id}/like`);
      } else {
        await api.post(`/posts/${post.id}/like`);
      }
    } catch (err) {
      setLiked(!newLiked);
      setLikesCount(post.likesCount || 0);
      alert("Failed to update like status. Please try again.");
    }
  };

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };
  const fallbackAvatar = "https://placehold.co/64x64?text=Нет+фото"; // или 80x80, или просто /64

  const avatarUrl = post.author.avatarUrl
    ? post.author.avatarUrl.startsWith("http")
      ? post.author.avatarUrl
      : `https://api.твой-сайт.ru${post.author.avatarUrl}` // ← подставь реальный базовый URL
    : fallbackAvatar;

  // const timeAgo = formatDistanceToNow(new Date(post.createAt), {
  //   addSuffix: true,
  // });
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Delete?")) return;

    setLoading(true);

    try {
      const res = await deletePost(post.id);

      if (res.status < 200 || res.status >= 300) {
        throw new Error(`Неуспешный статус: ${res.status}`);
      }

      // Если сервер вернул 200 + тело с сообщением — можно прочитать
      if (res.status === 200 && res.data?.message) {
        console.log("Сервер сказал:", res.data.message);
      }

      handlePostDeleted();
    } catch (err: any) {
      console.error("Ошибка при удалении:", err);
      alert("Не получилось удалить пост");
    } finally {
      setLoading(false);
    }
  };

  function onDeleted(id: number) {}

  return (
    <div className="bg-white rounded-xl shadow-md mb-4 border border-gray-200 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <img
          src={avatarUrl}
          alt={post.author.username || "Пользователь"}
          className="w-10 h-10 rounded-full object-cover ring-1 ring-blue-100"
          onError={(e) => {
            console.error(
              "Не удалось загрузить аватар:",
              post.author.avatarUrl,
            );
            e.currentTarget.src = fallbackAvatar; // fallback при ошибке
            e.currentTarget.alt = "Аватар не загрузился";
          }}
        />

        <div>
          <div className="font-semibold text-gray-900">
            {post.author.username}
          </div>
          <div className="text-xs text-gray-500">Just now · 🌐</div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3 text-gray-800 whitespace-pre-line leading-relaxed">
        {post.content}
      </div>

      {post.imageUrl && (
        <img
          src={post.imageUrl}
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

        <button
          onClick={toggleComments}
          className="flex-1 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
        >
          Comment
        </button>

        <button className="flex-1 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
          Share
        </button>
        <button
          type="submit"
          onClick={handleDelete}
          disabled={loading}
          className={` px-3 py-1 rounded ${
            loading ? " bg-gray-400" : "bg-red-600 hover:bg-red-700"
          } text-white`}
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>

      {showComments && (
        <div className="w-full p-4 border-t border-gray-200">
          <CommentSection postId={post.id} />
        </div>
      )}

      {likesCount > 0 && (
        <span className="px-4 py-2 text-sm text-gray-500 border-t border-gray-100 bg-blue-50/30">
          {likesCount} {likesCount === 1 ? "like" : "likes"}
        </span>
      )}
    </div>
  );
}
