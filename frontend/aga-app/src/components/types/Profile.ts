export interface UserProfile {
  id: number;
  isOwnProfile: boolean;
  name: string;
  avatar: string;
  bio?: string;
  location?: string;
  joinedAt: Date | string;
}