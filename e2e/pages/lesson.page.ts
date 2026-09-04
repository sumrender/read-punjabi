import { type Page, type Locator, expect } from '@playwright/test';

export class LessonPage {
  readonly page: Page;
  readonly stage: Locator;
  readonly backButton: Locator;
  readonly typeBadge: Locator;
  readonly nativeText: Locator;
  readonly transliterationText: Locator;
  readonly meaningText: Locator;
  readonly transliterationToggle: Locator;
  readonly meaningToggle: Locator;
  readonly prevFab: Locator;
  readonly nextFab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.stage = page.locator('main.lesson-stage');
    this.backButton = page.locator('.stage-top .back-button');
    this.typeBadge = page.locator('.lesson-type-badge');
    this.nativeText = page.locator('.native-text');
    this.transliterationText = page.locator('.transliteration-text');
    this.meaningText = page.locator('.meaning-text');
    this.transliterationToggle = page.locator(
      '.toggle-button',
      { hasText: /Transliteration/ },
    );
    this.meaningToggle = page.locator('.toggle-button', { hasText: /Meaning/ });
    this.prevFab = page.locator('.nav-fab.prev-fab');
    this.nextFab = page.locator('.nav-fab.next-fab');
  }

  async goto(lessonId: string): Promise<void> {
    await this.page.goto(`/lesson/${lessonId}`);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.stage).toBeVisible();
    await expect(this.nativeText).toBeVisible();
  }
}
