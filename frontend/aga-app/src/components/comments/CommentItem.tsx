interface CommentItemProps {
  comment: {
    content: string;
  };
}

export default function CommentItem(props: CommentItemProps) {
  return (
    <div className="comment-item">
      <div>
        <img
          src={""} // Replace with actual avatar URL
          alt="avatar"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div className="comment-author">{props.comment.content}</div>
      </div>
      {props.comment.content}
    </div>
  );
}
