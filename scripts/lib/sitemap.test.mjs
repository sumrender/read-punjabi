import { describe, expect, it } from 'vitest';
import { buildSitemapXml } from './sitemap.mjs';

const ORIGIN = 'https://read-punjabi.pages.dev';

describe('buildSitemapXml', () => {
  it('wraps one <url> per route in a sitemap-0.9 urlset', () => {
    const xml = buildSitemapXml(['/', '/settings'], ORIGIN);
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml.match(/<url>/g)).toHaveLength(2);
  });

  it('prefixes each route with the site origin as its <loc>', () => {
    const xml = buildSitemapXml(['/', '/level/1'], ORIGIN);
    expect(xml).toContain(`<loc>${ORIGIN}/</loc>`);
    expect(xml).toContain(`<loc>${ORIGIN}/level/1</loc>`);
  });

  it('keeps the given route order and emits no duplicates for distinct routes', () => {
    const routes = ['/', '/settings', '/level/2', '/lesson/word-1'];
    const xml = buildSitemapXml(routes, ORIGIN);
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(locs).toEqual(routes.map((route) => `${ORIGIN}${route}`));
    expect(new Set(locs).size).toBe(locs.length);
  });

  it('never emits lastmod elements — a stale lastmod is worse than none', () => {
    const xml = buildSitemapXml(['/'], ORIGIN);
    expect(xml.includes('lastmod')).toBe(false);
  });
});
