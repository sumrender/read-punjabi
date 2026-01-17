export interface LanguageConfig {
  appName: string;
  languageName: string;
  scriptName: string;
  fontFamily: string;
  googleFontsUrl: string;
  localStoragePrefix: string;
  lessonsPathTemplate: string;
  quizzesPathTemplate: string;
  randomPathTemplate: string;
  ui: {
    subtitle: string;
    levelDescriptions: {
      alphabet: string;
    };
    aria: {
      scriptName: string;
    };
  };
}

export const PunjabiConfig: LanguageConfig = {
  appName: 'Punjabi Reading App',
  languageName: 'Punjabi',
  scriptName: 'Gurmukhi',
  fontFamily: "'Noto Sans Gurmukhi', sans-serif",
  googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Gurmukhi:wght@400;700&display=swap',
  localStoragePrefix: 'read-punjabi',
  lessonsPathTemplate: 'assets/punjabi/lessons/level-{level}-lesson-{lessonNumber}.json',
  quizzesPathTemplate: 'assets/punjabi/quizzes/level-{level}-quiz-{quizNumber}.json',
  randomPathTemplate: 'assets/punjabi/random/level-{level}-random.json',
  ui: {
    subtitle: 'Learn to read Gurmukhi script',
    levelDescriptions: {
      alphabet: 'Gurmukhi alphabet',
    },
    aria: {
      scriptName: 'Gurmukhi',
    },
  },
};
