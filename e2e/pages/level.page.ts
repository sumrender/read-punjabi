import { type Page, type Locator, expect } from '@playwright/test';

export class LevelPage {
  readonly page: Page;
  readonly backButton: Locator;
  readonly unitTitle: Locator;
  readonly unitNumeral: Locator;
  readonly lessonCells: Locator;
  readonly exerciseRows: Locator;
  readonly practiceButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backButton = page.locator('.unit-top .back-button');
    this.unitTitle = page.locator('.unit-title');
    this.unitNumeral = page.locator('.unit-numeral');
    this.lessonCells = page.locator('.specimen-cell');
    this.exerciseRows = page.locator('.exercise-row');
    this.practiceButton = page.locator('.unit-practice');
  }

  async goto(level: number): Promise<void> {
    await this.page.goto(`/level/${level}`);
  }

  async expectLoaded(level: number): Promise<void> {
    await expect(this.unitTitle).toBeVisible();
    await expect(this.unitNumeral).toHaveText(String(level));
    await expect(this.lessonCells.first()).toBeVisible();
  }

  lessonCell(index: number): Locator {
    return this.lessonCells.nth(index);
  }

  exerciseRow(index: number): Locator {
    return this.exerciseRows.nth(index);
  }
}
