---
version: 1
slug: "src-app-components-random-practice"
primary_target: "src/app/components/random-practice"
related_targets: []
---

# Surface brief — Random practice (`/level/:levelId/random`, src/app/components/random-practice)

## Scope and visitor mode

Whole-surface redesign inside the established workbook world. Mode: **Operate** — a learner
drills an ungraded set of 10 flashcards, marking each read.

## Audience, job, action, proof, constraints

- Audience: learner drilling ungraded items, phone-first, may reset at will.
- Job: show one flashcard at a time with read-state, reveal details, navigate the batch.
- Proof: real random-practice items from repo JSON.
- Constraints: behavior frozen (read-state localStorage via RandomPracticeService, reveal
  toggle, loadMore/resetHistory, audio gate item.audioSrc stays unreachable); the flashcard
  is DESIGN.md's signature component — refine its stage, don't discard it.

## Chosen direction and memorable moment

**The Practice Deck** (inherited signature component; seed key 550b2b01, code-led). The
flashcard stays the hero but gains its workbook stage: a margin column holding batch position
as printed tally ("Card 4 of 10"), the deck context (Set, Reset as quiet margin actions), and
the card itself keeping gradient cap, read-green bar, checkmark toggle. Memorable moment:
the read state's top bar sweeping the full gradient-to-green like a ledger line completed.

## Unresolved decisions

None.

## Direction contract

THESIS: The flashcard gains its workbook stage: a deck ledger in the margin and a printed folio, the card remaining the page's hero. It refuses bare centering with orphaned text links.
OWN-WORLD: Header row as deck folio ("Level 2 Practice", batch position printed); the flashcard (24px, Float shadow, gradient cap → Correct Green when read, checkmark toggle) centered with circular FABs; bottom actions as printed ledger links with a rule between; finished state as a deck-complete plate with an authored fanned-cards SVG (geometry, not illustration).
STORY: "A batch of ten; I mark each as I read it; I can reshuffle or reset."
FIRST VIEWPORT: Folio row, card with FABs, ledger actions — above the fold on mobile.
FORM: Inherited signature component (position 5 of my ranked list), seed key 550b2b01, code-led.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
