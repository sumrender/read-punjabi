export const BRAND_NAME = 'Read Punjabi';

export const HOME_TITLE = `${BRAND_NAME} — learn to read Gurmukhi`;

export const SITE_ORIGIN = 'https://read-punjabi.pages.dev';

export const SITE_DESCRIPTION =
  'Learn to read Gurmukhi, the script used to write Punjabi, free in your browser: ' +
  'five levels of lessons, quizzes, and random practice.';

export const THEME_COLOR_DARK = '#111827';

export function pageTitle(page: string): string {
  return `${page} · ${BRAND_NAME}`;
}

export function descriptionForPath(path: string): string {
  const randomMatch = path.match(/^\/level\/(\d+)\/random/);
  if (randomMatch) {
    return 'Mixed Gurmukhi reading practice drawn from every letter you have learned.';
  }
  const levelMatch = path.match(/^\/level\/(\d+)/);
  if (levelMatch) {
    return `Practise reading Gurmukhi letters in Level ${levelMatch[1]} of Read Punjabi.`;
  }
  if (path.startsWith('/lesson/')) {
    return 'Learn Gurmukhi letters step by step with native text, transliteration, and meanings.';
  }
  if (path.startsWith('/quiz/')) {
    return 'Check your Gurmukhi reading skills with a graded quiz.';
  }
  if (path.startsWith('/settings')) {
    return 'Choose your Course, adjust text size, and manage display preferences.';
  }
  return SITE_DESCRIPTION;
}
