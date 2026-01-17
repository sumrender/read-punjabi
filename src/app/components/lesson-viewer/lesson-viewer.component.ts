import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LessonService } from '../../services/lesson.service';
import { AudioService } from '../../services/audio.service';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';
import { LessonItem } from '../../models/lesson-item.interface';
import { FeatureFlagService } from '../../services/feature-flag.service';

@Component({
  selector: 'app-lesson-viewer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lesson-viewer.component.html',
  styleUrl: './lesson-viewer.component.scss'
})
export class LessonViewerComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private lessonService = inject(LessonService);
  private audioService = inject(AudioService);
  private themeService = inject(ThemeService);
  private languageService = inject(LanguageService);
  private featureFlagService = inject(FeatureFlagService);
  protected config = this.languageService.currentLanguage;

  readonly lesson = signal<LessonItem | null>(null);
  readonly currentLevel = signal<number>(1);
  readonly showTransliteration = signal<boolean>(false);
  readonly showMeaning = signal<boolean>(false);
  readonly isAudioPlaybackEnabled = this.featureFlagService.isAudioPlaybackEnabled();
  
  readonly isPlaying = this.audioService.isPlaying;
  readonly hasNext = signal<boolean>(false);
  readonly hasPrevious = signal<boolean>(false);

  readonly fontSizeClass = computed(() => {
    const multiplier = this.themeService.getFontSizeMultiplier();
    if (multiplier <= 0.875) {
      return 'font-small';
    } else if (multiplier >= 1.5) {
      return 'font-xlarge';
    } else if (multiplier >= 1.25) {
      return 'font-large';
    }
    return 'font-medium';
  });

  readonly lessonTypeLabels = signal<Record<string, string>>({
    letter: 'Letter',
    word: 'Word',
    sentence: 'Sentence',
    paragraph: 'Paragraph',
    story: 'Story'
  });

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

    this.lesson.set(loadedLesson);
    this.currentLevel.set(loadedLesson.level);
    this.lessonService.setCurrentLesson(lessonId);
    
    this.hasNext.set(this.lessonService.hasNextLesson());
    this.hasPrevious.set(this.lessonService.hasPreviousLesson());
  }

  toggleTransliteration(): void {
    this.showTransliteration.update(v => !v);
  }

  toggleMeaning(): void {
    this.showMeaning.update(v => !v);
  }

  playAudio(): void {
    const currentLesson = this.lesson();
    if (!currentLesson) {
      return;
    }

    if (this.isPlaying()) {
      this.audioService.stop();
      return;
    }

    this.audioService.play(currentLesson.audioSrc)
      .catch((error) => {
        console.error('Error playing audio:', error);
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
    this.router.navigate(['/level', this.currentLevel()]);
  }

  getLessonTypeLabel(type: LessonItem['type']): string {
    return this.lessonTypeLabels()[type] || type;
  }
}
