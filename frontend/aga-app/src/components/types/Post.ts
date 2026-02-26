export interface Post {
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