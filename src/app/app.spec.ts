import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter, Router, TitleStrategy } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { App } from './app';
import { LanguageService } from './services/language.service';
import { HindiConfig } from './configuration/languages/Hindi';
import { routes } from './app.routes';
import { AppTitleStrategy } from './app-title-strategy';
import {
  BRAND_NAME,
  HOME_TITLE,
  SITE_ORIGIN,
  THEME_COLOR_DARK,
  pageTitle,
} from './branding';

describe('App', () => {
  const boot = (): ComponentFixture<App> => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    return fixture;
  };

  const navigate = async (fixture: ComponentFixture<App>, url: string) => {
    await TestBed.inject(Router).navigateByUrl(url);
    fixture.detectChanges();
  };

  const languageService = () => TestBed.inject(LanguageService);

  const headQuery = (selector: string) => document.head.querySelector(selector);

  beforeEach(async () => {
    localStorage.clear();
    history.replaceState(null, '', '/');
    document.documentElement.setAttribute('lang', 'en');
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter(routes),
        { provide: TitleStrategy, useClass: AppTitleStrategy },
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  describe('branding and titles', () => {
    it('should show the brand title on home', async () => {
      const fixture = boot();
      await navigate(fixture, '/');
      expect(TestBed.inject(Title).getTitle()).toBe(HOME_TITLE);
      expect(document.title).toContain(BRAND_NAME);
    });

    it('should set per-route titles following the agreed pattern', async () => {
      const fixture = boot();

      await navigate(fixture, '/settings');
      expect(TestBed.inject(Title).getTitle()).toBe(pageTitle('Settings'));

      await navigate(fixture, '/level/2');
      expect(TestBed.inject(Title).getTitle()).toBe(pageTitle('Level 2'));

      await navigate(fixture, '/lesson/letter-1');
      expect(TestBed.inject(Title).getTitle()).toBe(pageTitle('Lesson'));
    });

    it('should keep the brand title when the Course switches', async () => {
      const fixture = boot();
      await navigate(fixture, '/');

      languageService().setLanguage('hindi');
      expect(TestBed.inject(Title).getTitle()).toBe(HOME_TITLE);
      expect(TestBed.inject(Title).getTitle()).not.toBe(HindiConfig.appName);
    });
  });

  describe('meta description and theme colour', () => {
    it('should carry an English meta description on every page', async () => {
      const fixture = boot();

      const homeDescription = headQuery('meta[name="description"]');
      expect(homeDescription?.getAttribute('content')?.length ?? 0).toBeGreaterThan(0);

      await navigate(fixture, '/settings');
      const settingsDescription = headQuery('meta[name="description"]');
      expect(settingsDescription?.getAttribute('content')?.length ?? 0).toBeGreaterThan(0);
    });

    it('should declare a theme colour matching the dark theme', () => {
      boot();
      const themeColor = headQuery('meta[name="theme-color"]');
      expect(themeColor?.getAttribute('content')).toBe(THEME_COLOR_DARK);
    });
  });

  describe('canonical URLs', () => {
    it('should point the canonical link at the production origin', async () => {
      const fixture = boot();
      await navigate(fixture, '/');
      expect(headQuery('link[rel="canonical"]')?.getAttribute('href')).toBe(`${SITE_ORIGIN}/`);
    });

    it('should strip query parameters from the canonical URL', async () => {
      const fixture = boot();
      await navigate(fixture, '/level/1?utm_source=test&lang=hi');
      const canonical = headQuery('link[rel="canonical"]')?.getAttribute('href');
      expect(canonical).toBe(`${SITE_ORIGIN}/level/1`);
      expect(canonical).not.toContain('?');
    });
  });

  describe('?lang=hi shareable links', () => {
    it('should activate the Hindi Course at startup from the query parameter', () => {
      localStorage.clear();
      history.replaceState(null, '', '/?lang=hi');

      boot();

      expect(languageService().currentLanguage()).toBe(HindiConfig);
      const canonical = headQuery('link[rel="canonical"]')?.getAttribute('href');
      expect(canonical).toBe(`${SITE_ORIGIN}/`);
    });

    it('should ignore unknown lang query parameter values', () => {
      localStorage.clear();
      history.replaceState(null, '', '/?lang=fr');

      boot();

      expect(languageService().currentLanguage().langCode).toBe('pa');
    });
  });

  describe('document language markup', () => {
    it('should keep the document language English while content switches with the Course', () => {
      const fixture = boot();
      expect(document.documentElement.getAttribute('lang')).toBe('en');

      const content = fixture.nativeElement.querySelector('.app-content');
      expect(content?.getAttribute('lang')).toBe('pa');

      languageService().setLanguage('hindi');
      fixture.detectChanges();
      expect(content?.getAttribute('lang')).toBe('hi');

      expect(document.documentElement.getAttribute('lang')).toBe('en');
    });
  });

  describe('navigation chrome', () => {
    it('should render navigation with app name', () => {
      const fixture = boot();
      const compiled = fixture.nativeElement as HTMLElement;
      const navLogo = compiled.querySelector('.nav-logo');

      expect(navLogo).toBeTruthy();
      expect(navLogo?.textContent?.trim()).toBe(languageService().currentLanguage().appName);
    });

    it('should render navigation with settings link', () => {
      const fixture = boot();
      const compiled = fixture.nativeElement as HTMLElement;
      const settingsLink = compiled.querySelector('a[routerLink="/settings"]');

      expect(settingsLink).toBeTruthy();
      expect(settingsLink?.textContent?.trim()).toBe('Settings');
    });
  });
});
