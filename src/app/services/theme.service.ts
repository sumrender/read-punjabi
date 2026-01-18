import { Injectable, signal, effect, inject } from '@angular/core';
import { AppConfig } from '../configuration/config';
import { LanguageService } from './language.service';

export type Theme = 'light' | 'dark';
export type FontSize = 'small' | 'medium' | 'large' | 'xlarge';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private languageService = inject(LanguageService);
  private config = this.languageService.currentLanguage;

  private get THEME_KEY(): string {
    return `${this.config().localStoragePrefix}-theme`;
  }

  private get FONT_SIZE_KEY(): string {
    return `${this.config().localStoragePrefix}-font-size`;
  }

  readonly currentTheme = signal<Theme>(this.loadTheme());
  readonly currentFontSize = signal<FontSize>(this.loadFontSize());

  constructor() {
    // Apply theme on initialization
    this.applyTheme(this.currentTheme());

    // Apply font size on initialization
    this.applyFontSize(this.currentFontSize());

    // Apply native font family on initialization
    this.applyNativeFontFamily();

    // Persist theme changes to localStorage
    effect(() => {
      const theme = this.currentTheme();
      localStorage.setItem(this.THEME_KEY, theme);
      this.applyTheme(theme);
    });

    // Persist font size changes to localStorage
    effect(() => {
      const fontSize = this.currentFontSize();
      localStorage.setItem(this.FONT_SIZE_KEY, fontSize);
      this.applyFontSize(fontSize);
    });

    // Update native font family when language changes
    effect(() => {
      const config = this.config();
      this.applyNativeFontFamily();
    });
  }

  /**
   * Load theme from localStorage or default to 'light'
   */
  private loadTheme(): Theme {
    const saved = localStorage.getItem(this.THEME_KEY);
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  }

  /**
   * Load font size from localStorage or default to 'medium'
   */
  private loadFontSize(): FontSize {
    const saved = localStorage.getItem(this.FONT_SIZE_KEY);
    return (saved === 'small' || saved === 'medium' || saved === 'large' || saved === 'xlarge') 
      ? saved 
      : 'medium';
  }

  /**
   * Apply theme to document
   */
  private applyTheme(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
  }

  /**
   * Apply font size to document
   */
  private applyFontSize(fontSize: FontSize): void {
    document.documentElement.setAttribute('data-font-size', fontSize);
  }

  /**
   * Apply native font family to document
   */
  private applyNativeFontFamily(): void {
    document.documentElement.style.setProperty('--native-font-family', this.config().fontFamily);
  }

  /**
   * Toggle between light and dark theme
   */
  toggleTheme(): void {
    const newTheme: Theme = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.currentTheme.set(newTheme);
  }

  /**
   * Set theme explicitly
   */
  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
  }

  /**
   * Set font size
   */
  setFontSize(fontSize: FontSize): void {
    this.currentFontSize.set(fontSize);
  }

  /**
   * Get font size multiplier
   */
  getFontSizeMultiplier(): number {
    const fontSize = this.currentFontSize();
    switch (fontSize) {
      case 'small':
        return AppConfig.fontSizeMultipliers.small;
      case 'medium':
        return AppConfig.fontSizeMultipliers.medium;
      case 'large':
        return AppConfig.fontSizeMultipliers.large;
      case 'xlarge':
        return AppConfig.fontSizeMultipliers.xlarge;
      default:
        return AppConfig.fontSizeMultipliers.medium;
    }
  }
}

