/*
; ============================================
; Title:  base-layout.component.ts
; Author: Richard Krasso
; Modified By: David Tarvin
; Date:   18 Oct 2019
; Description: NodeQuiz
;=============================================
*/

import { Component, OnInit, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-summary-dialog',
  templateUrl: './quiz-summary-dialog.component.html',
  styleUrls: ['./quiz-summary-dialog.component.css']
})
export class QuizSummaryDialogComponent implements OnInit {

  quizSummary: any;
  correctAnswers: any;
  selectedAnswers: any;
  employeeId: string;

  constructor(private dialogRef: MatDialogRef<QuizSummaryDialogComponent>, @Inject(MAT_DIALOG_DATA) data, private cookieService: CookieService,
              private router: Router) { 
    this.quizSummary = data.quizSummary;
    console.log(data);
    this.correctAnswers = this.quizSummary.correctAnswers;
    this.selectedAnswers = this.quizSummary.selectedAnswers;
    this.employeeId = this.cookieService.get('employeeId');
  }

  returnToDashboard() {
    this.router.navigate(['/dashboard/']);
  }

  ngOnInit() {
  }

}
