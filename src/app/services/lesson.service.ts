import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, forkJoin, of } from 'rxjs';
import { LessonItem } from '../models/lesson-item.interface';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private readonly http = inject(HttpClient);
  private readonly lessonsCache = new Map<number, LessonItem[]>();
  private readonly currentLessonId = signal<string | null>(null);
  private readonly allLessons = signal<LessonItem[]>([]);

  constructor() {
    this.loadAllLessons();
  }

  /**
   * Load all lessons from JSON files
   */
  private loadAllLessons(): void {
    const levelFiles = [
      'assets/lessons/level-1.json',
      'assets/lessons/level-2.json',
      'assets/lessons/level-3.json',
      'assets/lessons/level-4.json',
      'assets/lessons/level-5.json'
    ];

    const requests = levelFiles.map(file => 
      this.http.get<LessonItem[]>(file).pipe(
        map(lessons => lessons || [])
      )
    );

    forkJoin(requests).subscribe({
      next: (results) => {
        const allLessons: LessonItem[] = [];
        
        results.forEach((lessons, index) => {
          const level = index + 1;
          this.lessonsCache.set(level, lessons);
          allLessons.push(...lessons);
        });

        this.allLessons.set(allLessons);
      },
      error: (error) => {
        console.error('Error loading lessons:', error);
        this.allLessons.set([]);
      }
    });
  }

  /**
   * Get all lessons for a specific level
   */
  getLessonsByLevel(level: number): Observable<LessonItem[]> {
    if (this.lessonsCache.has(level) && this.lessonsCache.get(level)!.length > 0) {
      return of(this.lessonsCache.get(level) || []);
    }
    
    const filePath = `assets/lessons/level-${level}.json`;
    return this.http.get<LessonItem[]>(filePath).pipe(
      map(lessons => {
        const lessonArray = lessons || [];
        if (!this.lessonsCache.has(level)) {
            this.lessonsCache.set(level, lessonArray);
        }
        return lessonArray;
      })
    );
  }

  /**
   * Get a lesson by its ID
   */
  getLessonById(id: string): LessonItem | null {
    const allLessons = this.allLessons();
    return allLessons.find(lesson => lesson.id === id) || null;
  }

  /**
   * Get the current lesson
   */
  getCurrentLesson(): LessonItem | null {
    const currentId = this.currentLessonId();
    if (!currentId) {
      return null;
    }
    return this.getLessonById(currentId);
  }

  /**
   * Set the current lesson by ID
   */
  setCurrentLesson(id: string): void {
    this.currentLessonId.set(id);
  }

  /**
   * Get the next lesson relative to the current one
   */
  getNextLesson(): LessonItem | null {
    const currentId = this.currentLessonId();
    if (!currentId) {
      return null;
    }

    const allLessons = this.allLessons();
    const currentIndex = allLessons.findIndex(lesson => lesson.id === currentId);
    
    if (currentIndex === -1 || currentIndex === allLessons.length - 1) {
      return null;
    }

    return allLessons[currentIndex + 1] || null;
  }

  /**
   * Get the previous lesson relative to the current one
   */
  getPreviousLesson(): LessonItem | null {
    const currentId = this.currentLessonId();
    if (!currentId) {
      return null;
    }

    const allLessons = this.allLessons();
    const currentIndex = allLessons.findIndex(lesson => lesson.id === currentId);
    
    if (currentIndex <= 0) {
      return null;
    }

    return allLessons[currentIndex - 1] || null;
  }

  /**
   * Check if there is a next lesson
   */
  hasNextLesson(): boolean {
    return this.getNextLesson() !== null;
  }

  /**
   * Check if there is a previous lesson
   */
  hasPreviousLesson(): boolean {
    return this.getPreviousLesson() !== null;
  }
}

