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
  native-glyph:
    fontFamily: "'Noto Sans Gurmukhi', sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.2
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
    padding: "1.5rem"
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

Density is low and rhythm is predictable: one container, generous section spacing (2–3rem), centered content, mobile-first. Interaction is "soft, patient, precise" — 0.2s eased transitions, gentle hover lifts, instant but calm feedback. The voice is warm, plain, and encouraging; the visuals follow the same rule. Celebration exists (gold, a bouncing trophy, a subtle gradient wash) but only as the honest final beat of a completed quiz — never as ambient gamification.

**Key Characteristics:**

- Paper-clear light theme and true-night dark theme; both driven by one semantic variable set
- One accent (Scholar Blue) for action and focus; traffic-light colors reserved for learning verdicts
- Native script always set in self-hosted Noto Sans Gurmukhi/Devanagari at display sizes
- Flat surfaces at rest; shadow appears as a response to state
- Soft radius ladder (4 → 8 → 12 → 24px) with pill badges and circular navigation FABs
- A single 768px breakpoint collapses every layout to a single centered column

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
- **Celebration Gold** (#ffd700): the single highest tier of quiz results — the "Excellent" border and its gradient wash. Used nowhere else.

All feedback colors pair a saturated stroke/text with a 10%-alpha (15% in dark) background wash of the same hue.

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
- **Label** (700, 0.75rem, +1.5px letter-spacing, uppercase): type badges ("LETTER", "WORD"); the looser 0.5px variant appears on the lesson-type tag.
- **Native Glyph** (700, 2–5rem scale, Gurmukhi/Devanagari): the item being learned. Size follows the user's font-size setting (small 2rem → xlarge 5rem); the practice flashcard shows it at 8rem (5rem mobile, 4rem long text). Transliteration renders under it at 1.5rem italic, Quiet Text.

The user-selectable base size (`data-font-size`: small 0.875rem → xlarge 1.5rem) scales the entire rem-based system, not just the native text.

### Named Rules

**The Script Leads Rule.** Every Gurmukhi/Devanagari string is set in the native font family — never the UI stack, never italic, never small. The interface never relies on the script alone to communicate: labels and instructions are always in the learner's reading language (English/transliteration).

## Layout

One centered column per page inside a 1200px max-width container (Settings narrows to 600px, quiz questions to 800px, the practice flashcard to 700px). Page padding is 2rem 1rem, dropping to 1rem under 768px. Content is center-aligned by default; headers on list pages align left with their back button.

Rhythm is a fixed ladder: 1rem within components, 1.5–2rem between a heading and its content, 3rem between page sections. Grids are `auto-fit` with minimums tuned to content — level cards 280px, quiz cards 200px, letter tiles 120px, gaps 1–1.5rem.

A single 768px breakpoint collapses every multi-column layout to one column, converts control rows to stacked full-width buttons, and moves navigation FABs to fixed screen edges (48px lesson / 40px practice, floating over content). A 480px breakpoint further shrinks native display text on the flashcard.

## Elevation & Depth

**The Flat-By-Default Rule.** Surfaces are flat at rest. A shadow appears only as a response to state — hover lift, active practice, or a genuinely floating surface. The exceptions are deliberate: the flashcard (shadow-lg, it is the page) and the results card (shadow-lg, it is the moment).

### Shadow Vocabulary

- **Rest** (`0 2px 8px rgb(0 0 0 / 10%)`): floating chrome only — FABs, the sticky nav. Never on static cards.
- **Lift** (`0 4px 12px rgb(0 0 0 / 10%)`): hover response on cards, FABs at scale.
- **Float** (`0 8px 32px rgb(0 0 0 / 10%)`): flashcard, results card.
- **Action Glow** (`0 4px 16px rgb(37 99 235 / 30%)`): primary button hover only.

Dark theme strengthens all shadows to 30% black and pairs them with lighter card surfaces rather than deeper ones — depth reads through contrast, not darkness.

## Shapes

A soft radius ladder, never sharp corners: 4px on buttons and inputs, 8px on cards and feedback banners, 12px on quiz option tiles and prominent result actions, 24px on the two "moment" surfaces (flashcard, results card). Two recurring silhouettes complete the language: the pill (100px) for badges and reveal buttons, and the circle (50%) for navigation and audio FABs.

Borders are 1px Rule Line at rest. Interactivity is expressed by thickening: quiz options carry a 2px border that grows to 3px when selected; verdict states fill completely. The results card is the deepest border statement — a 3px colored ring matched to the score tier.

## Components

### Buttons

- **Shape:** soft 4px radius (12px on the large quiz-results actions); padding 0.75rem 1.5rem standard.
- **Primary:** Scholar Blue fill, Paper text; hover deepens to #1d4ed8 with the Action Glow shadow and a −2px lift.
- **Secondary / Ghost:** transparent or Paper fill, 1px Rule Line border, Ink text; hover brings the Highlight wash and a Scholar Blue border. Text-underline links with 4px underline-offset are the tertiary voice.
- **Toggle (aria-pressed):** a ghost control that fills Scholar Blue with Paper text when active — the transliteration/meaning/audio pattern.
- **Focus:** every interactive element gets a 2px Scholar Blue outline with 2px offset (`:focus-visible`).

### Cards / Containers

- **Corner Style:** 8px radius.
- **Background:** Workbook Page with a 1px Rule Line border; 2rem internal padding.
- **Hover:** −4px translateY, Lift shadow, 2px Scholar Blue outline — cards are clickable and it shows.
- **Quiz results card:** 24px radius, 3px tier-colored ring (gold → green → blue → orange), a 135deg gradient from the tier's 5%-alpha wash into Workbook Page, slide-in-up entrance.

### Flashcard (signature component)

The system's hero. 700px max-width, 24px radius, Float shadow at rest, and a 6px gradient bar (Scholar Blue → deep) across the top that turns Correct Green when the item is marked read. Header holds an uppercase pill badge (10%-alpha Scholar Blue wash) and a custom checkmark toggle (24px, 6px radius, green fill on check). Body centers the native glyph at 8rem. Footer is a Highlight-wash strip holding the 56px circular audio FAB (Scholar Blue, pulses green while playing). Prev/next are 64px circular FABs flanking it, scaling 1.1 on hover with a Scholar Blue border.

### Quiz Options

- **Shape:** 12px radius tiles, min-height 80px, 2px border, native script at 2rem.
- **States:** hover lifts −2px with Scholar Blue border; correct fills Correct Green (white text, pulse); incorrect fills Mistake Red (white text, shake) then disables to Pencil Gray at 50% opacity; feedback echoes below as a tinted banner (10% wash, saturated text, 8px radius).

### Navigation

Sticky top bar on Workbook Page with a bottom Rule Line; brand wordmark at 1.25rem/600 left, text links right in Quiet Text that turn Scholar Blue on hover. It is chrome, not a design moment — on small screens it simply tightens.

### Inputs / Fields

Settings rows are full-width selectable cards (Workbook Page, 4px radius, 1rem padding) with `accent-color: Scholar Blue` native radios; the checked label bolds and turns Scholar Blue. Hover brings the Highlight wash and a Scholar Blue border.

## Do's and Don'ts

### Do:

- **Do** set every Gurmukhi/Devanagari string in `var(--native-font-family)` and give it display scale — the script is the page's typographic event.
- **Do** keep the 2px Scholar Blue `:focus-visible` outline with 2px offset on every interactive element.
- **Do** answer every interaction within 0.2s `ease` (0.3s for theme changes); feedback is instant but calm.
- **Do** pair every verdict color with its 10%-alpha wash when it becomes a surface.
- **Do** express interactivity through the state ladder first: border thickens → fill → lift → shadow.

### Don't:

- **Don't** introduce a second accent color; if something wants attention, it is Scholar Blue or a traffic-light verdict.
- **Don't** put shadows on static, non-interactive surfaces (flashcard and results card are the only sanctioned exceptions).
- **Don't** rely on the native script alone for any label, instruction, or navigation — the audience, by definition, cannot read it yet.
- **Don't** gamify: no streaks, badges, leaderboards, or ambient celebration outside the quiz results moment.
- **Don't** advertise or surface audio controls until real audio assets exist.
- **Don't** add new breakpoints beyond 768px/480px or containers wider than 1200px.
