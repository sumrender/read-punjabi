import { type Page, type Locator, expect } from '@playwright/test';

export class QuizResultsPage {
  readonly page: Page;
  readonly resultsPage: Locator;
  readonly gradeStamp: Locator;
  readonly paperTitle: Locator;
  readonly scoreNumber: Locator;
  readonly scoreTotal: Locator;
  readonly scorePercentage: Locator;
  readonly markerComment: Locator;
  readonly retryButton: Locator;
  readonly backToLessonsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.resultsPage = page.locator('.results-page');
    this.gradeStamp = page.locator('.grade-stamp');
    this.paperTitle = page.locator('.paper-title');
    this.scoreNumber = page.locator('.score-number');
    this.scoreTotal = page.locator('.score-total');
    this.scorePercentage = page.locator('.score-percentage');
    this.markerComment = page.locator('.marker-comment');
    this.retryButton = page.locator('.btn-retry');
    this.backToLessonsButton = page.locator('.btn-lessons');
  }

  async goto(level: number, quizNumber: number): Promise<void> {
    await this.page.goto(`/quiz/${level}/${quizNumber}/results`);
  }

  async expectLoaded(score: number, total: number): Promise<void> {
    await expect(this.resultsPage).toBeVisible();
    await expect(this.paperTitle).toHaveText('Quiz Complete!');
    await expect(this.scoreNumber).toHaveText(String(score));
    await expect(this.scoreTotal).toHaveText(`/ ${total}`);
    await expect(this.scorePercentage).toContainText('% First-Try Accuracy');
  }
}
