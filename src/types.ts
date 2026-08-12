export type ThemeMode = 'rose-gold' | 'midnight-starlight' | 'sunset-glow' | 'cherry-blossom' | 'golden-hour';

export interface Milestone {
  id: string;
  date: string; // e.g. "2025-07-21" or "2026-08-21"
  title: string;
  subtitle: string;
  description: string;
  category: 'first-date' | 'milestone' | 'trip' | 'anniversary' | 'special';
  location?: string;
  imageUrl?: string;
  emoji: string;
}

export interface ScrapbookItem {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  caption: string;
  tag: string;
  rotation: number;
}

export interface LoveNote {
  id: string;
  number: number;
  reason: string;
  category: 'sweet' | 'funny' | 'deep' | 'future';
  isFavorite?: boolean;
}

export interface BucketListItem {
  id: string;
  title: string;
  targetDate?: string;
  completed: boolean;
  category: 'travel' | 'adventure' | 'cozy' | 'growth' | 'romantic';
}

export interface DateIdea {
  id: string;
  title: string;
  description: string;
  category: 'at-home' | 'outdoor' | 'romantic' | 'budget';
  emoji: string;
}

export interface FXSettings {
  emojiSpeed: 'slow' | 'medium' | 'fast';
  emojiDensity: 'low' | 'medium' | 'high';
  emojiSet: 'hearts' | 'flowers' | 'sparkles' | 'all';
  flowLightIntensity: 'soft' | 'radiant' | 'vibrant';
  soundEnabled: boolean;
  musicPlaying: boolean;
  mouseTrail: boolean;
}
