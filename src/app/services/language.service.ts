import { Injectable, signal } from '@angular/core';
import { LanguageConfig, PunjabiConfig } from '../configuration/languages/Punjabi';
import { AvailableLanguages } from '../configuration/languages';

const LANGUAGE_STORAGE_KEY = 'selected-language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
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
        return language.config;
      }
    }
    return PunjabiConfig;
  }
}
