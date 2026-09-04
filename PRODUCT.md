# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Punjabi speakers (adults and teens, often in the diaspora) who can speak and understand Punjabi but cannot read Gurmukhi. They arrive self-motivated, learning independently in short self-paced sessions, frequently on a phone. A secondary audience inside the same app: the same kind of learner who wants Hindi (Devanagari) instead of Punjabi. Confirmed against the PRD (2026-09-04): audience as written.

## Product Purpose

Read Punjabi is a free browser app that takes a learner from zero literacy to basic reading comprehension in Gurmukhi. Content is organised as five numbered levels (alphabet recognition → words → short sentences → paragraphs → stories); each level has one lesson page, graded quizzes, and ungraded random practice. Success means a learner can navigate all five levels intuitively, stay focused while doing it, and finish able to read simple Punjabi text with confidence.

## Positioning

A zero-barrier literacy tool: no account, no payment, no tracking, no backend — it runs entirely in the browser on static content, instantly. Neighbouring language-learning products cannot truthfully copy this because their product depends on accounts, servers, and engagement mechanics. It is publicly branded **Read Punjabi** with a single URL set; Hindi is a secondary course inside it, not a competing brand (ADR 0001).

## Operating Context

- Self-paced, independent learning; no teacher, classroom, or curriculum enforcement. Learners choose levels, lessons, quizzes, and practice freely.
- Mobile-first use is the norm; desktop is a comfortable secondary case.
- Deployed as a static site on Cloudflare Pages at `read-punjabi.pages.dev`; all content lives as JSON in this repo.
- Private, casual sessions: learners may skip ahead, retry quizzes repeatedly, or reset random-practice history at will. Nothing is graded against them.

## Capabilities and Constraints

- **Courses**: Punjabi (Gurmukhi, default) and Hindi (Devanagari). Exactly one active course per visitor, selected client-side (Settings or `?lang=hi`). One URL set; canonical URLs strip the query param (ADR 0001 — binding).
- **Static prerendering**: fully static output served by Cloudflare Pages; no server, no SSR (ADR 0002 — binding). Content is repo JSON only.
- **Per level (1–5)**: one lesson (ordered Letters with native glyph, transliteration, audio ref), quizzes (multiple-choice, fill-blank, multiple-blanks, story-sequencing formats), and Random Practice (batch of 10 unread items, read-state and reset persisted in localStorage).
- **Settings**: course, font size, dark/light theme — persisted client-side.
- **No backend, no accounts, no tracking, no analytics, no gamification.** Progress tracking beyond per-feature localStorage remains out of scope by PRD decision.
- **Audio is planned but not recorded**: JSON references `assets/audio/**` paths, but no audio files exist. The UI must not advertise or depend on audio until real assets are added (confirmed 2026-09-04). Do not fabricate audio assets.
- PWA service worker for offline caching (`ngsw-config.json`).
- Stack constraint: Angular 21, TypeScript strict mode (no `any`), SCSS with CSS variables, self-hosted Noto Sans Gurmukhi / Noto Sans Devanagari variable fonts.

## Brand Commitments

- Name: **Read Punjabi** — binding public identity; Hindi must never appear as a separate brand or route prefix.
- Voice so far is plain, warm, and encouraging (see branding.ts page descriptions and quiz feedback copy).

## Evidence on Hand

- Real curriculum content: `src/assets/{punjabi,hindi}/{lessons,quizzes,random}/*.json`.
- PRDs for the MVP, quiz system, and random practice (`docs/prd-01.md`, `prd-02.md`, `prd-03.md`); domain glossary (`CONTEXT.md`); binding ADRs (`docs/adr/`).
- Public copy of record: `public/llms.txt`, `src/app/branding.ts`.
- **Absences that must not be fabricated**: no audio files, no testimonials/case studies/press, no user research, no benchmarks. Nothing here authorizes inventing claims on the user's behalf.

## Product Principles

1. **Reading is the product.** Every screen serves the learner reading a script they don't yet read; the interface recedes before the native text.
2. **Zero barriers.** Free, instant, no account, no server dependency — any friction added anywhere is a regression of the core promise.
3. **Progressive confidence.** Level structure, scaffolding (transliteration, meaning, audio when it lands), and feedback exist to build courage, never to judge or gate.
4. **Privacy is the identity.** Client-only state and static content are features to protect in every design and technical decision.
5. **Hindi is a guest, not a sibling.** One app, one brand, one URL set; course switching must never fragment the experience.

## Accessibility & Inclusion

- PRD-standard: 100/100 Lighthouse accessibility score; ARIA labels, keyboard navigation, and screen-reader feedback are required in feature specs.
- The core need is typography legibility for a non-Latin script at variable sizes (font-size setting exists for a reason).
- Learners have low native-script literacy by definition — reliance on Gurmukhi/Devanagari alone for labels or instructions would exclude the audience.
