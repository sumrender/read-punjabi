---
name: Read Punjabi
description: A calm, paper-clear learning workbook that teaches Gurmukhi (and Devanagari) with zero barriers
colors:
  scholar-blue: "#2563eb"
  scholar-blue-deep: "#1d4ed8"
  scholar-bright: "#3b82f6"
  notice-blue: "#2196f3"
  ink: "#1f2937"
  night-text: "#f9fafb"
  quiet-text: "#6b7280"
  faint-text: "#9ca3af"
  paper: "#ffffff"
  workbook-page: "#f9fafb"
  highlight-hover: "#f3f4f6"
  rule-line: "#e5e7eb"
  night: "#111827"
  night-page: "#1f2937"
  night-hover: "#374151"
  correct-green: "#4caf50"
  mistake-red: "#f44336"
  practice-orange: "#ff9800"
  practice-orange-deep: "#f57c00"
  celebration-gold: "#ffd700"
  pencil-gray: "#9e9e9e"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "normal"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "normal"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "1.5px"
  micro-label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "1.5px"
  display-unit:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "6rem"
    fontWeight: 700
    lineHeight: 0.85
    letterSpacing: "-0.04em"
  display-score:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "5rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
  native-glyph:
    fontFamily: "'Noto Sans Gurmukhi', sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  native-lesson-text:
    fontFamily: "'Noto Sans Gurmukhi', sans-serif"
    fontSize: "4rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "normal"
  emphasized-body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1.6
    letterSpacing: "normal"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "24px"
  pill: "100px"
  circle: "50%"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  2xl: "3rem"
components:
  button-primary:
    backgroundColor: "{colors.scholar-blue}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "0.75rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.scholar-blue-deep}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 1rem"
  card-level:
    backgroundColor: "{colors.workbook-page}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "2rem"
  card-flashcard:
    backgroundColor: "{colors.workbook-page}"
    rounded: "{rounded.xl}"
    padding: "0rem"
  option-quiz:
    backgroundColor: "{colors.workbook-page}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0.875rem 1.25rem"
    height: "56px"
  plate-lesson:
    backgroundColor: "{colors.workbook-page}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "4rem 2.5rem 3rem"
  card-graded:
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "3rem 2.5rem"
    width: "640px"
  note-margin:
    backgroundColor: "rgb(37 99 235 / 5%)"
    textColor: "{colors.scholar-blue}"
    rounded: "{rounded.md}"
    padding: "1.25rem"
  row-radio:
    backgroundColor: "{colors.workbook-page}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.875rem 1rem"
  nav-fab:
    backgroundColor: "{colors.workbook-page}"
    textColor: "{colors.ink}"
    rounded: "{rounded.circle}"
    size: "64px"
  badge-type:
    backgroundColor: "rgb(37 99 235 / 10%)"
    textColor: "{colors.quiet-text}"
    rounded: "{rounded.pill}"
    padding: "0.25rem 0.75rem"
---

# Design System: Read Punjabi

## Overview

**Creative North Star: "The Bilingual Poster"**

Read Punjabi is a poster on a warm-cream wall: oversized chapter numbers hold the page's skeleton, the Gurmukhi (or Devanagari) glyph sits as the hero in a hard-edged frame, and the rest of the page — labels, descriptions, controls — is set as small, calm secondary voice. The page's confidence comes from scale contrast (a 6rem saffron numeral beside a 1rem instruction line) and from warm cultural anchors (saffron + ink on cream) rather than from rounded chrome. Nothing is generic; nothing is decorative for its own sake.

The system introduces two complementary accents that work as one: **Scholar Blue** (the original) marks learning actions and remains the single interaction accent; **Saffron** is the structural warm accent — chapter numerals, diptych blocks, frame washes. The two meet on the home page's bilingual poster (Scholar Blue links, Saffron block, cream paper) and never on a single element.

The four colors are: cream paper (#FBF5E5), ink (#1A1A1A), Scholar Blue (#2563eb), and Saffron (#E76F3A). Dark mode inverts the paper/ink and shifts saffron one step warmer — same relationships, night setting. Feedback colors (green / red / orange / gold) are still traffic-lights, never decorative. The native script (Noto Sans Gurmukhi / Devanagari) is set at display scale in every context it appears; it is the page's typographic event, not its chrome.

**Key Characteristics:**

- **Saffron as the structural accent**, Scholar Blue as the action accent; the two never appear on the same element.
- **Cream paper (#FBF5E5) light theme, deep ink (#1A1409) dark theme** — never pure white or pure black; the page always reads as paper, not screen.
- **Oversized chapter numerals (4–8rem, 700 weight, tabular)** anchor every list page; numerals carry hierarchy before any text does.
- **Hard-edged geometric frames** around every specimen — 2–4px ink or saffron borders, square or 2px-radius corners, no soft shadows on cards.
- **Diptych compositions** on hero surfaces — a saffron or ink block holding a numeral on one side, a framed specimen on the other, divided by a 2px hairline.
- **Flat surfaces with one permitted shadow per surface**: the flashcard, the lesson plate, the graded paper, and the home poster each get one soft shadow as a printed drop; nothing else casts.
- **Sans-serif UI stack** + Noto Sans Gurmukhi / Devanagari for native content; the contrast is purely scale, not typeface.
- **Sharpened radius ladder**: 2px on cards, 4px on buttons, 0px on geometric frames — soft pills reserved for badges.
- **Two breakpoints** (768px, 480px) collapse every multi-column layout to one and put mobile navigation on screen edges; the diptych stacks specimen-above-numeral on small screens.
- **Decorative geometry is authored inline SVG** — ornamental ticks, frame corners, bilingual arrows — never emoji.
- **Audio, celebration, and gamification remain unchanged**: gold only on the Excellent tier, audio controls hidden until assets exist, no streaks or badges anywhere.

## Colors

The palette is a bilingual-poster world — cream paper, ink, Scholar Blue, and Saffron, with a fixed set of teaching feedback colors. Dark mode is not a dimmed version of light; it swaps the paper and ink to night values and shifts saffron one step warmer. Two accents are intentional: Scholar Blue (action) and Saffron (structure). They are deliberate companions, never teammates — they never appear on the same element.

### Primary

- **Scholar Blue** (#2563eb, hover #1d4ed8): the action accent. Marks learning actions — Begin buttons, play audio, pressed toggles, selected answers, focus rings. Dark theme shifts it one step brighter to #3b82f6 (hover #2563eb). It is a link-color blue: trustworthy, unobtrusive, never decorative.
- **Saffron** (#E76F3A, deep #C8541A, wash #FBE9D7): the structural accent. Marks chapter numerals, diptych blocks, frame washes, and the home poster's hero block. It carries hierarchy, never interaction. Dark theme shifts it one step warmer to #F08650 (deep #E76F3A). It is the cultural anchor: a warm orange that reads as paper and as India without being literal.

### The Two-Accent Rule

Scholar Blue is the action accent. Saffron is the structural accent. They appear together only in the same composition (page), never on the same element. A button is Scholar Blue or Saffron, never a mix. A chapter marker is Saffron; a link inside it is Scholar Blue. This is the system's complementarity rule.

### Neutral

- **Ink** (#1A1A1A): primary text, light theme. **Paper** (#F8F1DC) is its dark-theme counterpart.
- **Soft Ink** (#4A4640): secondary text — descriptions, transliterations, inactive labels. Dark theme: #B7AC8E.
- **Rule** (#1A1A1A at 12% alpha): all 1px borders and dividers; dark theme uses #F8F1DC at 16% alpha.
- **Cream Paper** (#FBF5E5): page background, light theme; **Deep Ink** (#1A1409) is the dark-theme page background.
- **Hover** (#1A1A1A at 4% alpha): wash on interactive rows; dark theme #F8F1DC at 6%.

### Feedback (teaching traffic-lights)

- **Correct Green** (#4caf50): right answers, completed practice.
- **Mistake Red** (#f44336): wrong answers.
- **Practice Orange** (#ff9800, hover #f57c00): keep-learning tier and warning states.
- **Celebration Gold** (#ffd700): the single highest tier of quiz results — only place it appears.

Feedback colors pair a saturated stroke/text with a 10%-alpha wash of the same hue (15% in dark).

### Named Rules

**The Two-Accent Rule.** Scholar Blue and Saffron are the only two accents. Scholar Blue acts; Saffron structures. They never meet on a single element.

**The Cream-Paper Rule.** Light theme is cream (#FBF5E5), never #fff. Dark theme is deep ink (#1A1409), never #000. The page is paper at all times.

## Typography

**Display Font:** System UI stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`)
**Body Font:** Same system stack
**Script Font:** Noto Sans Gurmukhi (Punjabi course) / Noto Sans Devanagari (Hindi course) — self-hosted variable fonts (weight 100–900) with full Latin coverage.

**Character:** A confident, scale-driven UI voice. The system communicates hierarchy through size contrast, not through typeface choice. Two weights (700 for display, 400 for body) carry the entire range; everything else is size and tracking.

### Hierarchy

- **Hero Specimen** (700, 12–18rem by surface; 5rem on mobile at 480px): the page's native glyph on the home poster. Sets the product's typographic ceiling.
- **Display Numeral** (700, 6rem, line-height 0.85, −0.04em tracking, tabular-nums): the chapter numeral — system's structural maximum, set in Saffron.
- **Headline** (700, 2.5rem — 2rem under 768px): page titles (home h1, quiz results title, settings).
- **Title** (700, 1.5rem): card titles, group headings, result messages.
- **Body** (400, 1rem, 1.55 line-height): all UI copy, descriptions, options in transliteration. Root is 16px (14px under 768px).
- **Label** (700, 0.75rem, +1.5px letter-spacing, uppercase): type badges ("LETTER", "WORD"); the 0.5px variant appears on lesson-type tags, form-line labels, score labels.
- **Micro Label** (700, 0.6875rem, +1.5px letter-spacing, uppercase): the smallest printed voice — specimen cell badges, story position labels.
- **Emphasized Body** (700, 1.0625rem): the emphasis step — practice-note titles, exercise-row titles, deck-complete copy.
- **Native Glyph** (700, 2–5rem scale by font-size setting; 12–18rem on the home poster; 4–8rem on lesson plates and flashcards). Transliteration renders below in 1.5rem italic, Soft Ink.
- **Native Lesson Text** (700, 3–6rem by font-size setting on the lesson plate; 2–3.5rem mobile).
- **Score Fraction** (700, 5rem, −0.03em tracking, tabular-nums, over a 2rem/600 total): the graded paper's marked score.

The user-selectable base size (`data-font-size`: small 0.875rem → xlarge 1.5rem) scales the entire rem-based system, not just native text.

### Named Rules

**The Script Leads Rule.** Every Gurmukhi/Devanagari string is set in the native font family — never the UI stack, never italic, never small. The interface never relies on the script alone to communicate: labels and instructions are always in the learner's reading language (English/transliteration).

**The Scale Carries Rule.** Hierarchy is expressed through size and tracking, not through font choice or weight variation. Two weights (700, 400) and a wide size range (0.6875rem – 18rem) carry the entire system.

## Layout

The home poster is the system's structural template: a diptych where a saffron block holding an oversized numeral anchors one column and a cream-framed specimen anchors the other. Inner pages adapt the same diptych at smaller scales — a saffron chapter plate on the lesson list, a saffron question number on the test paper, a saffron tier ring on the graded paper.

One centered container per page: 1200px for navigation pages, 700px for lesson plates and flashcards, 800px for test papers, 640px for the graded paper and deck-complete plate, 600px for settings. Page padding is 2.5rem 1rem, dropping to 1rem under 768px. Headers on list pages align left with their back button.

Diptych columns typically run 0.4fr / 1fr (numeral block / specimen) on hero surfaces and 4fr / 8fr (margin / body) on list pages. The numeral column carries Saffron at display size and never wraps to multiple lines; the specimen column always centers.

Rhythm is a fixed ladder: 1rem within components, 1.5–2rem between a heading and its content, 3rem between page sections. Grids are `auto-fit` with minimums tuned to content — specimen cells 150px (124px mobile), exercise rows full-width.

A single 768px breakpoint collapses every diptych to one column, moving the numeral above the specimen (so the numeral leads on mobile), converts control rows to stacked full-width buttons, and moves navigation FABs to fixed screen edges (48px lesson / 40px practice, floating over content). A 480px breakpoint further shrinks the hero specimen.

## Elevation & Depth

**The One-Shadow Rule.** Surfaces are flat at rest. A single soft shadow is permitted on surfaces that genuinely need to lift: the home poster, the lesson plate, the flashcard, the graded paper, the deck-complete plate — one per "this surface is the page" moment. Everything else is flat.

### Shadow Vocabulary

- **Drop** (`0 6px 24px rgb(26 26 26 / 12%)`): the single permitted shadow — on the four hero surfaces only.
- **No hover lift** on cards; cards express interactivity through color and border thickening.

Dark theme strengthens the drop to 22% black; light theme holds at 12% — depth reads through contrast against cream, not darkness.

## Shapes

A sharpened radius ladder that reads as paper, not app chrome:

- **0px** — geometric frames around specimens, chapter blocks, the page border itself.
- **2px** — most cards (lesson plate, settings row, quiz container), option tiles.
- **4px** — primary buttons, secondary buttons.
- **Pill (100px)** — only on badges, reveal buttons, status pills; never on cards.

Borders are 1px Rule at rest. Interactivity is expressed through border color (Scholar Blue on selected/pressed) or fill (Saffron block on chapter, Scholar Blue on primary). Two heavier printed statements carry the system: a 4px ink or saffron frame for hero specimens, and a 2px ink top rule that heads printed lists (test paper header, settings form lines, exercises block). The graded paper is the deepest border statement — a 4px tier-colored ring matched to the score tier (gold / green / Saffron-warning).

## Components

### Buttons

- **Shape:** soft 4px radius (12px on the large quiz-results actions); padding 0.75rem 1.5rem standard.
- **Primary:** Scholar Blue fill, Paper text; hover deepens to #1d4ed8 with the Action Glow shadow and a −2px lift.
- **Secondary / Ghost:** transparent or Paper fill, 1px Rule Line border, Ink text; hover brings the Highlight wash and a Scholar Blue border. Text-underline links with 4px underline-offset are the tertiary voice.
- **Toggle (aria-pressed):** a ghost control that fills Scholar Blue with Paper text when active — the transliteration/meaning/audio pattern.
- **Primary on dark:** large filled CTAs deepen one step under `[data-theme="dark"]` — blue-600 (#2563eb) at rest, blue-700 (#1d4ed8) on hover — via `:host-context`. White on the dark-theme primary blue-500 is only 3.68:1; the deeper step restores contrast. This is the documented contrast-correct treatment for any large primary CTA on a dark-theme surface.
- **Focus:** every interactive element gets a 2px Scholar Blue outline with 2px offset (`:focus-visible`).

### Cards / Containers

- **Corner Style:** 8px radius.
- **Background:** Workbook Page with a 1px Rule Line border; 2rem internal padding.
- **Hover:** −4px translateY, Lift shadow, 2px Scholar Blue outline — cards are clickable and it shows.
- **Quiz results card:** 24px radius, 3px tier-colored ring (gold → green → blue → orange), a 135deg gradient from the tier's 5%-alpha wash into Workbook Page, slide-in-up entrance.

### Flashcard (signature component)

The system's hero. 700px max-width, 24px radius, Float shadow at rest, and a 6px gradient bar (Scholar Blue → deep) across the top that turns Correct Green when the item is marked read. Header holds an uppercase pill badge (10%-alpha Scholar Blue wash) and a custom checkmark toggle (24px, 6px radius, green fill on check). Body centers the native glyph at 8rem. Footer is a Highlight-wash strip holding the 56px circular audio FAB (Scholar Blue, pulses green while playing). Prev/next are 64px circular FABs flanking it, scaling 1.1 on hover with a Scholar Blue border.

### Quiz Options

The answer tile on the test paper (`quiz-option-tile` mixin in `src/styles/_ui.scss`; every question component includes it).

- **Shape:** 12px radius ruled tile, 2px Rule Line border, min-height 56px (a mixed-script floor; native rows reach ~70px naturally through their 2rem/1.35 text plus 0.875rem 1.25rem padding).
- **Text:** option text and prompts are set in the native font family at 2rem/600 (Script Leads Rule applied to answers) — 1.5rem under 768px.
- **States:** hover lifts −2px with a Scholar Blue border; selected turns the border Scholar Blue and draws the 1px inset Selected Ring; correct fills Correct Green (white text, 0.4s pulse); incorrect fills Mistake Red (white text, 0.4s shake) then everything disables to 50% opacity.
- **Feedback:** echoes below as the `feedback-banner` margin note — a 10%-alpha verdict wash, 8px radius, 600 text, with an 18px authored SVG icon; prompts announce through the shared `sheet-instruction` voice (0.875rem/700 uppercase, +0.5px tracking, Faint Text).

### The Unit Opener (level surface)

The level page is a textbook unit divider: a sticky margin column beside a specimen index, drawn entirely with print rules — no boxed cards.

- **Margin numeral:** the level number at 6rem/700 Scholar Blue (line-height 0.85, −0.04em tracking, tabular-nums), the system's display maximum.
- **Margin note (Random Practice):** a 5%-alpha Scholar Blue wash (8px radius, 1.25rem padding) holding a 1.0625rem/700 Scholar Blue title, a 0.875rem Quiet description, and a 20px authored SVG arrow that slides 4px right on hover. It rides on blue, not orange — verdict colors never appear on navigation.
- **Specimen index:** a ruled grid of lesson cells (`auto-fill`, 150px minimum; 124px mobile) built from hairline rules — one `border-top` over the grid, each cell carrying `border-bottom` and `border-right`. Cells hold a 0.6875rem uppercase badge, the native glyph at 2.25rem (1.875rem mobile; long text drops to 1.0625rem/600), and a 0.875rem italic transliteration. Hover is the Highlight wash; press deepens to a 10% Scholar Blue wash.
- **Exercises:** headed by a 2px Ink top rule, the block lists dotted-leader rows — 1.0625rem/600 title, a 1px dotted Rule Line leader (baseline-shifted −4px) running to a tabular 0.875rem count, and a 24px authored SVG arrow (2px round-capped stroke, Scholar Blue) that fades in from `translateX(-4px)` to `+4px` on hover while title and count turn Scholar Blue.
- **Entrance:** margin-column children rise 14px and fade over 0.45s `cubic-bezier(0.22, 1, 0.36, 1)` (backwards), staggered 0.05s — killed entirely under `prefers-reduced-motion`.

### The Lesson Plate (lesson surface)

One lesson as the home facing page's sibling — the fourth sanctioned Float surface. Workbook Page plate, 700px max-width, 24px radius, 1px Rule Line border, Float shadow, and a 6px Scholar Blue→deep gradient cap across the top.

- **Cap opacity note:** the plate's cap runs at full opacity; the flashcard and home facing page draw theirs at 0.8. Recorded drift — either value is acceptable, full opacity is the plate's own voice.
- **Body:** the native text set on a printed baseline rule — a 6rem-wide, 2px Rule Line underline beneath the glyph, like a specimen on a workbook line. Native scale is 3–6rem by font-size setting (2–3.5rem mobile); transliteration 1.5rem italic, meaning 1.125rem Faint Text.
- **Footer strip:** a Highlight-wash control bar (`border-top` hairline) holding pill toggles (100px radius) that fill Scholar Blue with Paper text when `aria-pressed="true"` — the transliteration/meaning pattern from the flashcard footer.
- **Navigation:** 64px circular FABs flank the plate on desktop; under 768px they go fixed to the screen edges at 48px, floating over content per the standing mobile rule.
- **Type badge:** the lesson-type pill (0.75rem/700 uppercase, +1.5px tracking, 10%-alpha Scholar Blue wash) sits above the plate, not on it.

### The Test Paper (quiz surface)

The quiz page is a numbered exercise sheet; the page itself is the paper (800px container).

- **Printed header row:** "Question N of M" with the active count at 1.125rem/700 tabular-nums over a 0.875rem Quiet frame; a Score label (0.75rem/700 uppercase, +1.5px tracking) followed by authored SVG tally-mark groups (26×20, 2px round-capped Ink strokes, the fifth slash Scholar Blue); and a printed Stop pill (ghost, 0.875rem) whose hover is destructive — Mistake Red text and border on the error wash. A 2px Ink rule closes the header.
- **Question sheets:** prompts are native-font headlines (2rem, 1.5rem mobile); options ride the `quiz-option-tile` mixin (above); instructions ride `sheet-instruction`; verdict echoes ride `feedback-banner`.
- **Story sequencing:** the passage title set in the native font, then numbered slip rows (12px radius, 2px rule) holding native-font line text at 1.25rem/600 (1.0625rem mobile) beside uppercase position labels, styled 8px-radius selects, and solved rows showing a 1.75rem number disc on a 25%-white fill plus an 18px SVG check.
- **Write-in blanks:** paragraph blanks are underlined slots, not boxes — `.filled-blank` (2px Correct Green rule), `.active-blank` (2px Scholar Blue rule, blue text), `.empty-blank` (2px Rule Line, Faint placeholder), each 3.5rem minimum, inside an 8px-radius passage card.

### The Graded Paper (quiz results surface)

The results card is the worksheet returned and marked in pen. Same 24px plate, but the language shifts from screen to paper:

- **Ground:** the 3px tier ring stays (gold / Correct Green / Notice Blue info / Practice Orange warning) and now pairs a tier 135deg 5%-alpha gradient wash (fading into Workbook Page by 55%) as the card's background — one per tier.
- **The circle:** a hand-drawn SVG ellipse (−3deg rotation, 4px round-capped tier-colored stroke) circles the 5rem/700 tabular score fraction, drawing itself via stroke-dashoffset over 0.8s `cubic-bezier(0.22, 1, 0.36, 1)` after a 0.35s delay — the one sanctioned animated linework; reduced-motion renders it complete and static.
- **Grade stamp:** an angled (−6deg) stamp in the top corner — 3px currentColor border, 0.8125rem/800 uppercase at +1.5px tracking, tier-colored (0.6875rem mobile).
- **Marker's comment:** the result message sits on a 2px Rule Line like a comment on a ruled line — 1.125rem italic Ink, 26rem max-width.
- **Actions:** printed 12px-radius primary (Retry) and ghost (Back) buttons; every verdict/icon is authored SVG — the paper carries no emoji.

### The Practice Deck stage (random practice surface)

The flashcard keeps its documented identity (700px, 24px radius, Float shadow, 6px gradient cap at 0.8, read toggle turning the cap Correct Green). Its stage is now printed:

- **Deck folio:** the page header reads like a batch cover — 1.75rem/700 title and a "Card N of M" position line (0.875rem/700, +0.5px tracking, tabular-nums) that doubles as the `aria-live` region.
- **Bottom ledger:** deck actions sit on a hairline rule as underlined text links (0.875rem, 4px underline-offset) that turn Scholar Blue on hover — the system's tertiary button voice.
- **Read toggle:** the checkmark is drawn in CSS (a rotated white border L inside the 24px/6px-radius box), not a ✓ character.
- **Deck-complete plate:** a 640px Workbook Page plate (24px radius, Float shadow) headed by an authored fanned-cards SVG — three rotated rounded rects with ruled faces, the front card's border Scholar Blue — sanctioned as authored geometry.
- **Loading:** a 40px spinner in system tokens (3px Rule Line ring, Scholar Blue top arc). Prev/next FAB chevrons remain the Unicode ❮/❯ — inherited voice, a future authored-SVG candidate.

### The Belongs-To Plate (settings surface)

Settings as the workbook's inside cover: everything the learner owns, on labeled form lines (600px container).

- **Masthead:** "Settings" at 2rem/700 over an italic 1rem belongs line in Quiet Text.
- **Form lines:** Course, Type Size, and Ink & Paper are uppercase 0.75rem/700 tracked labels (+1.5px) set under a 2px Ink top rule — the same printed-rule that heads the test paper.
- **Radio rows:** full-width 4px-radius cards (Workbook Page, 1rem padding) with native radios in Scholar Blue (`accent-color`); `:has(input:checked)` turns the row's border and label Scholar Blue and bolds the label. Hover brings the Highlight wash and Scholar Blue border.
- **Live specimens:** each row previews its own choice — the course row renders the native glyph (ੳ / अ via the language specimen map), the type-size row renders "Aa ੳ" at the true step size (1 / 1.25 / 1.5 / 1.875rem), and the theme row shows an ink-and-paper chip pair (18px, 4px radius).

### Navigation

Sticky top bar on Workbook Page with a bottom Rule Line; brand wordmark at 1.25rem/600 left, text links right in Quiet Text that turn Scholar Blue on hover. It is chrome, not a design moment — on small screens it simply tightens. Nav links carry vertical padding (0.75rem 0) so tap targets clear minimum size.

### The Open Workbook (home surface)

The home page is composed as a book's front matter: a contents spine beside a facing page (5fr/7fr grid, 3rem gap). Both columns borrow from existing components rather than inventing new ones.

**Contents spine.** A "Contents" heading over printed-contents rows: each row is a link holding a 1.25rem/600 title, a 1px dotted leader (Rule Line color, baseline-shifted −4px) running to a tabular-nums page number equal to the level, and a 0.9375rem quiet description beneath. Rows are separated by 1px Rule Line rules (none on the last). Hover/focus shows an authored inline SVG arrow (24px, 2px round-capped stroke, Scholar Blue) that fades in from `translateX(-4px)` to `+4px` while the row text indents `translateX(0.5rem)` and the title/page number turn Scholar Blue — 0.2s ease throughout, Highlight wash on the row.

**Facing page.** The flashcard's kin: Workbook Page fill, 1px Rule Line border, 24px radius, Float shadow, and a 6px Scholar Blue→deep gradient cap across the top at 0.8 opacity. Min-height 480px (420px mobile, 380px at 480px), padding 2.5rem 2rem. Contents, top to bottom:

- **Badge:** uppercase pill (10%-alpha Scholar Blue wash, 1.5px letter-spacing, Quiet Text) — `aria-hidden`.
- **Specimen:** native glyph at 8rem (5rem mobile, 4rem at 480px) over 1.5rem italic transliteration, entering with a 0.45s `cubic-bezier(0.22, 1, 0.36, 1)` rise (14px translate + fade, staggered 0.05s).
- **Dot selectors:** 28px circular buttons wrapping 10px ring dots; active dot fills Scholar Blue, hover scales 1.2.
- **Primary CTA:** one `button-primary` at 4px radius, 1rem 2.75rem padding, 1.125rem/600.
- **Note:** 0.875rem Quiet Text under the CTA.

### The Specimen Auto-Advance Pattern

The facing page cycles three Level 1 letters on a 4.5s `setInterval`. The cycle:

- **Pauses** while hovered or focused (mouseenter/mouseleave/focusin/focusout), and never advances when `prefers-reduced-motion: reduce` matches.
- **Re-renders via a one-item `@for`** keyed on the specimen's content id, so Angular recreates the node and the enter animation replays on every change.
- **Announces only user-initiated changes:** the glyph wrapper is `aria-hidden`, so ambient cycling is silent; a separate sr-only `role="status"` live region receives a message only on initial load and dot selection.
- **Keeps loading status outside the hidden wrapper:** the "Opening the first letters…" state carries its own `role="status"`/`aria-live="polite"`.

### Inputs / Fields

Settings rows are full-width selectable cards (Workbook Page, 4px radius, 1rem padding) with `accent-color: Scholar Blue` native radios; the checked label bolds and turns Scholar Blue via `:has(input:checked)`. Hover brings the Highlight wash and a Scholar Blue border. Full surface anatomy (masthead, form lines, live specimens) lives under The Belongs-To Plate above.

## Do's and Don'ts

### Do:

- **Do** set every Gurmukhi/Devanagari string in `var(--native-font-family)` and give it display scale — the script is the page's typographic event, including quiz options and prompts.
- **Do** keep the 2px Scholar Blue `:focus-visible` outline with 2px offset on every interactive element.
- **Do** answer every interaction within 0.2s `ease` (0.3s for theme changes); feedback is instant but calm.
- **Do** pair every verdict color with its 10%-alpha wash when it becomes a surface.
- **Do** express interactivity through the state ladder first: border thickens → fill → lift → shadow.
- **Do** draw structure with print rules before reaching for boxes: hairline specimen indexes, dotted leaders, and 2px Ink top rules are the system's hierarchy.
- **Do** keep verdict and state marks as authored SVG linework — tally strokes, checks, the score circle, fanned cards — and draw the animation once, with a reduced-motion static fallback.
- **Do** deepen large primary CTAs one step under dark theme (blue-600 rest → blue-700 hover, via `:host-context`) — white on the dark-theme primary is 3.68:1.

### Don't:

- **Don't** introduce a second accent color; if something wants attention, it is Scholar Blue or a traffic-light verdict.
- **Don't** put shadows on static, non-interactive surfaces (the flashcard, results card, home facing page, lesson plate, and deck-complete plate are the only sanctioned exceptions).
- **Don't** put emoji or glyph characters in verdicts, feedback, or state marks — authored SVG only (the read toggle's checkmark is CSS, the results iconography is SVG paths).
- **Don't** put orange — or any verdict color — on navigation: the Random Practice margin note rides a Scholar Blue wash, and the Stop pill only turns red on hover.
- **Don't** rely on the native script alone for any label, instruction, or navigation — the audience, by definition, cannot read it yet.
- **Don't** gamify: no streaks, badges, leaderboards, or ambient celebration outside the quiz results moment.
- **Don't** advertise or surface audio controls until real audio assets exist.
- **Don't** add new breakpoints beyond 768px/480px or containers wider than 1200px.
- **Don't** announce ambient auto-advancing content to assistive tech; live regions carry only user-initiated changes.
