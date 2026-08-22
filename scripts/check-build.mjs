import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { CONTENT_ROOT, derivePrerenderRoutes } from './lib/prerender-routes.mjs';

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

console.log('\nBuild check passed: assets present, twelve prerendered routes with real content, lazy chunks, zoneless output, and headers verified.');
