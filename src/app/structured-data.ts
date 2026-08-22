import { BRAND_NAME, SITE_ORIGIN, SITE_DESCRIPTION, descriptionForPath } from './branding';

export type StructuredData = Record<string, unknown>;

/** schema.org WebApplication block carried by the home page. */
export function webApplicationStructuredData(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: BRAND_NAME,
    url: `${SITE_ORIGIN}/`,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    description: SITE_DESCRIPTION,
    inLanguage: ['en', 'pa'],
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
}

/** schema.org Course block carried by each Level page: teaches Gurmukhi. */
export function courseStructuredData(level: number): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${BRAND_NAME} Level ${level}`,
    description: descriptionForPath(`/level/${level}`),
    url: `${SITE_ORIGIN}/level/${level}`,
    inLanguage: 'pa',
    teaches: 'Gurmukhi',
    provider: { '@type': 'Organization', name: BRAND_NAME, url: `${SITE_ORIGIN}/` },
  };
}

/** The structured data block for a canonical path, or null when none applies. */
export function structuredDataForPath(path: string): StructuredData | null {
  if (path === '/') {
    return webApplicationStructuredData();
  }
  const levelMatch = path.match(/^\/level\/(\d+)$/);
  if (levelMatch) {
    return courseStructuredData(Number(levelMatch[1]));
  }
  return null;
}
