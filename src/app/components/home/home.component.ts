import { Component, OnDestroy, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { DecimalPipe, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { LessonService } from '../../services/lesson.service';
import { LessonItem } from '../../models/lesson-item.interface';

interface LevelInfo {
  level: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly lessonService = inject(LessonService);
  protected readonly config = inject(LanguageService).currentLanguage;

  protected readonly loading = this.lessonService.isLoading;

  protected readonly specimens = signal<LessonItem[]>([]);
  protected readonly specimenIndex = signal(0);
  protected readonly specimenPaused = signal(false);

  // Announced to assistive tech only on user-initiated changes (initial load
  // and dot selection); ambient auto-advance stays silent.
  protected readonly announcedSpecimen = signal<LessonItem | null>(null);

  protected readonly currentSpecimen = computed<LessonItem | null>(() => {
    const items = this.specimens();
    if (items.length === 0) {
      return null;
    }
    return items[this.specimenIndex() % items.length];
  });

  protected readonly specimenList = computed<LessonItem[]>(() => {
    const current = this.currentSpecimen();
    return current ? [current] : [];
  });

  protected readonly specimenCount = computed(() => this.specimens().length);

  protected readonly levels = computed<LevelInfo[]>(() => [
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

  private cycleTimer: ReturnType<typeof setInterval> | null = null;
  private reducedMotion: MediaQueryList | null = null;

  constructor() {
    this.lessonService.getLessonGroupsByLevel(1).subscribe({
      next: (groups) => {
        const letters = (groups[0]?.items ?? [])
          .filter((item) => item.type === 'letter')
          .slice(1, 4);
        if (letters.length > 0) {
          this.specimens.set(letters);
          this.announcedSpecimen.set(letters[0]);
        }
      },
      error: () => this.specimens.set([])
    });

    if (isPlatformBrowser(this.platformId) && typeof window.matchMedia === 'function') {
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.cycleTimer = setInterval(() => this.advanceSpecimen(), 4500);
    }
  }

  protected pauseSpecimen(): void {
    this.specimenPaused.set(true);
  }

  protected resumeSpecimen(): void {
    this.specimenPaused.set(false);
  }

  protected selectSpecimen(index: number): void {
    this.specimenIndex.set(index);
    this.specimenPaused.set(true);
    this.announcedSpecimen.set(this.specimens()[index] ?? null);
  }

  private advanceSpecimen(): void {
    if (this.specimenPaused() || (this.reducedMotion?.matches ?? false)) {
      return;
    }
    const count = this.specimens().length;
    if (count < 2) {
      return;
    }
    this.specimenIndex.set((this.specimenIndex() + 1) % count);
  }

  ngOnDestroy(): void {
    if (this.cycleTimer !== null) {
      clearInterval(this.cycleTimer);
    }
  }
}
