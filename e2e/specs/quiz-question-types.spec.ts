import { test, expect } from '@playwright/test';
import { QuizPage } from '../pages/quiz.page';
import { loadQuizJson, type QuizQuestionJson } from '../utils/quiz-data';

/**
 * Verifies the non-multiple-choice question types actually render and can be
 * answered: sentence fill-blank (level 3), paragraph multi-blank (level 4)
 * and story sequencing (level 5).
 *
 * Questions are shuffled at runtime, so the displayed question is identified
 * from the page itself and matched back to the JSON to learn the correct
 * options.
 */
const CASES: Array<{
  level: number;
  quizNumber: number;
  describe: string;
}> = [
  { level: 3, quizNumber: 1, describe: 'sentence fill-blank question' },
  { level: 4, quizNumber: 1, describe: 'paragraph multi-blank question' },
  { level: 5, quizNumber: 2, describe: 'story sequence question' },
];

test.describe('Question types across levels', () => {
  let quiz: QuizPage;

  test.beforeEach(async ({ page }) => {
    quiz = new QuizPage(page);
  });

  for (const testCase of CASES) {
    test(`answers a ${testCase.describe}`, async ({ page }) => {
      const quizJson = loadQuizJson(testCase.level, testCase.quizNumber);

      await quiz.goto(testCase.level, testCase.quizNumber);
      await quiz.expectQuestionLoaded();

      if (testCase.level === 3) {
        const hint = (await quiz.sentenceHint.innerText()).trim();
        const question = identifySentenceQuestion(hint, quizJson.questions);
        await answerSentence(quiz, question);
      } else if (testCase.level === 4) {
        await expect(quiz.blankInstruction).toContainText('Fill blank 1 of');
        const displayed = await quiz.nativeParagraph.innerText();
        const question = identifyParagraphQuestion(
          displayed,
          quizJson.questions,
        );
        await answerParagraph(quiz, question);
      } else if (testCase.level === 5) {
        await expect(quiz.storyLines.first()).toBeVisible();
        const question = quizJson.questions[0];
        await answerStory(quiz, question);
      }
      void page;
    });
  }
});

/** Sentence questions are identified by their unique transliteration hint. */
function identifySentenceQuestion(
  hint: string,
  questions: QuizQuestionJson[],
): QuizQuestionJson {
  const match = questions.find((q) => q.transliteration === hint);
  if (!match) throw new Error(`No sentence question matches hint "${hint}"`);
  return match;
}

/** Paragraph questions are identified by their text with blanks removed. */
function identifyParagraphQuestion(
  displayedText: string,
  questions: QuizQuestionJson[],
): QuizQuestionJson {
  const normalize = (s: string) => s.replace(/\s+/g, ' ').trim();
  const displayed = normalize(displayedText.replace(/_+/g, ' '));
  const match = questions.find((q) => {
    const expected = normalize(
      (q.paragraph ?? '').replace(/\{\{blank\d+\}\}/g, ' '),
    );
    return expected === displayed;
  });
  if (!match) {
    throw new Error(`No paragraph question matches text "${displayed}"`);
  }
  return match;
}

async function answerSentence(
  quiz: QuizPage,
  question: QuizQuestionJson,
): Promise<void> {
  const wrong = question.options!.find(
    (_, i) => i !== question.correctAnswerIndex,
  )!;
  await quiz.enabledOptionByText(wrong).click();
  await expect(quiz.feedback).toContainText('Try again');

  const correct = question.options![question.correctAnswerIndex!];
  await quiz.enabledOptionByText(correct).click();
  await expect(quiz.feedback).toHaveClass(/correct/);
}

async function answerParagraph(
  quiz: QuizPage,
  question: QuizQuestionJson,
): Promise<void> {
  const blanks = question.blanks!;
  for (let b = 0; b < blanks.length; b++) {
    await expect(quiz.blankInstruction).toContainText(
      `Fill blank ${b + 1} of ${blanks.length}`,
    );

    // Wrong pick disables the option and keeps the same blank.
    const wrong = blanks[b].options.find(
      (_, i) => i !== blanks[b].correctAnswerIndex,
    )!;
    await quiz.enabledOptionByText(wrong).click();
    await expect(quiz.enabledOptions().filter({ hasText: exact(wrong) })).toHaveCount(0);

    const correct = blanks[b].options[blanks[b].correctAnswerIndex];
    await quiz.enabledOptionByText(correct).click();
  }
  // Last blank completes the question; feedback shows then auto-advances.
  await expect(quiz.feedback).toHaveClass(/correct/);
}

async function answerStory(
  quiz: QuizPage,
  question: QuizQuestionJson,
): Promise<void> {
  const count = question.lines!.length;
  // First submit a wrong sequence to exercise the retry path.
  await quiz.page.locator('select#position-0').selectOption({ label: '2' });
  await quiz.page.locator('select#position-1').selectOption({ label: '1' });
  for (let i = 2; i < count; i++) {
    await quiz.page
      .locator(`select#position-${i}`)
      .selectOption({ label: String(i + 1) });
  }
  await quiz.submitButton.click();
  await expect(quiz.feedback).toContainText('Try again');

  await quiz.retryButton.click();

  // Now submit the correct order: line i belongs in position i+1.
  await quiz.answerStoryQuestion(question);
}

function exact(text: string): RegExp {
  return new RegExp(`^${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`);
}
