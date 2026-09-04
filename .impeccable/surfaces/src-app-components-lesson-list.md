---
version: 1
slug: "src-app-components-lesson-list"
primary_target: "src/app/components/lesson-list"
related_targets: []
---

# Surface brief — Lesson list (`/level/:levelId`, src/app/components/lesson-list)

## Scope and visitor mode

Whole-surface redesign inside the established workbook world (DESIGN.md). Mode: **Operate** —
a returning learner picks their next lesson, practice, or quiz and moves.

## Audience, job, action, proof, constraints

- Audience: learners who cannot yet read Gurmukhi, mid-journey, phone-first.
- Job: present one level's lessons as a scannable index; launch Random Practice and Quizzes.
- Proof: real lesson content (native + transliteration) as the index itself.
- Constraints: behavior frozen (routing, LessonService, RandomPracticeService, quiz launch);
  no audio; Scholar Blue only accent; 768/480 breakpoints; ARIA preserved.

## Chosen direction and memorable moment

**The Unit Opener** (dealt index 1, seed key 550b2b01, code-led). The level page is a
textbook's unit divider: an oversized printed numeral "2" anchors a margin column; lessons
are a specimen index of real glyph cells; Random Practice is a margin note pinned beside the
index; Quizzes are printed "Exercises" rows with dotted leaders (home contents grammar).
Memorable moment: the giant unit numeral — the page number IS the level, printed at scale.

## Unresolved decisions

None. Copy is product-truth (existing titles, descriptions, quiz titles).

## Direction contract

THESIS: The level page is a textbook unit divider — an oversized printed numeral owns the margin, lessons are a specimen index of real cells, quizzes are printed exercises. It refuses the equal-card-grid app page.
OWN-WORLD: Paper ground; the giant Scholar Blue unit numeral as the page's one large color moment; lesson cells separated by hairline rules (not boxed cards), each a native glyph at reading size over quiet transliteration; dotted leaders running to exercise numbers; Random Practice as a Practice Orange margin note.
STORY: "This is Unit 2; here is everything in it." They scan real items, open one, or jump to practice/exercises.
FIRST VIEWPORT: Masthead row (back + unit title + description). Below: margin column with the giant numeral and "Contents"; beside it the specimen index; exercises and practice closing the page. Mobile: numeral shrinks to a banner, index single-column.
FORM: Dealt index 1 of 7, seed key 550b2b01, code-led.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
