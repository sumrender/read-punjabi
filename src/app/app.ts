import { Component, inject, effect } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private themeService = inject(ThemeService);
  private languageService = inject(LanguageService);
  private titleService = inject(Title);
  protected config = this.languageService.currentLanguage;

  constructor() {
    // Set initial title
    this.titleService.setTitle(this.config().appName);

    // Update title when language changes
    effect(() => {
      const config = this.config();
      this.titleService.setTitle(config.appName);
    });
  }
}
