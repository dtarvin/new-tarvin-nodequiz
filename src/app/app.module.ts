/*
; ============================================
; Title:  app.module.ts
; Author: Richard Krasso
; Modified By: David Tarvin
; Date:   26 Sep 2019
; Description: NodeQuiz
;=============================================
*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule} from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutes } from './app-routing.module';

import { AppComponent } from './app.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { CumulativeSummaryComponent } from './pages/cumulative-summary/cumulative-summary.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';

import { AuthGuard } from './shared/guards/auth.guard';
import { CookieService } from 'ngx-cookie-service';

import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CarouselModule } from 'primeng/carousel';
import { PresentationComponent } from './pages/presentation/presentation.component';
import { PresentationService } from './pages/presentation/presentation.service';
import { QuizComponent } from './pages/quiz/quiz.component';
import { QuizService } from './pages/quiz/quiz.service';
import { QuizResultsComponent } from './pages/quiz-results/quiz-results.component';
import { QuizSummaryDialogComponent } from './shared/quiz-summary-dialog/quiz-summary-dialog.component';
import { CumulativeSummaryService } from './pages/cumulative-summary/cumulative-summary.service';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
    declarations: [
        AppComponent,
        BaseLayoutComponent,
        CumulativeSummaryComponent,
        DashboardComponent,
        LoginComponent,
        NotFoundComponent,
        AuthLayoutComponent,
        PresentationComponent,
        QuizComponent,
        QuizResultsComponent,
        QuizSummaryDialogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(AppRoutes, { useHash: true, enableTracing: false }),
        ReactiveFormsModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatMenuModule,
        MatSidenavModule,
        MatListModule,
        MatRadioModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSortModule,
        FlexLayoutModule,
        HttpClientModule,
        CarouselModule
    ],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
        AuthGuard, CookieService, PresentationService, QuizService,
        CumulativeSummaryService],
    bootstrap: [AppComponent]
})
export class AppModule { }
