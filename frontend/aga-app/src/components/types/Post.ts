export interface Post {
  author: {
    id: number;
    username: string;
    avatarUrl: string;
  };
  id: number;
  content: string;
  createdAt: string;
  imageUrl?: string;
  likesCount?: number;
  commentsCount: number;
  likedByCurrentUser?: boolean;
}
