/*
; ============================================
; Title:  cumulative-summary.component.ts
; Author: David Tarvin
; Date:   7 Oct 2019
; Description: NodeQuiz
;=============================================
*/

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CumulativeSummaryService } from './cumulative-summary.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cumulative-summary',
  templateUrl: './cumulative-summary.component.html',
  styleUrls: ['./cumulative-summary.component.css']
})
export class CumulativeSummaryComponent implements OnInit {

  completedQuizzes: any;
  
  constructor(private router: Router, private http: HttpClient,
              private cumulativeSummaryService: CumulativeSummaryService,
              private location: Location) { 
    this.cumulativeSummaryService.getCumulativeSummary()
    .subscribe(res => {
      this.completedQuizzes = res;
      console.log('The completed quizzes are: ' + this.completedQuizzes);
    })
  }

  goBack() {
    this.location.back();
  }
  
  ngOnInit() {
  }

}
