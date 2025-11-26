import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LessonListComponent } from './components/lesson-list/lesson-list.component';
import { LessonViewerComponent } from './components/lesson-viewer/lesson-viewer.component';
import { SettingsComponent } from './components/settings/settings.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'level/:levelId', component: LessonListComponent },
  { path: 'lesson/:lessonId', component: LessonViewerComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: '' }
];
