import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { CONTENT_ROOT, derivePrerenderRoutes } from './lib/prerender-routes.mjs';
import { buildSitemapXml } from './lib/sitemap.mjs';
import { SITE_ORIGIN } from './lib/site-origin.mjs';

const OUTPUT_FILE = join(process.cwd(), 'public', 'sitemap.xml');

const routes = derivePrerenderRoutes(CONTENT_ROOT);
writeFileSync(OUTPUT_FILE, buildSitemapXml(routes, SITE_ORIGIN));
console.log(`Wrote sitemap with ${routes.length} URLs to ${OUTPUT_FILE}`);
