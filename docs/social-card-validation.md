# Manual social-card validation

Ticket: crawlability layer (#8) — acceptance criterion "Manual check documented
via a social-card validator showing a complete preview".

## Local verification (done on the branch)

The prerendered output was served with `python3 -m http.server` from
`dist/read-punjabi/browser` and fetched exactly as a card validator's crawler
would (server-side HTML fetch, no JavaScript):

- `/` serves complete OG/Twitter tags (`og:title`, `og:description`,
  `og:image`, `og:url`, `og:type`, `twitter:card`, `twitter:title`,
  `twitter:description`, `twitter:image`) plus the WebApplication JSON-LD block.
- `/level/2/index.html` serves `og:url` = `https://read-punjabi.pages.dev/level/2`
  and the Course JSON-LD block (`inLanguage: pa`, `teaches: Gurmukhi`).
- `/og-image.png` resolves with HTTP 200 at the origin referenced by the tags.
- The same guarantees are asserted automatically on every build by
  `scripts/check-build.mjs` ("Open Graph and Twitter cards", "Structured data",
  and "Sitemap" sections).

## Post-deploy check (run once against production after merge)

1. Open https://opengraph.xyz?url=https%3A%2F%2Fread-punjabi.pages.dev%2Flevel%2F1
   (or https://www.linkedin.com/post-inspector/).
2. Confirm the preview shows the Read Punjabi placeholder image, the title
   "Level 1 · Read Punjabi", and the level description.
3. Repeat for `/` (title "Read Punjabi — learn to read Gurmukhi").
4. Cross-check https://search.google.com/test/rich-results on `/level/1`
   (Course result detected) and `/` (no errors for WebApplication).

These steps cannot be executed pre-merge because validators fetch the deployed
origin; the branch-local server-side fetch above covers the same bytes that
production will serve.
