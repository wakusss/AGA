import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import type { Comment } from "../types/Comment";

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem(props: CommentItemProps) {
  return (
    <>
      <div className="flex items-start gap-2 px-4 py-3">
        <div className="flex items-start gap-3">
          <div>
            <img
              src={props.comment.author.avatarUrl}
              alt={props.comment.author.username}
              className="w-9 h-9 rounded-full object-cover ring-1 ring-gray-200 flex-shrink-0"
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-gray-100 rounded-2xl px-4 py-3">
            <div className="font-medium text-sm text-gray-900">
              {props.comment.author.username}
            </div>
            <div className="text-sm text-gray-800 mt-0.5 whitespace-pre-line">
              {props.comment.content}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {/* {formatDistanceToNow(new Date(props.comment.createdAt), {
                addSuffix: true,
              })} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
