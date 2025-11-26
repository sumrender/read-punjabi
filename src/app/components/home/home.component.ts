import { Component } from '@angular/core';
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
  readonly levels: LevelInfo[] = [
    {
      level: 1,
      title: 'Alphabet Recognition',
      description: 'Learn the Gurmukhi alphabet'
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
  ];

  constructor(private router: Router) {}

  selectLevel(level: number): void {
    this.router.navigate(['/level', level]);
  }
}

