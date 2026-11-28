import { test, expect } from '@playwright/test';
import { AppShellPage } from '../pages/app-shell.page';
import { LevelPage } from '../pages/level.page';
import { LessonPage } from '../pages/lesson.page';
import { SettingsPage } from '../pages/settings.page';
import { screenshot } from '../utils/screenshot';

/**
 * Level 5 gained two stories (Lion and Elephant) alongside the existing Raj and
 * Baba Ji stories. Both courses ship the same four stories in the same order.
 */
const PUNJABI_STORY_TITLES = [
  'ਰਾਜ (Raj)',
  'ਬਾਬਾ ਜੀ (Baba Ji)',
  'ਸ਼ੇਰ ਅਤੇ ਚੂਹਾ (Sher ate Chuha)',
  'ਦਿਆਲੂ ਹਾਥੀ (Dayalu Haathi)',
];

const HINDI_STORY_TITLES = [
  'राज (Raj)',
  'बाबा जी (Baba Ji)',
  'शेर और चूहा (Sher aur Chuha)',
  'दयालु हाथी (Dayalu Haathi)',
];

const PUNJABI_STORIES = [
  {
    id: 'story-3',
    nativeSnippet: 'ਚੂਹਾ',
    transliterationSnippet: 'chuha',
    meaningSnippet: 'lion',
  },
  {
    id: 'story-4',
    nativeSnippet: 'ਹਾਥੀ',
    transliterationSnippet: 'haathi',
    meaningSnippet: 'elephant',
  },
];

const HINDI_STORIES = [
  {
    id: 'story-3',
    nativeSnippet: 'चूहा',
    transliterationSnippet: 'chuha',
    meaningSnippet: 'lion',
  },
  {
    id: 'story-4',
    nativeSnippet: 'हाथी',
    transliterationSnippet: 'haathi',
    meaningSnippet: 'elephant',
  },
];

test.describe('Level 5 stories (Lion and Elephant)', () => {
  let app: AppShellPage;
  let level: LevelPage;
  let lesson: LessonPage;
  let settings: SettingsPage;

  test.beforeEach(async ({ page }) => {
    app = new AppShellPage(page);
    level = new LevelPage(page);
    lesson = new LessonPage(page);
    settings = new SettingsPage(page);
  });

  test('Punjabi level 5 lists all four stories in order', async ({ page }, testInfo) => {
    await level.goto(5);
    await level.expectLoaded(5);

    await expect(level.lessonCells).toHaveCount(PUNJABI_STORY_TITLES.length);
    for (let i = 0; i < PUNJABI_STORY_TITLES.length; i++) {
      await expect(level.lessonCell(i).locator('.cell-badge')).toHaveText('Story');
      await expect(level.lessonCell(i).locator('.cell-native')).toHaveText(
        PUNJABI_STORY_TITLES[i],
      );
    }

    await screenshot(page, testInfo, 'level-5-punjabi-stories');
  });

  test('Punjabi story-3 (Lion) opens with Story badge and working toggles', async ({
    page,
  }, testInfo) => {
    const story = PUNJABI_STORIES[0];
    await lesson.goto(story.id);
    await lesson.expectLoaded();

    await expect(lesson.typeBadge).toHaveText('Story');
    await expect(lesson.nativeText).toContainText(story.nativeSnippet);

    await expect(lesson.transliterationText).toHaveCount(0);
    await lesson.transliterationToggle.click();
    await expect(lesson.transliterationToggle).toHaveText('Hide Transliteration');
    await expect(lesson.transliterationText).toBeVisible();
    await expect(lesson.transliterationText).toContainText(story.transliterationSnippet);

    await expect(lesson.meaningText).toHaveCount(0);
    await lesson.meaningToggle.click();
    await expect(lesson.meaningToggle).toHaveText('Hide Meaning');
    await expect(lesson.meaningText).toBeVisible();
    await expect(lesson.meaningText).toContainText(story.meaningSnippet);

    await screenshot(page, testInfo, 'lesson-story-3-punjabi');
  });

  test('Punjabi story-4 (Elephant) opens with Story badge and working toggles', async ({
    page,
  }, testInfo) => {
    const story = PUNJABI_STORIES[1];
    await lesson.goto(story.id);
    await lesson.expectLoaded();

    await expect(lesson.typeBadge).toHaveText('Story');
    await expect(lesson.nativeText).toContainText(story.nativeSnippet);

    await expect(lesson.transliterationText).toHaveCount(0);
    await lesson.transliterationToggle.click();
    await expect(lesson.transliterationText).toBeVisible();
    await expect(lesson.transliterationText).toContainText(story.transliterationSnippet);

    await expect(lesson.meaningText).toHaveCount(0);
    await lesson.meaningToggle.click();
    await expect(lesson.meaningText).toBeVisible();
    await expect(lesson.meaningText).toContainText(story.meaningSnippet);

    await screenshot(page, testInfo, 'lesson-story-4-punjabi');
  });

  test('switching course to Hindi and reloading shows the same four stories', async ({
    page,
  }) => {
    // Start in Punjabi, switch the course via Settings, then reload the level.
    await level.goto(5);
    await level.expectLoaded(5);

    await settings.goto();
    await settings.expectLoaded();
    await settings.hindiRadio.check();
    await expect(app.navLogo).toHaveText('Hindi Reading App');
    await expect(app.localStorageItem('selected-language')).resolves.toBe('hindi');

    await level.goto(5);
    await page.reload();
    await level.expectLoaded(5);

    await expect(level.lessonCells).toHaveCount(HINDI_STORY_TITLES.length);
    for (let i = 0; i < HINDI_STORY_TITLES.length; i++) {
      await expect(level.lessonCell(i).locator('.cell-badge')).toHaveText('Story');
      await expect(level.lessonCell(i).locator('.cell-native')).toHaveText(
        HINDI_STORY_TITLES[i],
      );
    }
  });

  test('Hindi story-3 and story-4 open with Hindi text and working toggles', async ({
    page,
  }) => {
    for (const story of HINDI_STORIES) {
      await page.goto(`/lesson/${story.id}?lang=hi`);
      await lesson.expectLoaded();

      await expect(app.appContent).toHaveAttribute('lang', 'hi');
      await expect(lesson.typeBadge).toHaveText('Story');
      await expect(lesson.nativeText).toContainText(story.nativeSnippet);

      await expect(lesson.transliterationText).toHaveCount(0);
      await lesson.transliterationToggle.click();
      await expect(lesson.transliterationText).toBeVisible();
      await expect(lesson.transliterationText).toContainText(
        story.transliterationSnippet,
      );

      await expect(lesson.meaningText).toHaveCount(0);
      await lesson.meaningToggle.click();
      await expect(lesson.meaningText).toBeVisible();
      await expect(lesson.meaningText).toContainText(story.meaningSnippet);
    }
  });
});
