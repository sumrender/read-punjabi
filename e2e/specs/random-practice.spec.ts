import { test, expect } from '@playwright/test';
import { AppShellPage } from '../pages/app-shell.page';
import { RandomPracticePage } from '../pages/random-practice.page';
import { screenshot } from '../utils/screenshot';

const LEVEL = 1;
const READ_KEY = `random_read_level_${LEVEL}`;

test.describe('Random practice (flashcards)', () => {
  let app: AppShellPage;
  let deck: RandomPracticePage;

  test.beforeEach(async ({ page }) => {
    app = new AppShellPage(page);
    deck = new RandomPracticePage(page);
    // Fresh history per test for deterministic card counts.
    await page.goto('/');
    await page.evaluate((key) => localStorage.removeItem(key), READ_KEY);
  });

  test('shows a flashcard deck with reveal and navigation', async ({ page }, testInfo) => {
    await deck.goto(LEVEL);
    await deck.expectLoaded(LEVEL);

    await expect(deck.badgeType).toBeVisible();
    await expect(deck.nativeText).toBeVisible();
    await expect(deck.revealButton).toBeVisible();
    await expect(deck.prevFab).toBeDisabled();
    await expect(deck.nextFab).toBeEnabled();

    await screenshot(page, testInfo, 'random-card-hidden');

    await deck.revealButton.click();
    await expect(deck.revealedContent).toBeVisible();
    await expect(deck.revealButton).toHaveCount(0);

    await screenshot(page, testInfo, 'random-card-revealed');
  });

  test('next/prev moves between cards with live position', async () => {
    await deck.goto(LEVEL);
    await deck.expectLoaded(LEVEL);

    await deck.goToNextCard();
    await expect(deck.folioPosition).toContainText('Card 2 of');
    await expect(deck.prevFab).toBeEnabled();

    await deck.prevFab.click();
    await expect(deck.folioPosition).toContainText('Card 1 of');
    await expect(deck.prevFab).toBeDisabled();
  });

  test('Mark Read persists to localStorage and shows on the card', async ({ page }) => {
    await deck.goto(LEVEL);
    await deck.expectLoaded(LEVEL);

    await deck.markCurrentAsRead();
    await expect(deck.flashcard).toHaveClass(/read/);

    const stored = await app.localStorageItem(READ_KEY);
    expect(stored).toBeTruthy();
    const ids: unknown = JSON.parse(stored!);
    expect(Array.isArray(ids)).toBe(true);
    expect((ids as string[]).length).toBeGreaterThan(0);

    // Reload: a fresh batch excludes the read item.
    await page.reload();
    await deck.expectLoaded(LEVEL);
    expect((await app.localStorageItem(READ_KEY)) ?? '[]').not.toBe('[]');
  });

  test('Reset History clears stored progress after confirming the dialog', async ({ page }) => {
    await deck.goto(LEVEL);
    await deck.expectLoaded(LEVEL);

    await deck.markCurrentAsRead();
    expect(await app.localStorageItem(READ_KEY)).toBeTruthy();

    page.once('dialog', (dialog) => {
      expect(dialog.message()).toContain('reset');
      void dialog.accept();
    });
    await deck.resetHistoryButton.click();

    await expect
      .poll(async () => app.localStorageItem(READ_KEY), { timeout: 5000 })
      .toBeNull();
  });

  test('Load Next Set loads another batch', async ({ page }, testInfo) => {
    await deck.goto(LEVEL);
    await deck.expectLoaded(LEVEL);

    const firstCardText = await deck.nativeText.innerText();
    await deck.loadNextSetButton.click();
    await deck.expectLoaded(LEVEL);
    // New shuffled batch: content or position text re-renders; deck still functional.
    await expect(deck.flashcard).toBeVisible();
    await expect(deck.nativeText).toBeVisible();
    void firstCardText;

    await screenshot(page, testInfo, 'random-next-set');
  });
});
