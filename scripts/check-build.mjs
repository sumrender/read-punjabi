import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

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

let failures = [];

for (const required of REQUIRED_FILES) {
  try {
    const bytes = readFileSync(join(DIST_DIR, required));
    if (bytes.length === 0) failures.push(`Required asset is empty: ${required}`);
  } catch {
    failures.push(`Required asset missing from build output: ${required}`);
  }
}

for (const file of collectFiles(DIST_DIR)) {
  if (!TEXT_EXTENSIONS.has(extname(file))) continue;
  const content = readFileSync(file, 'utf8');
  for (const origin of FORBIDDEN_ORIGINS) {
    if (content.includes(origin)) failures.push(`Third-party font origin "${origin}" referenced in ${file.replace(DIST_DIR, '')}`);
  }
}

if (failures.length > 0) {
  console.error(`\nBuild check FAILED (${failures.length} problem${failures.length > 1 ? 's' : ''}):`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log('\nBuild check passed: local assets present, no third-party font origins.');
