import { Injectable, signal, effect } from '@angular/core';
import { LanguageConfig, PunjabiConfig } from '../configuration/languages/Punjabi';
import { AvailableLanguages } from '../configuration/languages';

const LANGUAGE_STORAGE_KEY = 'selected-language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSignal = signal<LanguageConfig>(this.loadLanguageFromStorage());

  constructor() {
    // Load font when language changes
    effect(() => {
      const config = this.currentLanguageSignal();
      this.loadFont(config.googleFontsUrl);
    });
  }

  get currentLanguage() {
    return this.currentLanguageSignal.asReadonly();
  }

  get config(): LanguageConfig {
    return this.currentLanguageSignal();
  }

  get availableLanguages() {
    return AvailableLanguages;
  }

  setLanguage(languageValue: string): void {
    const language = AvailableLanguages.find(lang => lang.value === languageValue);
    if (language) {
      this.currentLanguageSignal.set(language.config);
      localStorage.setItem(LANGUAGE_STORAGE_KEY, languageValue);
    }
  }

  private loadLanguageFromStorage(): LanguageConfig {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage) {
      const language = AvailableLanguages.find(lang => lang.value === savedLanguage);
      if (language) {
        // Load font for saved language
        this.loadFont(language.config.googleFontsUrl);
        return language.config;
      }
    }
    // Default to Punjabi and load its font
    this.loadFont(PunjabiConfig.googleFontsUrl);
    return PunjabiConfig;
  }

  private loadFont(fontUrl: string): void {
    // Check if font link already exists
    const existingLink = document.querySelector(`link[href="${fontUrl}"]`);
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fontUrl;
      document.head.appendChild(link);
    }
  }
}
