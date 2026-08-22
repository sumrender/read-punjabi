import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { CONTENT_ROOT, derivePrerenderRoutes } from './lib/prerender-routes.mjs';
import { SITE_ORIGIN } from './lib/site-origin.mjs';

const DIST_DIR = join(process.cwd(), 'dist', 'read-punjabi', 'browser');

if (!existsSync(DIST_DIR)) {
  console.error('Build check FAILED: build output not found. Run "ng build" first.');
  process.exit(1);
}

const FORBIDDEN_ORIGINS = ['fonts.googleapis.com', 'fonts.gstatic.com'];
const REQUIRED_FILES = [
  'fonts/noto-sans-gurmukhi-variable.woff2',
  'fonts/noto-sans-devanagari-variable.woff2',
  'favicon.ico',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'og-image.png',
];

const TEXT_EXTENSIONS = new Set(['.html', '.css', '.js', '.mjs', '.json', '.svg', '.txt', '.xml']);

function collectFiles(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return collectFiles(path);
    return [path];
  });
}

function routeToHtmlPath(route) {
  if (route === '/') return join(DIST_DIR, 'index.html');
  return join(DIST_DIR, route.replace(/^\//, ''), 'index.html');
}

function parseHeadersFile(content) {
  // Cloudflare Pages _headers format: path pattern lines followed by
  // indented "Name: value" lines.
  const rules = [];
  let current = null;
  for (const rawLine of content.split('\n')) {
    const line = rawLine.trimEnd();
    if (!line || line.startsWith('#')) continue;
    if (/^\s/.test(rawLine)) {
      const idx = line.indexOf(':');
      if (current && idx > 0) {
        current.headers.push({
          name: line.slice(0, idx).trim().toLowerCase(),
          value: line.slice(idx + 1).trim(),
        });
      }
    } else {
      current = { path: line.trim(), headers: [] };
      rules.push(current);
    }
  }
  return rules;
}

let failures = [];

function fail(message) {
  failures.push(message);
}

function expect(cond, message) {
  if (!cond) fail(message);
}

// --- Required assets -------------------------------------------------------

for (const required of REQUIRED_FILES) {
  try {
    const bytes = readFileSync(join(DIST_DIR, required));
    if (bytes.length === 0) fail(`Required asset is empty: ${required}`);
  } catch {
    fail(`Required asset missing from build output: ${required}`);
  }
}

// --- No third-party font origins -------------------------------------------

for (const file of collectFiles(DIST_DIR)) {
  if (!TEXT_EXTENSIONS.has(extname(file))) continue;
  const content = readFileSync(file, 'utf8');
  for (const origin of FORBIDDEN_ORIGINS) {
    if (content.includes(origin)) fail(`Third-party font origin "${origin}" referenced in ${file.replace(DIST_DIR, '')}`);
  }
}

// --- Prerendered routes ----------------------------------------------------

const expectedRoutes = derivePrerenderRoutes(CONTENT_ROOT);

expect(
  expectedRoutes.length === 12,
  `Expected exactly 12 derived routes from shipped content, found ${expectedRoutes.length}`,
);

for (const route of expectedRoutes) {
  const htmlPath = routeToHtmlPath(route);
  try {
    const html = readFileSync(htmlPath, 'utf8');
    if (html.length === 0) {
      fail(`Prerendered HTML is empty for ${route}`);
      continue;
    }
    // Server-rendered DOM must live inside <app-root> so hydration can
    // adopt it; an empty app-root means the page was not prerendered.
    const appRootMatch = html.match(/<app-root[^>]*>([\s\S]*?)<\/app-root>/);
    expect(appRootMatch !== null, `No <app-root> in prerendered HTML for ${route}`);
    if (appRootMatch) {
      expect(/<\w/.test(appRootMatch[1]), `<app-root> is empty in prerendered HTML for ${route}`);
    }
  } catch {
    fail(`Expected prerendered HTML missing for route ${route} (${htmlPath.replace(process.cwd() + '/', '')})`);
  }
}

// --- Document head: branding, titles, meta, canonicals ----------------------

const DARK_THEME_COLOR = '#111827';

function expectedTitle(route) {
  if (route === '/') return 'Read Punjabi — learn to read Gurmukhi';
  if (route === '/settings') return 'Settings · Read Punjabi';
  const levelMatch = route.match(/^\/level\/(\d+)/);
  if (levelMatch) {
    const suffix = route.endsWith('/random') ? ' Random Practice' : '';
    return `Level ${levelMatch[1]}${suffix} · Read Punjabi`;
  }
  if (route.startsWith('/lesson/')) return 'Lesson · Read Punjabi';
  return 'Read Punjabi';
}

function findAllTags(html, tagName, attrSelector) {
  const pattern = new RegExp(`<${tagName}\\b[^>]*${attrSelector}[^>]*>`, 'g');
  return [...html.matchAll(pattern)].map((match) => match[0]);
}

function attrValue(tag, attr) {
  const match = tag.match(new RegExp(`${attr}="([^"]*)"`));
  return match ? match[1] : null;
}

for (const route of expectedRoutes) {
  try {
    const html = readFileSync(routeToHtmlPath(route), 'utf8');

    const titleMatch = html.match(/<title>([^<]*)<\/title>/);
    expect(
      titleMatch !== null && titleMatch[1] === expectedTitle(route),
      `Wrong <title> in prerendered HTML for ${route}: got "${titleMatch ? titleMatch[1] : null}", expected "${expectedTitle(route)}"`,
    );

    const descriptions = findAllTags(html, 'meta', 'name="description"');
    expect(
      descriptions.length === 1,
      `Expected exactly one meta description for ${route}, found ${descriptions.length}`,
    );
    expect(
      descriptions.length === 1 && (attrValue(descriptions[0], 'content') || '').length > 0,
      `Empty meta description in prerendered HTML for ${route}`,
    );

    const themeColors = findAllTags(html, 'meta', 'name="theme-color"');
    expect(
      themeColors.length === 1 && attrValue(themeColors[0], 'content') === DARK_THEME_COLOR,
      `meta theme-colour must be exactly one tag with "${DARK_THEME_COLOR}" for ${route}`,
    );

    const canonicals = findAllTags(html, 'link', 'rel="canonical"');
    const expectedCanonical = SITE_ORIGIN + (route === '/' ? '/' : route);
    expect(
      canonicals.length === 1 && attrValue(canonicals[0], 'href') === expectedCanonical,
      `Canonical link must be exactly one tag pointing at "${expectedCanonical}" for ${route}`,
    );

    expect(/<html[^>]*\slang="en"/.test(html), `Document lang must stay "en" for ${route}`);
    expect(
      /<div class="app-content" lang="pa">/.test(html),
      `Content wrapper must carry lang="pa" (default Course) in prerendered HTML for ${route}`,
    );

    const noscriptBlocks = [...html.matchAll(/<noscript>([\s\S]*?)<\/noscript>/g)].map(
      (match) => match[1],
    );
    expect(noscriptBlocks.length > 0, `Noscript fallback missing from prerendered HTML for ${route}`);
    expect(
      noscriptBlocks.some((block) => block.includes('Read Punjabi') && block.includes('<a href=')),
      `Noscript fallback lacks meaningful branded content for ${route}`,
    );
  } catch {
    // Missing file already reported above.
  }
}

// --- Sitemap -----------------------------------------------------------------

const sitemapPath = join(DIST_DIR, 'sitemap.xml');
expect(existsSync(sitemapPath), 'sitemap.xml missing from build output');
if (existsSync(sitemapPath)) {
  const sitemapContent = readFileSync(sitemapPath, 'utf8');
  expect(
    sitemapContent.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'),
    'sitemap.xml must declare the sitemap-0.9 namespace',
  );
  expect(!/<lastmod/i.test(sitemapContent), 'sitemap.xml must not contain lastmod elements');

  const sitemapUrls = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  expect(
    new Set(sitemapUrls).size === sitemapUrls.length,
    'sitemap.xml must not list duplicate URLs',
  );
  const expectedUrls = expectedRoutes.map((route) => SITE_ORIGIN + route);
  for (const url of expectedUrls) {
    expect(
      sitemapUrls.includes(url),
      `sitemap.xml is missing the prerendered URL ${url}`,
    );
  }
  for (const url of sitemapUrls) {
    expect(
      expectedUrls.includes(url),
      `sitemap.xml lists ${url}, which is not a prerendered route`,
    );
  }
}

// --- Robots.txt ---------------------------------------------------------------

const robotsPath = join(DIST_DIR, 'robots.txt');
expect(existsSync(robotsPath), 'robots.txt missing from build output');
if (existsSync(robotsPath)) {
  const robotsContent = readFileSync(robotsPath, 'utf8');
  expect(
    /^Sitemap:\s*https:\/\/read-punjabi\.pages\.dev\/sitemap\.xml$/m.test(robotsContent),
    'robots.txt must reference the sitemap at https://read-punjabi.pages.dev/sitemap.xml',
  );
  expect(/^User-agent:\s*\*$/m.test(robotsContent), 'robots.txt must address all user agents');
}

// --- Structured data (JSON-LD) --------------------------------------------------

function extractJsonLd(html) {
  return [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map((match) => {
      try {
        return JSON.parse(match[1].trim());
      } catch {
        return null;
      }
    })
    .filter((data) => data !== null);
}

try {
  const homeHtml = readFileSync(routeToHtmlPath('/'), 'utf8');
  const homeTagCount = [...homeHtml.matchAll(/<script type="application\/ld\+json"/g)].length;
  const homeBlocks = extractJsonLd(homeHtml);
  expect(
    homeTagCount === 1,
    `Home page must carry exactly one JSON-LD script tag, found ${homeTagCount}`,
  );
  const webApp = homeBlocks.find((block) => block['@type'] === 'WebApplication');
  expect(webApp !== undefined, 'Home page JSON-LD must be a schema.org WebApplication');
  if (webApp) {
    expect(webApp.name === 'Read Punjabi', 'WebApplication JSON-LD must carry the brand name');
    expect(
      webApp.url === `${SITE_ORIGIN}/`,
      'WebApplication JSON-LD must point at the production origin',
    );
  }
} catch {
  fail('Could not read or parse prerendered home HTML for WebApplication JSON-LD');
}

for (const route of expectedRoutes.filter((r) => /^\/level\/\d+$/.test(r))) {
  try {
    const html = readFileSync(routeToHtmlPath(route), 'utf8');
    const blocks = extractJsonLd(html);
    expect(
      blocks.length === 1,
      `Level page must carry exactly one JSON-LD block, found ${blocks.length} parseable for ${route}`,
    );
    const course = blocks.find((block) => block['@type'] === 'Course');
    expect(course !== undefined, `JSON-LD must be a schema.org Course for ${route}`);
    if (course) {
      expect(course.inLanguage === 'pa', `Course JSON-LD must declare inLanguage "pa" for ${route}`);
      expect(
        typeof course.teaches === 'string' && course.teaches.includes('Gurmukhi'),
        `Course JSON-LD must teach Gurmukhi for ${route}`,
      );
      expect(
        course.url === SITE_ORIGIN + route,
        `Course JSON-LD must point at its own canonical URL for ${route}`,
      );
    }
  } catch {
    fail(`Could not read or parse prerendered HTML for Course JSON-LD at ${route}`);
  }
}

// --- Open Graph and Twitter cards ------------------------------------------------

const EXPECTED_OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;

function singleTag(html, tagName, attrSelector) {
  const tags = findAllTags(html, tagName, attrSelector);
  return tags.length === 1 ? attrValue(tags[0], 'content') : null;
}

for (const route of expectedRoutes) {
  try {
    const html = readFileSync(routeToHtmlPath(route), 'utf8');
    const expectedOgUrl = SITE_ORIGIN + route;

    const ogTitle = singleTag(html, 'meta', 'property="og:title"');
    expect(
      ogTitle !== null && ogTitle.length > 0,
      `og:title missing from prerendered HTML for ${route}`,
    );
    expect(
      ogTitle === expectedTitle(route),
      `og:title must match the page title ("${expectedTitle(route)}") for ${route}, got "${ogTitle}"`,
    );

    const ogDescription = singleTag(html, 'meta', 'property="og:description"');
    const metaDescription = singleTag(html, 'meta', 'name="description"');
    expect(
      ogDescription !== null && ogDescription.length > 0,
      `og:description missing from prerendered HTML for ${route}`,
    );
    expect(
      ogDescription === metaDescription,
      `og:description must match the meta description for ${route}`,
    );

    const ogImage = singleTag(html, 'meta', 'property="og:image"');
    expect(
      ogImage === EXPECTED_OG_IMAGE,
      `og:image must point at the placeholder social image (${EXPECTED_OG_IMAGE}) for ${route}, got "${ogImage}"`,
    );

    const ogUrl = singleTag(html, 'meta', 'property="og:url"');
    expect(
      ogUrl === expectedOgUrl,
      `og:url must follow the stripped canonical URL (${expectedOgUrl}) for ${route}, got "${ogUrl}"`,
    );

    expect(
      singleTag(html, 'meta', 'property="og:type"') === 'website',
      `og:type must be "website" for ${route}`,
    );

    expect(
      singleTag(html, 'meta', 'name="twitter:card"') === 'summary_large_image',
      `twitter:card must be "summary_large_image" for ${route}`,
    );
    expect(
      singleTag(html, 'meta', 'name="twitter:title"') === ogTitle,
      `twitter:title must match og:title for ${route}`,
    );
    expect(
      singleTag(html, 'meta', 'name="twitter:description"') === ogDescription,
      `twitter:description must match og:description for ${route}`,
    );
    expect(
      singleTag(html, 'meta', 'name="twitter:image"') === EXPECTED_OG_IMAGE,
      `twitter:image must point at the placeholder social image for ${route}`,
    );
  } catch {
    // Missing file already reported above.
  }
}

// --- Visible Gurmukhi/Latin content without JavaScript ----------------------

const GURMUKHI = /[\u0A00-\u0A7F]/;

for (const route of expectedRoutes.filter((r) => r.startsWith('/level/'))) {
  try {
    const html = readFileSync(routeToHtmlPath(route), 'utf8');
    expect(GURMUKHI.test(html), `No Gurmukhi content visible in prerendered HTML for ${route}`);
  } catch {
    // Missing file already reported above.
  }
}

try {
  const letterHtml = readFileSync(routeToHtmlPath('/lesson/letter-1'), 'utf8');
  expect(GURMUKHI.test(letterHtml), 'No Gurmukhi letter markup in prerendered /lesson/letter-1');
  expect(
    letterHtml.includes('app-lesson-viewer'),
    'Lesson viewer markup missing from prerendered /lesson/letter-1',
  );
} catch {
  fail('Could not read prerendered /lesson/letter-1 HTML');
}

// --- Hydration markers ------------------------------------------------------

for (const route of expectedRoutes) {
  try {
    const html = readFileSync(routeToHtmlPath(route), 'utf8');
    expect(
      html.includes('ng-server-context'),
      `Hydration marker (ng-server-context) missing from prerendered HTML for ${route}`,
    );
  } catch {
    // Missing file already reported above.
  }
}

// --- Lazy routes: more than one JS chunk ------------------------------------

const jsChunks = collectFiles(DIST_DIR).filter((f) => extname(f) === '.js' && f.includes('-'));
expect(jsChunks.length > 1, `Expected more than one hashed JS chunk (lazy routes), found ${jsChunks.length}`);

// --- Zoneless output: no zone.js anywhere -----------------------------------

for (const file of collectFiles(DIST_DIR)) {
  if (extname(file) !== '.js') continue;
  const content = readFileSync(file, 'utf8');
  if (/__zone_symbol__|zone\.js/.test(content)) {
    fail(`Zone.js payload found in ${file.replace(DIST_DIR, '')}; app must stay zoneless`);
  }
}

// --- Headers file ------------------------------------------------------------

const headersPath = join(DIST_DIR, '_headers');
if (!existsSync(headersPath)) {
  fail('_headers file missing from build output');
} else {
  const rules = parseHeadersFile(readFileSync(headersPath, 'utf8'));

  function findRule(pathPattern) {
    return rules.find((r) => r.path === pathPattern);
  }

  function headerValue(rule, name) {
    if (!rule) return null;
    const header = rule.headers.find((h) => h.name === name.toLowerCase());
    return header ? header.value : null;
  }

  function expectSecurityHeader(name, predicate, label) {
    const value = headerValue(findRule('/*'), name);
    if (value === null) {
      fail(`_headers: ${label || name} missing on /* rule`);
    } else if (!predicate(value)) {
      fail(`_headers: ${label || name} has unexpected value "${value}"`);
    }
  }

  expectSecurityHeader('x-content-type-options', (v) => v.toLowerCase() === 'nosniff', 'nosniff');
  expectSecurityHeader('x-frame-options', (v) => /^(DENY|SAMEORIGIN)$/i.test(v), 'frame denial');
  expectSecurityHeader(
    'referrer-policy',
    (v) => /^(no-referrer|strict-origin-when-cross-origin)$/i.test(v),
    'referrer policy',
  );
  expectSecurityHeader(
    'permissions-policy',
    (v) => v.length > 0 && !/[a-z]+=https?:|(^|,)\s*\*/.test(v),
    'locked-down Permissions-Policy',
  );
  expectSecurityHeader(
    'strict-transport-security',
    (v) => /max-age=(\d+)/.test(v) && Number(v.match(/max-age=(\d+)/)[1]) >= 31536000,
    'HSTS',
  );

  const immutableYear = (v) => /max-age=31536000/i.test(v) && /immutable/i.test(v);

  const assetRule =
    rules.find((r) => r.path.endsWith('*.js')) ||
    rules.find((r) => r.path.includes('*.js') || r.path.includes('*.css'));
  if (!assetRule || !immutableYear(headerValue(assetRule, 'cache-control') || '')) {
    fail('_headers: hashed assets (*.js/*.css) must get year-long immutable caching');
  }

  const fontsRule = rules.find((r) => /^\/fonts\/\*$/.test(r.path));
  if (!fontsRule || !immutableYear(headerValue(fontsRule, 'cache-control') || '')) {
    fail('_headers: fonts must get year-long immutable caching');
  }

  const htmlRules = rules.filter((r) => r.path === '/index.html' || r.path.endsWith('*.html'));
  const htmlMustRevalidate = htmlRules.some((r) =>
    /must-revalidate/i.test(headerValue(r, 'cache-control') || ''),
  );
  if (!htmlMustRevalidate) {
    fail('_headers: HTML entry documents must use must-revalidate caching');
  }
}

// --- CSR fallback for interactive-only routes -------------------------------

const redirectsPath = join(DIST_DIR, '_redirects');
const INTERACTIVE_FALLBACKS = ['/quiz/*', '/level/*/random'];
if (!existsSync(redirectsPath)) {
  fail('_redirects file missing from build output (CSR fallback for quiz/random deep links)');
} else {
  const redirectsContent = readFileSync(redirectsPath, 'utf8');
  for (const pattern of INTERACTIVE_FALLBACKS) {
    // Cloudflare strips ".html" from _redirects targets, so the CSR shell is
    // referenced by its extension-less pretty URL (/index.csr).
    const rewrite = new RegExp(`^${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s+/index\\.csr\\s+200\\s*$`, 'm');
    expect(
      rewrite.test(redirectsContent),
      `_redirects: ${pattern} must rewrite to the /index.csr shell with status 200`,
    );
  }
  try {
    readFileSync(join(DIST_DIR, 'index.csr.html'), 'utf8');
  } catch {
    fail('index.csr.html missing from build output (CSR fallback shell)');
  }
}

if (failures.length > 0) {
  console.error(`\nBuild check FAILED (${failures.length} problem${failures.length > 1 ? 's' : ''}):`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log('\nBuild check passed: assets present, twelve prerendered routes with real content, branded titles/descriptions/canonicals, language markup, noscript fallback, sitemap equals the prerendered route set, robots.txt, JSON-LD structured data, OG/Twitter cards, lazy chunks, zoneless output, and headers verified.');
