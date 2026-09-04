import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export interface QuizOptionBlank {
  blankId: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface QuizQuestionJson {
  id: string;
  level: number;
  type: 'alphabet' | 'word' | 'sentence' | 'paragraph' | 'story';
  prompt?: string;
  sentence?: string;
  paragraph?: string;
  transliteration?: string;
  options?: string[];
  correctAnswerIndex?: number;
  blanks?: QuizOptionBlank[];
  lines?: string[];
}

export interface QuizJson {
  id: string;
  level: number;
  quizNumber: number;
  title: string;
  questions: QuizQuestionJson[];
}

export function loadQuizJson(
  level: number,
  quizNumber: number,
  language: 'punjabi' | 'hindi' = 'punjabi',
): QuizJson {
  const file = join(
    process.cwd(),
    'src',
    'assets',
    language,
    'quizzes',
    `level-${level}-quiz-${quizNumber}.json`,
  );
  return JSON.parse(readFileSync(file, 'utf8')) as QuizJson;
}

/** The answer text (option label) that is correct for a multiple-choice style question. */
export function correctOptionText(question: QuizQuestionJson): string {
  if (question.options === undefined || question.correctAnswerIndex === undefined) {
    throw new Error(`Question ${question.id} has no single correct option`);
  }
  return question.options[question.correctAnswerIndex];
}

/** The option text that is deliberately wrong, for wrong-answer tests. */
export function wrongOptionText(question: QuizQuestionJson): string {
  if (question.options === undefined || question.correctAnswerIndex === undefined) {
    throw new Error(`Question ${question.id} has no single correct option`);
  }
  const wrong = question.options.findIndex((_, i) => i !== question.correctAnswerIndex);
  return question.options[wrong];
}
