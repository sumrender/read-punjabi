---
version: 1
slug: "src-app-components-settings"
primary_target: "src/app/components/settings"
related_targets: []
---

# Surface brief — Settings (`/settings`, src/app/components/settings)

## Scope and visitor mode

Whole-surface redesign inside the established workbook world. Mode: **Operate** — a learner
sets course, font size, and theme.

## Audience, job, action, proof, constraints

- Audience: learner personalizing the app (course switch, readable type size, theme).
- Job: make three radio groups instantly scannable and safe to change.
- Proof: live-preview feel — font-size choice visibly reflows native script.
- Constraints: behavior frozen (three radiogroups, localStorage persistence, LanguageService
  config switch); radios keep native inputs with accent-color.

## Chosen direction and memorable moment

**The Belongs-To Plate** (inherited; seed key 550b2b01, code-led). The settings page is a
book's inside cover: "This workbook is yours" plate framing — each setting row printed like
a labeled form line in a book's front matter (Course, Type Size, Ink & Paper), with the
selected value shown as the "handwritten" filled-in answer. Memorable moment: the row reads
like "Course: Punjabi" printed with a fill-in underline — the workbook owns you back.

## Unresolved decisions

None.

## Direction contract

THESIS: Settings is the book's inside cover — a printed form where each line is labeled like front matter and the chosen value reads as the filled-in answer, with live specimens. It refuses a generic stacked-form page.
OWN-WORLD: Paper page, one column (600px); three labeled form lines ("Course", "Type Size", "Ink & Paper") as uppercase labels over ruled rows; each radio row carries a live specimen — native glyph ੳ/अ for courses, "Aa" at true sizes, ink/paper swatch chips for themes; the checked row turns Scholar Blue and bolds (existing treatment); radios native with accent-color; hairline rules between sections.
STORY: "This workbook is mine; I set how it prints."
FIRST VIEWPORT: All three sections visible on mobile without scrolling past the first; back link at the foot.
FORM: Inherited (position 6 of my ranked list), seed key 550b2b01, code-led.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
