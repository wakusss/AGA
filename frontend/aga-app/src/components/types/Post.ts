export interface Post {
  author: {
    id: number;
    username: string;
    avatarUrl: string;
  };
  id: number;
  content: string;
  createAt: Date | string;
  imageUrl?: string;
  likesCount?: number;
  likedByCurrentUser?: boolean;
}