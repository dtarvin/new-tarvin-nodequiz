/*
; ============================================
; Title:  app.routing.ts
; Author: Richard Krasso
; Modified By: David Tarvin
; Date:   26 Sep 2019
; Description: NodeQuiz
;=============================================
*/

import {Routes} from '@angular/router';
import {BaseLayoutComponent} from './shared/base-layout/base-layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { CumulativeSummaryComponent } from './pages/cumulative-summary/cumulative-summary.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PresentationComponent } from './pages/presentation/presentation.component';
import { QuizComponent } from './pages/quiz/quiz.component';

export const AppRoutes: Routes = [
  {
    path: 'dashboard',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'cumulative-summary',
        component: CumulativeSummaryComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'presentation/:name',
        component: PresentationComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'quizzes/:name',
        component: QuizComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'not-found',
        component: NotFoundComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'session/not-found'
  }
];
