import { describe, expect, it } from 'vitest';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { derivePrerenderRoutes } from './lib/prerender-routes.mjs';

const CONTENT_ROOT = join(import.meta.dirname, '__fixtures__/content');

function writeCourseLessons(course, fileName, items) {
  const dir = join(CONTENT_ROOT, course, 'lessons');
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, fileName), JSON.stringify(items));
}

describe('derivePrerenderRoutes', () => {
  it('derives home and settings routes', () => {
    mkdirSync(CONTENT_ROOT, { recursive: true });
    const routes = derivePrerenderRoutes(CONTENT_ROOT);
    expect(routes).toContain('/');
    expect(routes).toContain('/settings');
  });

  it('derives level routes from shipped lesson file names', () => {
    writeCourseLessons('course-a', 'level-2-lesson-1.json', [
      { id: 'w-1' },
      { id: 'w-2' },
    ]);
    writeCourseLessons('course-a', 'level-7-lesson-1.json', [{ id: 's-1' }]);
    const routes = derivePrerenderRoutes(CONTENT_ROOT);
    expect(routes).toContain('/level/2');
    expect(routes).toContain('/level/7');
    expect(routes.some((r) => r.startsWith('/level/'))).toBe(true);
  });

  it('derives one lesson route per level from the first item of the first lesson file', () => {
    writeCourseLessons('course-a', 'level-3-lesson-1.json', [
      { id: 'letter-9' },
      { id: 'letter-10' },
    ]);
    const routes = derivePrerenderRoutes(CONTENT_ROOT);
    expect(routes).toContain('/lesson/letter-9');
    expect(routes).not.toContain('/lesson/letter-10');
  });

  it('deduplicates levels and lessons shared across courses', () => {
    writeCourseLessons('course-b', 'level-2-lesson-1.json', [
      { id: 'w-1' },
      { id: 'w-2' },
    ]);
    const routes = derivePrerenderRoutes(CONTENT_ROOT);
    expect(routes.filter((r) => r === '/level/2')).toHaveLength(1);
    expect(routes.filter((r) => r === '/lesson/w-1')).toHaveLength(1);
  });

  it('orders routes deterministically: pages, then levels, then lessons', () => {
    writeCourseLessons('course-c', 'level-1-lesson-1.json', [{ id: 'a-1' }]);
    writeCourseLessons('course-c', 'level-5-lesson-1.json', [{ id: 'e-1' }]);
    const routes = derivePrerenderRoutes(CONTENT_ROOT);
    expect(routes.indexOf('/settings')).toBeLessThan(routes.indexOf('/level/1'));
    expect(routes.indexOf('/level/5')).toBeLessThan(routes.indexOf('/lesson/a-1'));
    expect(new Set(routes).size).toBe(routes.length);
  });

  it('yields exactly twelve routes against the shipped content', () => {
    const routes = derivePrerenderRoutes(
      join(import.meta.dirname, '..', 'src', 'assets'),
    );
    expect(routes).toEqual([
      '/',
      '/settings',
      '/level/1',
      '/level/2',
      '/level/3',
      '/level/4',
      '/level/5',
      '/lesson/letter-1',
      '/lesson/word-1',
      '/lesson/sentence-1',
      '/lesson/paragraph-1',
      '/lesson/story-1',
    ]);
  });
});

afterAll(() => {
  rmSync(CONTENT_ROOT, { recursive: true, force: true });
});
