import { type Page, type Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly subtitle: Locator;
  readonly chapterLinks: Locator;
  readonly beginButton: Locator;
  readonly specimen: Locator;
  readonly specimenDots: Locator;
  readonly pageBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('main.home-container h1');
    this.subtitle = page.locator('.subtitle');
    this.chapterLinks = page.locator('.chapter-link');
    this.beginButton = page.locator('a.begin-button');
    this.specimen = page.locator('.specimen');
    this.specimenDots = page.locator('.specimen-dot');
    this.pageBadge = page.locator('.page-badge');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  chapterLink(level: number): Locator {
    // Angular strips the routerLink attribute from the rendered DOM — href survives.
    return this.page.locator(`.chapter-link[href="/level/${level}"]`);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible();
    await expect(this.chapterLinks).toHaveCount(5);
  }
}
