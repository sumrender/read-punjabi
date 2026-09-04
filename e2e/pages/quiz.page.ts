import { type Page, type Locator, expect } from '@playwright/test';
import type { QuizQuestionJson } from '../utils/quiz-data';

/**
 * Drives the quiz flow. Questions are shuffled at runtime, so correct options
 * are matched by text taken from the quiz JSON on disk.
 */
export class QuizPage {
  readonly page: Page;
  readonly sheet: Locator;
  readonly loadingState: Locator;
  readonly errorState: Locator;
  readonly questionCount: Locator;
  readonly scoreLine: Locator;
  readonly stopButton: Locator;
  readonly prompt: Locator;
  readonly optionButtons: Locator;
  readonly feedback: Locator;
  readonly nativeSentence: Locator;
  readonly sentenceHint: Locator;
  readonly nativeParagraph: Locator;
  readonly blankInstruction: Locator;
  readonly storyLines: Locator;
  readonly submitButton: Locator;
  readonly retryButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sheet = page.locator('.quiz-sheet');
    this.loadingState = page.locator('.quiz-sheet .sheet-state');
    this.errorState = page.locator('.quiz-sheet .sheet-state', {
      has: page.locator('.button-primary'),
    });
    this.questionCount = page.locator('.question-count');
    this.scoreLine = page.locator('.score-line');
    this.stopButton = page.locator('.stop-btn');
    this.prompt = page.locator('.prompt h2');
    this.optionButtons = page.locator('.option-btn');
    this.feedback = page.locator('.feedback-message');
    this.nativeSentence = page.locator('.native-sentence');
    this.sentenceHint = page.locator('.sentence-display .hint');
    this.nativeParagraph = page.locator('.native-paragraph');
    this.blankInstruction = page.locator('.sheet-instruction p');
    this.storyLines = page.locator('.story-line');
    this.submitButton = page.locator('.submit-btn');
    this.retryButton = page.locator('.retry-btn');
  }

  async goto(level: number, quizNumber: number): Promise<void> {
    await this.page.goto(`/quiz/${level}/${quizNumber}/active`);
  }

  async expectQuestionLoaded(): Promise<void> {
    await expect(this.questionCount).toContainText('Question 1 of');
    await expect(this.stopButton).toBeVisible();
  }

  async expectScore(expectedScore: number): Promise<void> {
    await expect(this.scoreLine).toHaveAttribute(
      'aria-label',
      `Score: ${expectedScore} correct`,
    );
  }

  /** Picks the option with the given text (by JSON correct answer). */
  async pickCorrectOptionByPrompt(
    question: QuizQuestionJson,
    text: string,
  ): Promise<void> {
    void question;
    await this.optionButtons.filter({ hasText: exact(text) }).first().click();
  }

  /**
   * Answers a single-blank style question (sentence) by trial: wrong options
   * get disabled, the correct one shows "Correct!" feedback.
   */
  async answerSingleChoiceByTrial(): Promise<void> {
    for (let attempt = 0; attempt < 4; attempt++) {
      await this.enabledOptions().first().click();
      try {
        await expect(this.feedback).toHaveClass(/correct/, { timeout: 1500 });
        return;
      } catch {
        await expect(this.feedback).toContainText('Try again');
      }
    }
    throw new Error('Failed to answer question within attempt budget');
  }

  /**
   * Answers the currently displayed paragraph blank by trial. Resolves once
   * the instruction advances to the next blank (or the question completes).
   */
  async fillCurrentBlankByTrial(): Promise<void> {
    const before = await this.blankInstruction.innerText();
    for (let attempt = 0; attempt < 4; attempt++) {
      await this.enabledOptions().first().click();
      try {
        await expect(this.blankInstruction).not.toHaveText(before, {
          timeout: 2500,
        });
        return;
      } catch {
        // Wrong pick: option disabled, instruction unchanged — try next.
      }
    }
    throw new Error('No option advanced the paragraph blank');
  }

  /** Assigns story lines to their original positions and submits. */
  async answerStoryQuestion(question: QuizQuestionJson): Promise<void> {
    const count = question.lines!.length;
    for (let i = 0; i < count; i++) {
      await this.page
        .locator(`select#position-${i}`)
        .selectOption({ label: String(i + 1) });
    }
    await this.submitButton.click();
    await expect(this.feedback).toHaveClass(/correct/);
  }

  enabledOptions(): Locator {
    return this.page.locator('.option-btn:not([disabled]):not(.disabled)');
  }

  /** First enabled option whose visible text equals `text`. */
  enabledOptionByText(text: string): Locator {
    return this.enabledOptions().filter({ hasText: exact(text) }).first();
  }
}

function exact(text: string): RegExp {
  return new RegExp(`^${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`);
}
