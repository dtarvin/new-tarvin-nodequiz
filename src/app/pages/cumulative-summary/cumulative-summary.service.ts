/*
; ============================================
; Title:  cumulative-summary.service.ts
; Author: David Tarvin
; Date:   19 Oct 2019
; Description: NodeQuiz
;=============================================
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CumulativeSummaryService {

  constructor(private http: HttpClient) { }

  getCumulativeSummary() {
    console.log('Running getCumulativeSummary from Service');
    return this.http.get('/api/completedQuizzes');
  }
}
