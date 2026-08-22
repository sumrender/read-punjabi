import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'level/:levelId',
    loadComponent: () =>
      import('./components/lesson-list/lesson-list.component').then((m) => m.LessonListComponent)
  },
  {
    path: 'level/:levelId/random',
    loadComponent: () =>
      import('./components/random-practice/random-practice.component').then(
        (m) => m.RandomPracticeComponent
      )
  },
  {
    path: 'lesson/:lessonId',
    loadComponent: () =>
      import('./components/lesson-viewer/lesson-viewer.component').then((m) => m.LessonViewerComponent)
  },
  {
    path: 'quiz/:level/:quizNumber/active',
    loadComponent: () =>
      import('./components/quiz-container/quiz-container.component').then((m) => m.QuizContainerComponent)
  },
  {
    path: 'quiz/:level/:quizNumber/results',
    loadComponent: () =>
      import('./components/quiz-results/quiz-results.component').then((m) => m.QuizResultsComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./components/settings/settings.component').then((m) => m.SettingsComponent)
  },
  { path: '**', redirectTo: '' }
];
