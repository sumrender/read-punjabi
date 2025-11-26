import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService, Theme, FontSize } from '../../services/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  readonly themes: { value: Theme; label: string }[] = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' }
  ];

  readonly fontSizes: { value: FontSize; label: string }[] = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'xlarge', label: 'Extra Large' }
  ];

  readonly currentTheme = computed(() => this.themeService.currentTheme());
  readonly currentFontSize = computed(() => this.themeService.currentFontSize());

  constructor(private themeService: ThemeService) {}

  setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }

  setFontSize(fontSize: FontSize): void {
    this.themeService.setFontSize(fontSize);
  }
}

