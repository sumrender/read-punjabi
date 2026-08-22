export interface LanguageConfig {
  appName: string;
  languageName: string;
  langCode: 'pa' | 'hi';
  scriptName: string;
  fontFamily: string;
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
  langCode: 'pa',
  scriptName: 'Gurmukhi',
  fontFamily: "'Noto Sans Gurmukhi', sans-serif",
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
