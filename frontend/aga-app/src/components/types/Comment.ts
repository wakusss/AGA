export interface Comment {
  id: number;
  content: string;
  author: {
    username: string;
    avatarUrl: string;
  };
  createdAt: string | Date;
}
