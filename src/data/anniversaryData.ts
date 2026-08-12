import { Milestone, ScrapbookItem, LoveNote, BucketListItem, DateIdea } from '../types';
import heroArt from '../assets/images/romantic_hero_art_1786534362574.jpg';
import cardArt from '../assets/images/anniversary_card_art_1786534372471.jpg';

export const ANNIVERSARY_START_DATE = '2025-07-21T00:00:00';
export const ANNIVERSARY_MILESTONE_DATE = '2026-08-21T00:00:00';

export const DEFAULT_MILESTONES: Milestone[] = [
  {
    id: 'm1',
    date: '2025-07-21',
    title: 'The Day Our Journey Began',
    subtitle: 'July 21, 2025 - Day 1',
    description: 'Kwar Nu and Jain Moe officially held hands and started our beautiful relationship. The beginning of forever!',
    category: 'first-date',
    location: 'Our Special Place',
    emoji: '💖',
  },
  {
    id: 'm2',
    date: '2025-08-21',
    title: '1 Month Anniversary',
    subtitle: 'August 21, 2025',
    description: '31 magical days together. Late night calls, sweet morning texts, and realizing how deeply we care for each other.',
    category: 'anniversary',
    emoji: '🌹',
  },
  {
    id: 'm3',
    date: '2025-10-21',
    title: '3 Months & First Trip Together',
    subtitle: 'October 21, 2025',
    description: 'Exploring new sights, holding hands under autumn breezes, and creating unforgettable memories.',
    category: 'trip',
    location: 'Romantic Escape',
    emoji: '✨',
  },
  {
    id: 'm4',
    date: '2026-01-21',
    title: 'Half Year Milestone (6 Months)',
    subtitle: 'January 21, 2026',
    description: 'Welcoming the New Year wrapped in love. Half a year of unconditional support, laughter, and endless cuddles.',
    category: 'milestone',
    emoji: '🥂',
  },
  {
    id: 'm5',
    date: '2026-02-14',
    title: 'First Valentine’s Day',
    subtitle: 'February 14, 2026',
    description: 'A night filled with red roses, sweet chocolate, candlelit dinner, and heartfelt love letters from Kwar Nu to Jain Moe.',
    category: 'special',
    emoji: '💌',
  },
  {
    id: 'm6',
    date: '2026-07-21',
    title: '🎉 1 Full Year Anniversary!',
    subtitle: 'July 21, 2026',
    description: '365 Days of unbroken love! Kwar Nu and Jain Moe celebrated one whole year of sticking together through thick and thin.',
    category: 'anniversary',
    emoji: '👑',
  },
  {
    id: 'm7',
    date: '2026-08-21',
    title: '💖 1 Year & 1 Month Anniversary',
    subtitle: 'August 21, 2026 - Milestone Today!',
    description: '1 Year and 1 Month (397 Days) of pure happiness, unwavering devotion, and building our dream future together!',
    category: 'anniversary',
    emoji: '🎆',
  }
];

export const DEFAULT_SCRAPBOOK: ScrapbookItem[] = [
  {
    id: 's1',
    title: 'Starry Night Together',
    date: 'July 21, 2025',
    imageUrl: heroArt,
    caption: 'Under the starlight with paper lanterns. Kwar Nu & Jain Moe holding hands.',
    tag: 'Anniversary Start',
    rotation: -2,
  },
  {
    id: 's2',
    title: 'Heart in Hands',
    date: 'August 21, 2026',
    imageUrl: cardArt,
    caption: 'Our hands forming a heart of light. 1 Year 1 Month of infinite love.',
    tag: '1Y 1M Love',
    rotation: 3,
  },
  {
    id: 's3',
    title: 'Sweet Coffee Date',
    date: 'Autumn 2025',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    caption: 'Warm smiles, warm coffee, and Jain Moe looking breathtakingly cute.',
    tag: 'Cozy Moments',
    rotation: -1,
  },
  {
    id: 's4',
    title: 'Hand in Hand Walk',
    date: 'Spring 2026',
    imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
    caption: 'Walking through blossom gardens, Kwar Nu never letting go of Jain Moe’s hand.',
    tag: 'Romantic Walk',
    rotation: 2,
  }
];

export const REASONS_WHY_I_LOVE_YOU: LoveNote[] = [
  { id: 'r1', number: 1, reason: 'The way Jain Moe’s eyes light up when she smiles makes Kwar Nu’s entire world stop.', category: 'sweet', isFavorite: true },
  { id: 'r2', number: 2, reason: 'How you always listen so gently when Kwar Nu talks about his day.', category: 'deep', isFavorite: true },
  { id: 'r3', number: 3, reason: 'Your adorable laugh that is Kwar Nu’s absolute favorite melody in the world.', category: 'sweet' },
  { id: 'r4', number: 4, reason: 'Because 1 year and 1 month with you feels like the best gift life could ever give.', category: 'deep', isFavorite: true },
  { id: 'r5', number: 5, reason: 'How cute you look when you get sleepy or excited about good food.', category: 'funny' },
  { id: 'r6', number: 6, reason: 'The way your hand fits perfectly in Kwar Nu’s hand.', category: 'sweet' },
  { id: 'r7', number: 7, reason: 'Because Jain Moe makes Kwar Nu want to be a better person every single day.', category: 'deep' },
  { id: 'r8', number: 8, reason: 'How you remember every little detail about the things Kwar Nu loves.', category: 'sweet' },
  { id: 'r9', number: 9, reason: 'The cozy, safe feeling Kwar Nu gets every time we cuddle.', category: 'sweet' },
  { id: 'r10', number: 10, reason: 'Because I know we are going to celebrate many more years together!', category: 'future', isFavorite: true },
  { id: 'r11', number: 11, reason: 'Your kind heart and warmth towards everyone around you.', category: 'deep' },
  { id: 'r12', number: 12, reason: 'Because Jain Moe is Kwar Nu’s dream come true, today and forever.', category: 'future', isFavorite: true },
];

export const DEFAULT_BUCKET_LIST: BucketListItem[] = [
  { id: 'b1', title: 'Celebrate 1 Year 1 Month Anniversary in high style (Aug 21, 2026)', completed: true, category: 'romantic' },
  { id: 'b2', title: 'Watch a sunset over the beach holding hands', completed: true, category: 'travel' },
  { id: 'b3', title: 'Go on a cozy midnight drive with our favorite playlist', completed: false, category: 'adventure' },
  { id: 'b4', title: 'Bake a delicious anniversary cake together', completed: false, category: 'cozy' },
  { id: 'b5', title: 'Travel to an exotic island together', completed: false, category: 'travel' },
  { id: 'b6', title: 'Adopt a cute pet together', completed: false, category: 'growth' },
];

export const DATE_IDEAS: DateIdea[] = [
  { id: 'd1', title: 'Candlelight Dinner & Love Letter Reading', description: 'Dim the lights, light scented candles, dress up nicely, and read love notes to each other.', category: 'romantic', emoji: '🕯️' },
  { id: 'd2', title: 'Stargazing Blanket Picnic', description: 'Grab warm blankets, hot cocoa, and look up at the stars together.', category: 'outdoor', emoji: '🌌' },
  { id: 'd3', title: 'Cozy Movie Marathon & Blanket Fort', description: 'Build a giant fort in the living room with fairy lights, popcorn, and favorite movies.', category: 'at-home', emoji: '🍿' },
  { id: 'd4', title: 'Sunset Photography Session', description: 'Dress in matching outfits and take cute polaroid photos at golden hour.', category: 'outdoor', emoji: '📸' },
  { id: 'd5', title: 'Chef Kwar Nu & Chef Jain Moe Cooking Challenge', description: 'Pick a mystery ingredient and cook a delicious meal together!', category: 'at-home', emoji: '🍝' },
];
