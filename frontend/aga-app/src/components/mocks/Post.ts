import { type Post } from '../types/Post';
import { mockProfile } from './Profile';

export const mockPosts: Post[] = [1, 2, 3, 4, 5, 6].map((i) => ({
  id: i,
  author: mockProfile,
  content: `This is post number ${i}`,
  createAt: new Date("2022-01-15"),
  image: `https://picsum.photos/seed/${i}/600/400`,
  likesCount: Math.floor(Math.random() * 100),
    
}));