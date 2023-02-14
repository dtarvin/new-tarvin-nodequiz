/*
; ============================================
; Title:  dashboard.component.ts
; Author: David Tarvin
; Date:   7 Oct 2019
; Description: NodeQuiz
;=============================================
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  presentationName: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToPresentation(presentationName) {
    this.presentationName = presentationName;
    console.log('The presentation name is ' + this.presentationName);
    this.router.navigate(['/dashboard/presentation/' + this.presentationName]);
  }
}
