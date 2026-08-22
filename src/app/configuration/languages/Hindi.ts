import { LanguageConfig } from './Punjabi';

export const HindiConfig: LanguageConfig = {
  appName: 'Hindi Reading App',
  languageName: 'Hindi',
  langCode: 'hi',
  scriptName: 'Devanagari',
  fontFamily: "'Noto Sans Devanagari', sans-serif",
  localStoragePrefix: 'hindi-reading-app',
  lessonsPathTemplate: 'assets/hindi/lessons/level-{level}-lesson-{lessonNumber}.json',
  quizzesPathTemplate: 'assets/hindi/quizzes/level-{level}-quiz-{quizNumber}.json',
  randomPathTemplate: 'assets/hindi/random/level-{level}-random.json',
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

