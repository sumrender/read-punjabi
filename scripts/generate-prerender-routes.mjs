import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { CONTENT_ROOT, derivePrerenderRoutes } from './lib/prerender-routes.mjs';

const OUTPUT_FILE = join(process.cwd(), 'prerender-routes.txt');

const routes = derivePrerenderRoutes(CONTENT_ROOT);
writeFileSync(OUTPUT_FILE, routes.join('\n') + '\n');
console.log(`Wrote ${routes.length} prerender routes to ${OUTPUT_FILE}`);
