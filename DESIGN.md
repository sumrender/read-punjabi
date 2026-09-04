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

**Creative North Star: "The First Reader's Workbook"**

Read Punjabi looks like a well-set first workbook: paper-clear pages, generous type, and one patient ink color that shows you where to act. Nothing on a page competes with the thing being learned — a Gurmukhi glyph at reading size sits at the center of the composition, and every piece of interface around it is quiet, ordered, and obviously functional. The system borrows the emotional register of a good textbook: supportive structure, no judgment, no noise.

Density is low and rhythm is predictable: one container, generous section spacing (2–3rem), centered content, mobile-first. Interaction is "soft, patient, precise" — 0.2s eased transitions, gentle hover lifts, instant but calm feedback. The voice is warm, plain, and encouraging; the visuals follow the same rule. The inner pages carry the metaphor onto full printed sheets — a unit divider, a lesson plate, a numbered test paper, a graded worksheet, a practice deck, an inside cover — all drawn with the same quiet print language: hairline rules, dotted leaders, 2px ink rules, and authored SVG linework standing in for decoration. Celebration exists (gold, a subtle gradient wash) but only as the honest final beat of a completed quiz — never as ambient gamification.

**Key Characteristics:**

- Paper-clear light theme and true-night dark theme; both driven by one semantic variable set
- One accent (Scholar Blue) for action and focus; traffic-light colors reserved for learning verdicts
- Native script always set in self-hosted Noto Sans Gurmukhi/Devanagari at display sizes
- Flat surfaces at rest; shadow appears as a response to state
- Soft radius ladder (4 → 8 → 12 → 24px) with pill badges and circular navigation FABs
- A single 768px breakpoint collapses every layout to a single centered column
- Structure is printed, not boxed: ruled specimen indexes, dotted leaders, and 2px ink top rules carry hierarchy; icons and marks are authored inline SVG, never emoji

## Colors

The palette is a scholarly neutral world — white paper, gray ink, gray rule-lines — with exactly one accent and a fixed set of teaching feedback colors. Dark mode is not a dimmed version of light; it swaps to a true night scheme with its own ramps.

### Primary

- **Scholar Blue** (#2563eb, hover #1d4ed8): the only accent. Marks learning actions — Start Quiz, play audio, pressed toggles, selected answers, focus rings, the gradient cap on the flashcard. Dark theme shifts it one step brighter to #3b82f6 (hover #2563eb). It is a link-color blue: trustworthy, unobtrusive, never decorative.
- **Notice Blue** (#2196f3): informational feedback only — the "good effort" tier on quiz results and info-tinted surfaces (10% alpha wash). Not a second accent.

### Secondary

None. The system deliberately has exactly one accent. Where a second color wants to appear, it is either Scholar Blue or a semantic feedback color.

### Tertiary

None.

### Neutral

- **Ink** (#1f2937): primary text, light theme. **Night Text** (#f9fafb) is its dark-theme counterpart.
- **Quiet Text** (#6b7280): secondary text — descriptions, transliterations, inactive labels.
- **Faint Text** (#9ca3af): tertiary text — hints and de-emphasized metadata.
- **Paper** (#ffffff): page background, light theme; also the text color on filled primary/feedback surfaces.
- **Workbook Page** (#f9fafb): card and raised-surface background, light theme; **Night Page** (#1f2937) in dark.
- **Highlight Hover** (#f3f4f6): hover wash; **Night Hover** (#374151) in dark.
- **Rule Line** (#e5e7eb): all 1px borders and dividers; dark theme uses #374151.
- **Night** (#111827): dark-theme page background and the browser `theme-color`.
- **Pencil Gray** (#9e9e9e): disabled controls only.

### Feedback (teaching traffic-lights)

- **Correct Green** (#4caf50): right answers, completed practice (flashcard "read" state and its top bar).
- **Mistake Red** (#f44336): wrong answers, exit destructive hover.
- **Practice Orange** (#ff9800, hover #f57c00): "keep learning" verdict tier and warning states.
- **Celebration Gold** (#ffd700): the single highest tier of quiz results — the "Excellent" border, its gradient wash, and the pen that circles the score. Used nowhere else.

All feedback colors pair a saturated stroke/text with a 10%-alpha (15% in dark) background wash of the same hue. On filled verdict surfaces the ink flips to Paper, with white at 25% (solved-number discs), 60% (muted counters), and 80% (labels on red) as the muted steps.

### Named Rules

**The One Ink Rule.** Scholar Blue is the only accent on any screen. It marks where the learner acts. Everything else is ink, paper, or a verdict.

**The Traffic-Light Rule.** Green, red, orange, and gold exist to answer the learner's "how did I do?" — never to decorate, never for marketing moments, never on navigation.

## Typography

**Display Font:** System UI stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`)
**Body Font:** Same system stack
**Script Font:** Noto Sans Gurmukhi (Punjabi course) / Noto Sans Devanagari (Hindi course) — self-hosted variable fonts (weight 100–900) with full Latin coverage, so transliterations render in-family without fallback

**Character:** An invisible, native-feeling UI voice so the *script being learned* is the only typographic event on the page. The learner's eye should never have to parse a styled UI font; it should land directly on Gurmukhi set like a display face.

### Hierarchy

- **Display** (700, 2.5rem — 2rem under 768px): page titles only (home h1, quiz results title).
- **Headline** (700, 2rem): section pages (level h1, settings h1, quiz question prompt).
- **Title** (600, 1.5rem): card titles, group headings, result messages (1.75rem inside the results card).
- **Body** (400, 1rem, 1.6 line-height): all UI copy, descriptions, options in transliteration. Root is 16px (14px under 768px).
- **Label** (700, 0.75rem, +1.5px letter-spacing, uppercase): type badges ("LETTER", "WORD"); the looser 0.5px variant appears on the lesson-type tag, form-line labels, the score label, and sheet instructions (0.875rem, Faint Text).
- **Micro Label** (700, 0.6875rem, +1.5px letter-spacing, uppercase): the smallest printed voice — specimen-index cell badges, story position labels.
- **Emphasized Body** (600–700, 1.0625rem): the printed emphasis step between body and title — practice-note titles, exercise-row titles, deck-complete copy.
- **Native Glyph** (700, 2–5rem scale, Gurmukhi/Devanagari): the item being learned. Size follows the user's font-size setting (small 2rem → xlarge 5rem); the practice flashcard and the home facing page show it at 8rem (5rem mobile, 4rem long text). Transliteration renders under it at 1.5rem italic, Quiet Text.
- **Native Lesson Text** (700, 3–6rem scale on the lesson plate by font-size setting; 2–3.5rem mobile): the same role as the Native Glyph, set on the plate's baseline rule. Specimen-index cells set their native content at 2.25rem (1.875rem mobile); the settings course specimen runs 1–1.875rem at true size.
- **Display Numeral** (700, 6rem, line-height 0.85, −0.04em tracking, tabular-nums): the unit opener's margin numeral — the system's display maximum, printed in Scholar Blue.
- **Score Fraction** (700, 5rem, −0.03em tracking, tabular-nums, over a 2rem/600 total): the graded paper's marked score.

The user-selectable base size (`data-font-size`: small 0.875rem → xlarge 1.5rem) scales the entire rem-based system, not just the native text.

### Named Rules

**The Script Leads Rule.** Every Gurmukhi/Devanagari string is set in the native font family — never the UI stack, never italic, never small. The interface never relies on the script alone to communicate: labels and instructions are always in the learner's reading language (English/transliteration).

## Layout

One centered column per page inside a 1200px max-width container (Settings narrows to 600px, the quiz sheet and its questions to 800px, the graded paper and deck-complete plate to 640px, the practice flashcard and lesson plate to 700px). Page padding is 2rem 1rem, dropping to 1rem under 768px. Content is center-aligned by default; headers on list pages align left with their back button.

The level page is the one two-column spread: a sticky margin column (4fr, pinned 5.5rem from the top) beside the specimen index (8fr) with a 3rem gap. The margin column carries the oversized unit numeral, the unit title, and Random Practice as a margin note; under 768px it un-sticks and flows as a wrapped row above the index.

Rhythm is a fixed ladder: 1rem within components, 1.5–2rem between a heading and its content, 3rem between page sections. Grids are `auto-fit` with minimums tuned to content — level cards 280px, quiz cards 200px, letter tiles 120px, gaps 1–1.5rem.

A single 768px breakpoint collapses every multi-column layout to one column, converts control rows to stacked full-width buttons, and moves navigation FABs to fixed screen edges (48px lesson / 40px practice, floating over content); on the home spread the facing page leads and the contents spine follows. A 480px breakpoint further shrinks native display text on the flashcard.

## Elevation & Depth

**The Flat-By-Default Rule.** Surfaces are flat at rest. A shadow appears only as a response to state — hover lift, active practice, or a genuinely floating surface. The exceptions are deliberate, one per "this surface is the page" moment: the flashcard (shadow-lg, it is the practice), the results card (shadow-lg, it is the moment), the home facing page (shadow-lg, it is the flashcard's kin), the lesson plate (shadow-lg, it is the flashcard's sibling on every lesson), and the deck-complete plate (shadow-lg, it is the practice's closing moment).

### Shadow Vocabulary

- **Rest** (`0 2px 8px rgb(0 0 0 / 10%)`): floating chrome only — FABs, the sticky nav. Never on static cards.
- **Lift** (`0 4px 12px rgb(0 0 0 / 10%)`): hover response on cards, FABs at scale.
- **Float** (`0 8px 32px rgb(0 0 0 / 10%)`): flashcard, results card, home facing page, lesson plate, deck-complete plate.
- **Selected Ring** (`inset 0 0 0 1px var(--primary-color)`): the chosen quiz tile's state mark, drawn inside the border so nothing shifts.
- **Action Glow** (`0 4px 16px rgb(37 99 235 / 30%)`): primary button hover only.

Dark theme strengthens all shadows to 30% black and pairs them with lighter card surfaces rather than deeper ones — depth reads through contrast, not darkness.

## Shapes

A soft radius ladder, never sharp corners: 4px on buttons and inputs, 8px on cards and feedback banners, 12px on quiz option tiles and prominent result actions, 24px on the "moment" surfaces (flashcard, results card, home facing page). Two recurring silhouettes complete the language: the pill (100px) for badges and reveal buttons, and the circle (50%) for navigation and audio FABs.

Borders are 1px Rule Line at rest. Interactivity is expressed by thickening: quiz options and story slips carry a 2px border that thickens to Scholar Blue when chosen (selected also draws the 1px inset Selected Ring); verdict states fill completely. Two heavier printed statements top the ladder: a 2px Ink rule marks the head of a printed list (the test paper's header, the Exercises block, the settings form lines), and the graded paper is the deepest border statement — a 3px tier-colored ring matched to the score tier. The test paper and graded paper also ground themselves in a 135deg tier wash (10%-alpha verdict into Workbook Page, fading out by 55%) — gold, green, blue (Notice Blue info), or orange.

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
