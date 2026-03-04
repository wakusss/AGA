export interface UserProfile {
  id: number;
  email: string | "";
  username: string | "";
  bio: string | "";
  avatarUrl?: string | "";
  createdAt: string | "";
}
