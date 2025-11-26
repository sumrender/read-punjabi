export interface LessonItem {
  id: string;
  level: number; // 1-5
  type: LessonType;
  gurmukhi: string;
  transliteration: string;
  meaning?: string; // Optional for letters
  audioSrc: string; // Path to audio file
}

export type LessonType = 'letter' | 'word' | 'sentence' | 'paragraph' | 'story';

export interface LevelMetadata {
  level: number;
  title: string;
  description: string;
}

