import { DOCUMENT } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LanguageConfig, PunjabiConfig } from '../configuration/languages/Punjabi';
import { AvailableLanguages } from '../configuration/languages';

const LANGUAGE_STORAGE_KEY = 'selected-language';

const LANG_QUERY_PARAM_ALIASES: Record<string, string> = {
  pa: 'punjabi',
  hi: 'hindi',
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private currentLanguageSignal = signal<LanguageConfig>(this.loadLanguageFromStorage());

  get currentLanguage() {
    return this.currentLanguageSignal.asReadonly();
  }

  get config(): LanguageConfig {
    return this.currentLanguageSignal();
  }

  get availableLanguages() {
    return AvailableLanguages;
  }

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.activateCourseFromQuery();
    }
  }

  setLanguage(languageValue: string): void {
    const language = AvailableLanguages.find(lang => lang.value === languageValue);
    if (language) {
      this.currentLanguageSignal.set(language.config);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, languageValue);
      }
    }
  }

  private activateCourseFromQuery(): void {
    const requested = new URLSearchParams(this.document.defaultView?.location.search ?? '').get('lang');
    const courseValue = requested ? LANG_QUERY_PARAM_ALIASES[requested.trim().toLowerCase()] : undefined;
    if (courseValue) {
      this.setLanguage(courseValue);
    }
  }

  private loadLanguageFromStorage(): LanguageConfig {
    if (!isPlatformBrowser(this.platformId)) {
      return PunjabiConfig;
    }
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage) {
      const language = AvailableLanguages.find(lang => lang.value === savedLanguage);
      if (language) {
        return language.config;
      }
    }
    return PunjabiConfig;
  }
}
