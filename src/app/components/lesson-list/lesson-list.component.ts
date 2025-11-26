import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LessonService } from '../../services/lesson.service';
import { LessonItem } from '../../models/lesson-item.interface';

@Component({
  selector: 'app-lesson-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lesson-list.component.html',
  styleUrl: './lesson-list.component.scss'
})
export class LessonListComponent implements OnInit {
  level: number = 1;
  lessons: LessonItem[] = [];
  loading: boolean = false;
  levelTitle: string = '';

  private readonly levelTitles: Record<number, string> = {
    1: 'Alphabet Recognition',
    2: 'Words',
    3: 'Short Sentences',
    4: 'Paragraphs',
    5: 'Stories'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lessonService: LessonService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const levelParam = params['levelId'];
      this.level = parseInt(levelParam, 10);
      
      if (isNaN(this.level) || this.level < 1 || this.level > 5) {
        this.router.navigate(['/']);
        return;
      }

      this.levelTitle = this.levelTitles[this.level] || `Level ${this.level}`;
      this.loadLessons();
    });
  }

  loadLessons(): void {
    console.log('Loading lessons for level:', this.level);
    this.loading = true;
    this.lessonService.getLessonsByLevel(this.level).subscribe({
      next: (lessons) => {
        console.log('Lessons loaded:', lessons);
        this.lessons = lessons;
        this.loading = false;
        console.log('loading state: ', this.loading);
      },
      error: (error) => {
        console.error('Error loading lessons:', error);
        this.lessons = [];
        this.loading = false;
      }
    });
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  goToLesson(lessonId: string): void {
    this.router.navigate(['/lesson', lessonId]);
  }

  getLessonTypeLabel(type: LessonItem['type']): string {
    const labels: Record<LessonItem['type'], string> = {
      letter: 'Letter',
      word: 'Word',
      sentence: 'Sentence',
      paragraph: 'Paragraph',
      story: 'Story'
    };
    return labels[type] || type;
  }
}

