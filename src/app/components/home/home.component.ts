import { Component, signal, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface LevelInfo {
  level: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private router = inject(Router);
  private languageService = inject(LanguageService);
  protected config = this.languageService.currentLanguage;

  readonly levels = signal<LevelInfo[]>([
    {
      level: 1,
      title: 'Alphabet Recognition',
      description: `Learn the ${this.config().ui.levelDescriptions.alphabet}`
    },
    {
      level: 2,
      title: 'Words',
      description: 'Practice reading individual words'
    },
    {
      level: 3,
      title: 'Short Sentences',
      description: 'Read simple sentences'
    },
    {
      level: 4,
      title: 'Paragraphs',
      description: 'Read longer passages'
    },
    {
      level: 5,
      title: 'Stories',
      description: 'Read complete stories'
    }
  ]);

  selectLevel(level: number): void {
    this.router.navigate(['/level', level]);
  }
}
