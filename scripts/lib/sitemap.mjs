/**
 * Build a sitemap XML document from an ordered route list.
 *
 * The sitemap lists exactly the prerendered pages — no more, no less — and
 * never emits <lastmod>: a stale lastmod is worse than none.
 */
export function buildSitemapXml(routes, siteOrigin) {
  const urls = routes.map((route) => `  <url><loc>${siteOrigin}${route}</loc></url>`);
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
}
