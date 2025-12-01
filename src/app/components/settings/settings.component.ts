import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService, Theme, FontSize } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  private themeService = inject(ThemeService);
  private languageService = inject(LanguageService);

  readonly themes = signal<{ value: Theme; label: string }[]>([
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' }
  ]);

  readonly fontSizes = signal<{ value: FontSize; label: string }[]>([
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'xlarge', label: 'Extra Large' }
  ]);

  readonly languages = signal(this.languageService.availableLanguages.map(lang => ({
    value: lang.value,
    label: lang.label
  })));

  readonly currentTheme = computed(() => this.themeService.currentTheme());
  readonly currentFontSize = computed(() => this.themeService.currentFontSize());
  readonly currentLanguage = computed(() => {
    const config = this.languageService.config;
    return this.languageService.availableLanguages.find(lang => lang.config === config)?.value || 'punjabi';
  });

  setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }

  setFontSize(fontSize: FontSize): void {
    this.themeService.setFontSize(fontSize);
  }

  setLanguage(languageValue: string): void {
    this.languageService.setLanguage(languageValue);
  }
}

