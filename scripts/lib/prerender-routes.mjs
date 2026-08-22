import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/** Root directory of shipped Course content files. */
export const CONTENT_ROOT = join(process.cwd(), 'src', 'assets');

const LESSON_FILE_PATTERN = /^level-(\d+)-lesson-(\d+)\.json$/;

function firstItemId(filePath) {
  const data = JSON.parse(readFileSync(filePath, 'utf8'));
  const items = Array.isArray(data) ? data : (data && data.items) || [];
  return items.length > 0 ? String(items[0].id) : null;
}

/**
 * Derive the prerendered route list by scanning shipped Course content
 * files. Levels come from lesson file names; one Lesson page per Level is
 * derived from the first Letter of that level's lowest-numbered lesson
 * file. Routes shared across Courses are deduplicated.
 */
export function derivePrerenderRoutes(contentRoot) {
  const levels = new Set();
  const lessonIds = [];

  for (const course of readdirSync(contentRoot)) {
    const lessonsDir = join(contentRoot, course, 'lessons');
    let files;
    try {
      files = readdirSync(lessonsDir);
    } catch {
      continue;
    }

    const lessonFiles = files
      .map((name) => ({ name, match: name.match(LESSON_FILE_PATTERN) }))
      .filter(({ match }) => match !== null)
      .sort((a, b) => Number(a.match[1]) - Number(b.match[1]) || Number(a.match[2]) - Number(b.match[2]));

    for (const { name, match } of lessonFiles) {
      const level = Number(match[1]);
      if (!levels.has(level)) {
        levels.add(level);
        const id = firstItemId(join(lessonsDir, name));
        if (id !== null) {
          lessonIds.push(id);
        }
      }
    }
  }

  return [
    '/',
    '/settings',
    ...[...levels].sort((a, b) => a - b).map((level) => `/level/${level}`),
    ...lessonIds.map((id) => `/lesson/${id}`),
  ];
}
