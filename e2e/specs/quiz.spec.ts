import { test, expect } from '@playwright/test';
import { LevelPage } from '../pages/level.page';
import { QuizPage } from '../pages/quiz.page';
import { QuizResultsPage } from '../pages/quiz-results.page';
import { loadQuizJson, type QuizQuestionJson } from '../utils/quiz-data';
import { screenshot } from '../utils/screenshot';

const LEVEL = 1;
const QUIZ_NUMBER = 1;
const quizJson = loadQuizJson(LEVEL, QUIZ_NUMBER);

function questionByPrompt(prompt: string): QuizQuestionJson {
  const match = quizJson.questions.find((q) => q.prompt === prompt);
  if (!match) {
    throw new Error(`No question found in JSON for prompt "${prompt}"`);
  }
  return match;
}

test.describe('Quiz flow (level 1, quiz 1 — 15 alphabet questions)', () => {
  let level: LevelPage;
  let quiz: QuizPage;
  let results: QuizResultsPage;

  test.beforeEach(async ({ page }) => {
    level = new LevelPage(page);
    quiz = new QuizPage(page);
    results = new QuizResultsPage(page);
  });

  test('complete quiz with all correct answers and reach 15/15', async ({ page }, testInfo) => {
    // Prompts must be unique so runtime-shuffled questions can be matched to JSON.
    const prompts = quizJson.questions.map((q) => q.prompt);
    expect(new Set(prompts).size).toBe(prompts.length);

    await quiz.goto(LEVEL, QUIZ_NUMBER);
    await quiz.expectQuestionLoaded();

    for (let i = 0; i < quizJson.questions.length; i++) {
      await expect(quiz.questionCount).toContainText(
        `Question ${i + 1} of ${quizJson.questions.length}`,
      );
      await quiz.expectScore(i);

      const prompt = (await quiz.prompt.innerText()).trim();
      const question = questionByPrompt(prompt);
      const correctText = question.options![question.correctAnswerIndex!];

      await quiz.optionButtons.filter({ hasText: exact(correctText) }).first().click();
      await expect(quiz.feedback).toHaveClass(/correct/);

      if (i === 0) {
        await screenshot(page, testInfo, 'quiz-first-correct');
      }

      if (i < quizJson.questions.length - 1) {
        // Auto-advance fires after 1s; the progress counter updates ~100ms
        // before the next question component renders, so wait for the prompt
        // to actually change before continuing.
        await page.waitForFunction(
          ([selector, previous]) => {
            const el = document.querySelector(selector as string);
            return (
              el !== null &&
              (el.textContent ?? '').trim() !== (previous as string)
            );
          },
          ['.prompt h2', prompt],
          { timeout: 7000 },
        );
      }
    }

    await page.waitForURL(new RegExp(`/quiz/${LEVEL}/${QUIZ_NUMBER}/results$`));
    await results.expectLoaded(quizJson.questions.length, quizJson.questions.length);
    await expect(results.gradeStamp).toHaveText('Excellent!');
    await expect(results.markerComment).toContainText('Excellent');

    await screenshot(page, testInfo, 'quiz-results-perfect');
  });

  test('wrong answer shows Try again and disables the option', async ({ page }, testInfo) => {
    await quiz.goto(LEVEL, QUIZ_NUMBER);
    await quiz.expectQuestionLoaded();

    const prompt = (await quiz.prompt.innerText()).trim();
    const question = questionByPrompt(prompt);
    const correctText = question.options![question.correctAnswerIndex!];
    const wrongText = question.options!.find((opt) => opt !== correctText)!;

    await quiz.optionButtons.filter({ hasText: exact(wrongText) }).first().click();
    await expect(quiz.feedback).toContainText('Try again');
    await expect(
      quiz.optionButtons.filter({ hasText: exact(wrongText) }).first(),
    ).toBeDisabled();

    await screenshot(page, testInfo, 'quiz-wrong-answer');

    // Correcting yourself still works after a wrong attempt.
    await quiz.optionButtons.filter({ hasText: exact(correctText) }).first().click();
    await expect(quiz.feedback).toHaveClass(/correct/);
    await expect(quiz.questionCount).toContainText('Question 1 of');
  });

  test('Stop button exits to the level page', async ({ page }) => {
    await quiz.goto(LEVEL, QUIZ_NUMBER);
    await quiz.expectQuestionLoaded();
    await quiz.stopButton.click();
    await expect(page).toHaveURL(new RegExp(`/level/${LEVEL}$`));
  });

  test('invalid level shows error state with Back to Lessons', async ({ page }, testInfo) => {
    await page.goto('/quiz/99/1/active');
    await expect(quiz.sheet).toContainText('Invalid quiz level');
    await expect(page.locator('.sheet-state .button-primary')).toBeVisible();

    await screenshot(page, testInfo, 'quiz-invalid-level');

    await page.locator('.sheet-state .button-primary').click();
    await expect(page).toHaveURL(/\/level\/99$/);
  });

  test('missing quiz file shows failure state', async ({ page }) => {
    await page.goto('/quiz/1/99/active');
    await expect(quiz.sheet).toContainText('Failed to load quiz');
  });

  test('results page directly renders zero state without completing', async ({ page }, testInfo) => {
    await results.goto(LEVEL, QUIZ_NUMBER);
    await results.expectLoaded(0, 15);
    await expect(results.gradeStamp).toHaveText('Keep learning');

    await screenshot(page, testInfo, 'quiz-results-empty-state');

    await results.backToLessonsButton.click();
    await expect(page).toHaveURL(new RegExp(`/level/${LEVEL}$`));
  });

  test('retry quiz restarts at question 1 of the active quiz', async ({ page }) => {
    await results.goto(LEVEL, QUIZ_NUMBER);
    await results.expectLoaded(0, 15);
    await results.retryButton.click();

    await expect(page).toHaveURL(new RegExp(`/quiz/${LEVEL}/${QUIZ_NUMBER}/active$`));
    await quiz.expectQuestionLoaded();
  });

  test('level page exercise rows launch the right quiz', async ({ page }) => {
    await level.goto(LEVEL);
    await level.expectLoaded(LEVEL);
    await level.exerciseRow(0).click();
    await expect(page).toHaveURL(new RegExp(`/quiz/${LEVEL}/1/active$`));
    await quiz.expectQuestionLoaded();
  });
});

function exact(text: string): RegExp {
  return new RegExp(`^${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`);
}
