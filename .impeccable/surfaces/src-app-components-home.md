---
version: 1
slug: "src-app-components-home"
primary_target: "src/app/components/home"
related_targets: []
---

# Surface brief — Home (`/`, src/app/components/home)

## Scope and visitor mode

Whole-surface rebuild of the home route inside the established workbook world (DESIGN.md). Mode: **Persuade** — land a first-time visitor and start Level 1 within seconds.

## Audience, job, action, proof, constraints

- Audience: Punjabi speakers who cannot read Gurmukhi, arriving from search, usually on a phone.
- Job: orient ("what is this, what will I learn") and convert (Begin Level 1) without marketing noise.
- Proof: the mechanism itself — real curriculum letters (level-1 lesson-1 JSON via LessonService) shown at reading size with transliteration scaffold.
- Constraints: no fabricated content, no audio references, one accent (Scholar Blue), system UI stack + native Noto fonts, 768/480 breakpoints, 1200px container, WCAG per PRODUCT.md, dark theme via existing CSS variables, Hindi course must work identically via LanguageService config.

## Chosen direction and memorable moment

**The Open Workbook** (dealt index 5, seed key 722077e3, code-led). The home is the workbook's front matter rendered as one open spread: a contents spine of five numbered chapters beside the facing page, which shows Level 1 already open — a real specimen letter at reading size with its transliteration. Memorable moment: the specimen calmly cycles through the alphabet's first letters (pause on hover/focus, static under reduced motion) — the visitor watches the course's actual content teach before they click.

## Unresolved decisions

None blocking; copy stays product-truth (config appName/subtitle, existing level titles/descriptions).

Documented deviations from the contract as built (finish-reviewer P3, keep both):
- Badge copy is "Level 1 · Letters" (plural) — reads better for a chapter opener than "Letter".
- Specimen glyph is 8rem (mobile 5rem/4rem) — DESIGN.md's documented flashcard scale, not the contract's "~9rem".

Finish-review follow-ups landed: the sr-only live region announces only user-initiated changes (initial load, dot selection), never ambient cycling; the loading status sits outside the aria-hidden specimen wrapper; leaders are 1px dotted.

## Direction contract

THESIS: The home is the workbook's contents spread — a spine of five chapters, Level 1 already open on the facing page. It refuses the category-default arrangement of hero paragraph plus five equal icon cards.

OWN-WORLD: Paper ground, one ink. Left: a printed-contents column — chapter rows with dotted leaders running to page numbers (the level), hairline rules between rows, quiet descriptions, authored SVG arrows. Right: the facing page in the flashcard family — workbook-page surface, 24px radius, 6px gradient cap, pill badge, the native glyph as the only typographic event, Float shadow. With all content removed it still reads as an open book's spread.

STORY: The visitor understands "a five-chapter workbook; chapter one starts by showing me a real letter I'll learn." They believe it because the specimen is the course's own content, scaffolded with transliteration. They do: read ੳ = Oora, press Begin Level 1, or jump to any chapter from the spine.

FIRST VIEWPORT: Existing nav bar; left-aligned masthead (appName h1, subtitle). Below, the spread fills the viewport: contents column ~42% (heading "Contents", five chapter rows, hairline separators), facing page ~58% (badge "Level 1 · Letter", glyph at ~9rem native, transliteration 1.5rem italic, cycle dots, Begin Level 1 as the single primary action). Mobile: facing page first, spine below.

FORM: The Open Workbook — dealt index 5 of 7, seed key 722077e3.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
