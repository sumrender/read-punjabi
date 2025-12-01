import { LanguageConfig } from './Punjabi';

export const HindiConfig: LanguageConfig = {
  appName: 'Hindi Reading App',
  languageName: 'Hindi',
  scriptName: 'Devanagari',
  fontFamily: "'Noto Sans Devanagari', sans-serif",
  googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;700&display=swap',
  localStoragePrefix: 'hindi-reading-app',
  lessonsPathTemplate: 'assets/hindi/lessons/level-{level}.json',
  quizzesPathTemplate: 'assets/hindi/quizzes/level-{level}.json',
  ui: {
    subtitle: 'Learn to read Devanagari script',
    levelDescriptions: {
      alphabet: 'Devanagari alphabet',
    },
    aria: {
      scriptName: 'Devanagari',
    },
  },
};

