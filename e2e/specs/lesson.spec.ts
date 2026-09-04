import { test, expect } from '@playwright/test';
import { AppShellPage } from '../pages/app-shell.page';
import { LessonPage } from '../pages/lesson.page';
import { screenshot } from '../utils/screenshot';

test.describe('Lesson viewer', () => {
  let app: AppShellPage;
  let lesson: LessonPage;

  test.beforeEach(async ({ page }) => {
    app = new AppShellPage(page);
    lesson = new LessonPage(page);
  });

  test('shows a letter lesson with toggles', async ({ page }, testInfo) => {
    await lesson.goto('letter-1');
    await lesson.expectLoaded();

    await expect(lesson.typeBadge).toHaveText('Letter');
    await expect(lesson.transliterationToggle).toBeVisible();
    // Letters have no meaning, so no meaning toggle.
    await expect(lesson.meaningToggle).toHaveCount(0);
    await expect(lesson.transliterationText).toHaveCount(0);

    await lesson.transliterationToggle.click();
    await expect(lesson.transliterationText).toBeVisible();
    await expect(lesson.transliterationToggle).toHaveText('Hide Transliteration');

    await screenshot(page, testInfo, 'lesson-letter-revealed');
  });

  test('word lesson has a meaning toggle', async ({ page }, testInfo) => {
    await lesson.goto('word-1');
    await lesson.expectLoaded();

    await expect(lesson.typeBadge).toHaveText('Word');
    await expect(lesson.meaningToggle).toBeVisible();

    await lesson.meaningToggle.click();
    await expect(lesson.meaningText).toBeVisible();

    await screenshot(page, testInfo, 'lesson-word-revealed');
  });

  test('sentence lesson renders native text and toggles', async ({ page }, testInfo) => {
    await lesson.goto('sentence-1');
    await lesson.expectLoaded();
    await expect(lesson.typeBadge).toHaveText('Sentence');
    await screenshot(page, testInfo, 'lesson-sentence');
  });

  test('paragraph lesson renders native text', async ({ page }, testInfo) => {
    await lesson.goto('paragraph-1');
    await lesson.expectLoaded();
    await expect(lesson.typeBadge).toHaveText('Paragraph');
    await screenshot(page, testInfo, 'lesson-paragraph');
  });

  test('story lesson renders native text', async ({ page }, testInfo) => {
    await lesson.goto('story-1');
    await lesson.expectLoaded();
    await expect(lesson.typeBadge).toHaveText('Story');
    await screenshot(page, testInfo, 'lesson-story');
  });

  test('next/prev navigation moves through lessons', async ({ page }) => {
    await lesson.goto('letter-1');
    await lesson.expectLoaded();

    // First lesson: prev disabled.
    await expect(lesson.prevFab).toBeDisabled();
    await lesson.nextFab.click();
    await expect(page).not.toHaveURL(/letter-1$/);
    await expect(lesson.prevFab).toBeEnabled();

    await lesson.prevFab.click();
    await expect(page).toHaveURL(/letter-1$/);
  });

  test('back button returns to the lesson list', async ({ page }) => {
    await lesson.goto('word-1');
    await lesson.expectLoaded();
    await lesson.backButton.click();
    await expect(page).toHaveURL(/\/level\/\d+$/);
  });

  test('unknown lesson id redirects home', async ({ page }) => {
    await page.goto('/lesson/does-not-exist');
    await expect(page).toHaveURL(/\/$/);
  });
});
