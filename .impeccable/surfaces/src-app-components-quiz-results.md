---
version: 1
slug: "src-app-components-quiz-results"
primary_target: "src/app/components/quiz-results"
related_targets: []
---

# Surface brief — Quiz results (`/quiz/:level/:quizNumber/results`, src/app/components/quiz-results)

## Scope and visitor mode

Whole-surface redesign inside the established workbook world. Mode: **Operate** — a learner
reads their verdict and chooses retry or exit.

## Audience, job, action, proof, constraints

- Audience: learner just finished a quiz, emotionally invested in the verdict.
- License: DESIGN.md sanctions celebration here (gold ring, gradient wash) as the honest
  final beat — keep it, but the graded-paper form replaces the trophy-modal arrangement.
- Constraints: behavior frozen (retryQuiz, backToLessons, performanceLevel tiers exactly
  excellent/great/good/needs-practice with existing copy via message()).

## Chosen direction and memorable moment

**The Graded Paper** (dealt index 4 leads, seed key 550b2b01, code-led). The worksheet
returned and marked in pen: the score fraction set huge mid-sheet, circled in the tier's pen
color (gold/green/blue/orange); an angled grade stamp ("Excellent!") top-right; the message
as the teacher's one-line comment on a ruled line; retry/back as printed actions at the foot.
Memorable moment: the circled score — hand-marked, not a progress ring.

## Unresolved decisions

None. The existing score-display, message copy, and tier system are product truth.

## Direction contract

THESIS: The results are the worksheet returned, marked in pen — circled score, angled grade stamp, teacher's comment. It refuses the trophy-modal and every emoji.
OWN-WORLD: The results card (24px, Float shadow, tier ring) becomes the marked sheet: score fraction huge in tabular numerals, hand-marked SVG ellipse circling it in the tier's pen color; rotated stamp top-right (3px tier border, uppercase, -6deg); the message on a ruled line as the marker's comment; "First-Try Accuracy" printed beneath; Retry/Back as printed actions. Tier gradient wash kept as the sheet's ground.
STORY: "My paper came back marked; here's my grade and what to do next."
FIRST VIEWPORT: The whole sheet fits one viewport; stamp top-right, score mid-sheet, comment and actions at the foot. Mobile identical, single column.
FORM: Dealt index 4 of 7 (the lead), seed key 550b2b01, code-led.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
