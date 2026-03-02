import type { Comment } from "../types/Comment";

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem(props: CommentItemProps) {
  return (
    <div className="comment-item">
      <div>
        <img
          src={props.comment.author.avatarUrl} // Replace with actual avatar URL
          alt="avatar"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div className="comment-author">{props.comment.author.username}</div>
      </div>
      {props.comment.content}
    </div>
  );
}
