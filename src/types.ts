export interface Post {
  id: string;
  platform: 'x' | 'facebook' | 'instagram';
  title: string;
  summary: string;
  views: number;
  likes: number;
  reposts: number;
  score: number;
  category: 'news' | 'food' | 'travel' | 'tech' | 'sports';
  url: string;
  tags: string[];
  postedAt: string;
  updatedAt: string;
}

export type CategoryFilter = 'all' | 'news' | 'food' | 'travel' | 'tech' | 'sports';
export type PlatformFilter = 'all' | 'x' | 'facebook' | 'instagram';
export type SortOption = 'score' | 'views' | 'date';
