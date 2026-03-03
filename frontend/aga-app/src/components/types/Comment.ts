export interface Comment {
  id: number;
  content: string;
  author: {
    username: string;
    avatarUrl: string;
  };
  created_at: string;
}
