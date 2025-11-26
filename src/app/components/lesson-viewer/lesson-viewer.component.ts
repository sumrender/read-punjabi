import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LessonService } from '../../services/lesson.service';
import { AudioService } from '../../services/audio.service';
import { ThemeService } from '../../services/theme.service';
import { LessonItem } from '../../models/lesson-item.interface';

@Component({
  selector: 'app-lesson-viewer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lesson-viewer.component.html',
  styleUrl: './lesson-viewer.component.scss'
})
export class LessonViewerComponent implements OnInit, OnDestroy {
  lesson: LessonItem | null = null;
  showTransliteration = signal<boolean>(false);
  showMeaning = signal<boolean>(false);
  isPlaying = signal<boolean>(false);
  hasNext = signal<boolean>(false);
  hasPrevious = signal<boolean>(false);
  currentLevel: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lessonService: LessonService,
    private audioService: AudioService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const lessonId = params['lessonId'];
      if (lessonId) {
        this.loadLesson(lessonId);
      }
    });
  }

  ngOnDestroy(): void {
    this.audioService.stop();
  }

  loadLesson(lessonId: string): void {
    const loadedLesson = this.lessonService.getLessonById(lessonId);
    if (!loadedLesson) {
      this.router.navigate(['/']);
      return;
    }

    this.lesson = loadedLesson;
    this.currentLevel = loadedLesson.level;
    this.lessonService.setCurrentLesson(lessonId);
    
    this.hasNext.set(this.lessonService.hasNextLesson());
    this.hasPrevious.set(this.lessonService.hasPreviousLesson());
  }

  toggleTransliteration(): void {
    this.showTransliteration.set(!this.showTransliteration());
  }

  toggleMeaning(): void {
    this.showMeaning.set(!this.showMeaning());
  }

  playAudio(): void {
    if (!this.lesson) {
      return;
    }

    if (this.audioService.isPlaying()) {
      this.audioService.stop();
      this.isPlaying.set(false);
      return;
    }

    this.isPlaying.set(true);
    this.audioService.play(this.lesson.audioSrc)
      .then(() => {
        // Audio will play, check when it ends
        setTimeout(() => {
          this.isPlaying.set(false);
        }, 2000); // Approximate, actual duration would need audio element events
      })
      .catch((error) => {
        console.error('Error playing audio:', error);
        this.isPlaying.set(false);
      });
  }

  goToPrevious(): void {
    const previousLesson = this.lessonService.getPreviousLesson();
    if (previousLesson) {
      this.router.navigate(['/lesson', previousLesson.id]);
    }
  }

  goToNext(): void {
    const nextLesson = this.lessonService.getNextLesson();
    if (nextLesson) {
      this.router.navigate(['/lesson', nextLesson.id]);
    }
  }

  goToLessonList(): void {
    this.router.navigate(['/level', this.currentLevel]);
  }

  getFontSizeClass(): string {
    const multiplier = this.themeService.getFontSizeMultiplier();
    if (multiplier <= 0.875) {
      return 'font-small';
    } else if (multiplier >= 1.5) {
      return 'font-xlarge';
    } else if (multiplier >= 1.25) {
      return 'font-large';
    }
    return 'font-medium';
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

