import { test, expect } from '@playwright/test';
import { AppShellPage } from '../pages/app-shell.page';
import { LevelPage } from '../pages/level.page';
import { screenshot } from '../utils/screenshot';

test.describe('Level pages (lesson list)', () => {
  let app: AppShellPage;
  let level: LevelPage;

  test.beforeEach(async ({ page }) => {
    app = new AppShellPage(page);
    level = new LevelPage(page);
  });

  for (let l = 1; l <= 5; l++) {
    test(`level ${l} lists lessons, exercises and practice`, async ({ page }, testInfo) => {
      await level.goto(l);
      await level.expectLoaded(l);
      await expect(level.practiceButton).toBeVisible();
      await expect(level.exerciseRows.first()).toBeVisible();

      if (l === 1) {
        await screenshot(page, testInfo, `level-${l}`);
      }
    });
  }

  test('lesson cell navigates to the lesson viewer', async ({ page }) => {
    await level.goto(1);
    await level.expectLoaded(1);
    await level.lessonCell(0).click();
    await expect(page).toHaveURL(/\/lesson\//);
  });

  test('exercise row navigates to the quiz', async ({ page }) => {
    await level.goto(1);
    await level.expectLoaded(1);
    await level.exerciseRow(0).click();
    await expect(page).toHaveURL(/\/quiz\/1\/\d+\/active$/);
  });

  test('Random Practice button navigates to random practice', async ({ page }) => {
    await level.goto(1);
    await level.expectLoaded(1);
    await level.practiceButton.click();
    await expect(page).toHaveURL(/\/level\/1\/random$/);
  });

  test('unknown level redirects home', async ({ page }) => {
    await page.goto('/level/99');
    await expect(page).toHaveURL(/\/$/);
  });

  test('back button returns home', async ({ page }) => {
    await level.goto(2);
    await level.expectLoaded(2);
    await level.backButton.click();
    await expect(page).toHaveURL(/\/$/);
  });
});
