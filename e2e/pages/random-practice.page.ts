import { type Page, type Locator, expect } from '@playwright/test';

export class RandomPracticePage {
  readonly page: Page;
  readonly deckPage: Locator;
  readonly heading: Locator;
  readonly folioPosition: Locator;
  readonly flashcard: Locator;
  readonly badgeType: Locator;
  readonly nativeText: Locator;
  readonly revealButton: Locator;
  readonly revealedContent: Locator;
  readonly readToggle: Locator;
  readonly readToggleInput: Locator;
  readonly prevFab: Locator;
  readonly nextFab: Locator;
  readonly loadNextSetButton: Locator;
  readonly resetHistoryButton: Locator;
  readonly finishedPlate: Locator;

  constructor(page: Page) {
    this.page = page;
    this.deckPage = page.locator('main.deck-page');
    this.heading = page.locator('.deck-folio h1');
    this.folioPosition = page.locator('.folio-position');
    this.flashcard = page.locator('.flashcard');
    this.badgeType = page.locator('.badge-type');
    this.nativeText = page.locator('.flashcard .native-text');
    this.revealButton = page.locator('.reveal-button');
    this.revealedContent = page.locator('.revealed-content');
    this.readToggle = page.locator('.read-toggle');
    this.readToggleInput = page.locator('.read-toggle input[type="checkbox"]');
    this.prevFab = page.locator('.nav-fab.prev-fab');
    this.nextFab = page.locator('.nav-fab.next-fab');
    this.loadNextSetButton = page.locator('.bottom-actions .text-button', {
      hasText: 'Load Next Set',
    });
    this.resetHistoryButton = page.locator('.bottom-actions .text-button', {
      hasText: 'Reset History',
    });
    this.finishedPlate = page.locator('.finished-plate');
  }

  async goto(level: number): Promise<void> {
    await this.page.goto(`/level/${level}/random`);
  }

  async expectLoaded(level: number): Promise<void> {
    await expect(this.heading).toHaveText(`Level ${level} Practice`);
    await expect(this.flashcard).toBeVisible();
    await expect(this.folioPosition).toContainText('Card 1 of');
  }

  async markCurrentAsRead(): Promise<void> {
    // The checkbox input is display:none (custom checkmark) — click the label.
    await this.readToggle.click();
    await expect(this.readToggleInput).toBeChecked();
  }

  async goToNextCard(): Promise<void> {
    const before = await this.folioPosition.innerText();
    await this.nextFab.click();
    await expect(this.folioPosition).not.toHaveText(before);
  }
}
