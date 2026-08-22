import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router, TitleStrategy } from '@angular/router';
import { filter } from 'rxjs';
import {
  BRAND_NAME,
  OG_IMAGE_PATH,
  SITE_ORIGIN,
  THEME_COLOR_DARK,
  TWITTER_CARD_TYPE,
  descriptionForPath,
} from './branding';
import { structuredDataForPath } from './structured-data';

const JSON_LD_SELECTOR = 'script[type="application/ld+json"]';

@Injectable({ providedIn: 'root' })
export class DocumentMetaService {
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly titleStrategy = inject(TitleStrategy);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => this.apply(event.urlAfterRedirects));
    this.apply(this.router.url);
  }

  private apply(url: string): void {
    const path = canonicalPathFromUrl(url);
    this.meta.updateTag({ name: 'description', content: descriptionForPath(path) });
    this.meta.updateTag({ name: 'theme-color', content: THEME_COLOR_DARK });
    this.setCanonical(path);
    this.setSocialCards(path);
    this.setStructuredData(path);
  }

  private setCanonical(path: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', `${SITE_ORIGIN}${path}`);
  }

  private setSocialCards(path: string): void {
    const title = this.resolvedTitle();
    const description = descriptionForPath(path);
    const image = `${SITE_ORIGIN}${OG_IMAGE_PATH}`;
    const pageUrl = `${SITE_ORIGIN}${path}`;

    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: pageUrl });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    this.meta.updateTag({ name: 'twitter:card', content: TWITTER_CARD_TYPE });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
  }

  /**
   * The title the router's TitleStrategy resolves for the current snapshot —
   * the same string that lands in <title>, read straight from the route
   * configs so Open Graph titles can never drift from them.
   */
  private resolvedTitle(): string {
    return this.titleStrategy.buildTitle(this.router.routerState.snapshot) ?? BRAND_NAME;
  }

  private setStructuredData(path: string): void {
    const data = structuredDataForPath(path);
    let script = this.document.querySelector<HTMLScriptElement>(JSON_LD_SELECTOR);
    if (!data) {
      script?.remove();
      return;
    }
    if (!script) {
      script = this.document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }
}

function canonicalPathFromUrl(url: string): string {
  const path = url.split('#')[0].split('?')[0];
  if (path === '' || path === '/') return '/';
  return path.endsWith('/') ? path.slice(0, -1) : path;
}
