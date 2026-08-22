import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { HOME_TITLE, pageTitle } from './branding';

function levelTitle(route: ActivatedRouteSnapshot): string {
  return pageTitle(`Level ${route.paramMap.get('levelId')}`);
}

function randomPracticeTitle(route: ActivatedRouteSnapshot): string {
  return pageTitle(`Level ${route.paramMap.get('levelId')} Random Practice`);
}

export const routes: Routes = [
  {
    path: '',
    title: HOME_TITLE,
    loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'level/:levelId',
    title: levelTitle,
    loadComponent: () =>
      import('./components/lesson-list/lesson-list.component').then((m) => m.LessonListComponent)
  },
  {
    path: 'level/:levelId/random',
    title: randomPracticeTitle,
    loadComponent: () =>
      import('./components/random-practice/random-practice.component').then(
        (m) => m.RandomPracticeComponent
      )
  },
  {
    path: 'lesson/:lessonId',
    title: pageTitle('Lesson'),
    loadComponent: () =>
      import('./components/lesson-viewer/lesson-viewer.component').then((m) => m.LessonViewerComponent)
  },
  {
    path: 'quiz/:level/:quizNumber/active',
    title: pageTitle('Quiz'),
    loadComponent: () =>
      import('./components/quiz-container/quiz-container.component').then((m) => m.QuizContainerComponent)
  },
  {
    path: 'quiz/:level/:quizNumber/results',
    title: pageTitle('Quiz Results'),
    loadComponent: () =>
      import('./components/quiz-results/quiz-results.component').then((m) => m.QuizResultsComponent)
  },
  {
    path: 'settings',
    title: pageTitle('Settings'),
    loadComponent: () => import('./components/settings/settings.component').then((m) => m.SettingsComponent)
  },
  { path: '**', redirectTo: '' }
];
