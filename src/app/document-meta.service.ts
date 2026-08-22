import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { THEME_COLOR_DARK, SITE_ORIGIN, descriptionForPath } from './branding';

@Injectable({ providedIn: 'root' })
export class DocumentMetaService {
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);

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
}

function canonicalPathFromUrl(url: string): string {
  const path = url.split('#')[0].split('?')[0];
  if (path === '' || path === '/') return '/';
  return path.endsWith('/') ? path.slice(0, -1) : path;
}
