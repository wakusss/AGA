import { useState, useRef } from "react";
import api from "@/lib/api";
import { type Post } from "../types/Post";
import CommentSection from "../comments/CommentSection";
import { deletePost } from "../../lib/utils";
import EditPostDialog from "../widgets/PopUpEditPost";

export default function PostCard({
  post,
  handlePostDeleted,
  inProfile = false,
}: {
  post: Post;
  handlePostDeleted?: () => void;
  inProfile?: boolean;
}) {
  const [liked, setLiked] = useState(post.likedByCurrentUser);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [commentsCount, setCommentsCount] = useState(post.commentsCount || 0);
  const [showComments, setShowComments] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);

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
  const fallbackAvatar = "https://placehold.co/64x64";

  const avatarUrl = post.author.avatarUrl
    ? post.author.avatarUrl.startsWith("http")
      ? post.author.avatarUrl
      : `${post.author.avatarUrl}`
    : fallbackAvatar;

  const handleShare = async () => {
    const postUrl = `${window.location.origin}/feed/${post.id}`;

    const shareData = {
      title: `Post from ${post.author.username || "user"}`,
      text:
        post.content.slice(0, 120) + (post.content.length > 120 ? "..." : ""),
      url: postUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(postUrl);
        alert("The link has been copied to the clipboard!");
      }
    } catch (err) {
      console.error("Sharing error:", err);
      navigator.clipboard.writeText(postUrl);
      alert("Unable to share. Copy the link.: " + postUrl);
    }
  };

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

      handlePostDeleted?.();
    } catch (err: any) {
      console.error("Ошибка при удалении:", err);
      alert("Не получилось удалить пост");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (fullDate: string) => {
    if (!fullDate) return "—";

    try {
      const date = new Date(fullDate);
      if (isNaN(date.getTime())) return "—";

      return date.toLocaleString("pl-PL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return "—";
    }
  };

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
          <div className="text-xs text-gray-500">
            {formatDate(post.createdAt)}
          </div>
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

        <button
          onClick={handleShare}
          className="flex-1 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
        >
          Share
        </button>
        {inProfile && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className={`
    inline-flex items-center gap-1.5
    px-3.5 py-1.5
    text-sm font-medium
    text-red-100 bg-red-600
    hover:bg-red-700 hover:text-white
    disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed
    shadow-sm hover:shadow
    transition-colors duration-180
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2
  `}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            {loading ? "Deleting..." : "Delete"}
          </button>
        )}

        {inProfile && (
          <>
            <button
              onClick={() => {
                if (dialogRef.current) {
                  dialogRef.current.showModal();
                } else {
                  console.error("dialogRef.current is null");
                }
              }}
              className="
    inline-flex items-center gap-1.5
    px-3.5 py-1.5
    text-sm font-medium
    text-blue-700 hover:text-blue-800
    bg-blue-50 hover:bg-blue-100
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1
    active:scale-[0.98]
  "
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Edit post
            </button>
            <EditPostDialog
              ref={dialogRef}
              initialData={post}
              onSuccess={() => {
                // refresh posts, show toast, etc.
                console.log("Post updated!");
              }}
            />
          </>
        )}
      </div>

      {showComments && (
        <div className="w-full p-4 border-t border-gray-200">
          <CommentSection
            postId={post.id}
            setCommentCount={() => {
              setCommentsCount(commentsCount + 1);
            }}
          />
        </div>
      )}

      {likesCount > 0 && (
        <span className="px-4 py-2 text-sm text-gray-500">
          {likesCount} {likesCount === 1 ? "like" : "likes"}
        </span>
      )}

      {commentsCount > 0 && (
        <span>
          <span className="px-4 py-2 text-sm text-gray-500">
            {commentsCount} {commentsCount === 1 ? "comment" : "commentaries"}
          </span>
        </span>
      )}
    </div>
  );
}
