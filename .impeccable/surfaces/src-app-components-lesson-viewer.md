---
version: 1
slug: "src-app-components-lesson-viewer"
primary_target: "src/app/components/lesson-viewer"
related_targets: []
---

# Surface brief — Lesson viewer (`/lesson/:lessonId`, src/app/components/lesson-viewer)

## Scope and visitor mode

Whole-surface redesign inside the established workbook world (DESIGN.md). Mode: **Operate** —
a learner studies one item and pages through the lesson.

## Audience, job, action, proof, constraints

- Audience: learners seeing a glyph/word/sentence they can't yet read, phone-first.
- Job: hold one item at reading size, scaffold with transliteration/meaning on demand.
- Proof: the native item itself, at the user's font-size setting.
- Constraints: behavior frozen (toggle state, nav FABs, font-size class binding, audio gate
  `isAudioPlaybackEnabled` stays unreachable); ARIA labels preserved.

## Chosen direction and memorable moment

**The Lesson Plate** (inherited from the home facing page's flashcard kin; seed key 550b2b01).
One centered plate on ruled paper: the native item sits on a baseline rule like a specimen on
a workbook line, badge and page position in the margin, toggles as quiet margin controls,
prev/next as circular FABs. Memorable moment: the item drawn on its ruled baseline — the
learner "writes" nothing but reads on the line, like the workbook's printed specimen.

## Unresolved decisions

None.

## Direction contract

THESIS: One lesson, one plate — the home facing page's sibling. The native item sits on a ruled baseline like a printed specimen; controls are quiet margin apparatus. It refuses centered-float text with orphaned FABs.
OWN-WORLD: Workbook-page plate (24px radius, 1px rule, Float shadow, 6px gradient cap) holding the item; a single hairline baseline rule under the native text; margin holds type badge and item folio ("Item 4 of 12"); toggle controls as a Highlight-wash footer strip (flashcard-kin).
STORY: "Here is the thing I am learning, on its line; I can peek at the scaffold or page through."
FIRST VIEWPORT: Back row with badge; the plate fills the middle with prev/next FABs flanking; toggles in the plate footer. Mobile: FABs move to fixed screen edges per DESIGN.md.
FORM: Inherited composition (home facing-page kin, position 2 of my ranked list), seed key 550b2b01, code-led.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
