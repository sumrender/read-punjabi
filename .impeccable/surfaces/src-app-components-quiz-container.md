---
version: 1
slug: "src-app-components-quiz-container"
primary_target: "src/app/components/quiz-container"
related_targets: ["src/app/components/multiple-choice-question","src/app/components/fill-blank-question","src/app/components/multiple-blanks-question","src/app/components/story-sequence-question"]
---

# Surface brief — Quiz flow (quiz-container + 4 question components, `/quiz/:level/:quizNumber`)

## Scope and visitor mode

Whole-surface redesign across quiz-container, multiple-choice, fill-blank, multiple-blanks,
and story-sequence, inside the established workbook world. Mode: **Operate** — a learner
answers a graded quiz one question at a time.

## Audience, job, action, proof, constraints

- Audience: learners self-testing after a lesson, phone-first, may retry freely.
- Job: show position and score, present one question clearly, answer targets obvious.
- Proof: real quiz content from repo JSON.
- Constraints: behavior frozen — question-component contracts (QuestionOutput, disabled
  options, showFeedback, story submit/retry/reset), progress/score/exit logic, ViewContainerRef
  mounting. ARIA/live-region feedback preserved.

## Chosen direction and memorable moment

**The Test Paper** (dealt index 3, seed key 550b2b01, code-led). The quiz is a numbered
exercise sheet: a paper header ("Question 4 of 10" with score as a margin tally and a printed
Stop action), the prompt set large on the sheet, answer targets as ruled write-in rows and
boxed options that fill with ink when chosen. Story sequencing renders as numbered slip rows.
Memorable moment: the sheet's paper header — tally marks and question count like a real exam
paper, not an app progress bar.

## Unresolved decisions

None. Copy stays product-truth ("Correct!", "Try again", quiz titles).

## Direction contract

THESIS: The quiz is a numbered exercise sheet, not an app screen — paper header with question count and score tally, one question set large on the sheet, answer targets as ruled boxes that fill with ink. It refuses progress bars, floating chrome, and boxed-card layouts.
OWN-WORLD: The page itself is the sheet: printed header row (Exercise title, "Question 4 of 10", score tally with authored tally strokes, printed Stop) over a hairline rule; prompt as headline; options as 12px ruled tiles that fill verdict ink when chosen; blanks as ruled write-in lines; story sequence as numbered slip rows with position selectors; margin notes echo verdicts in 10% washes.
STORY: "I am sitting a short exercise; I always know where I am and how I'm doing."
FIRST VIEWPORT: Header row, hairline rule, prompt headline, answer targets — everything above the fold on mobile.
FORM: Dealt index 3 of 7, seed key 550b2b01, code-led.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
