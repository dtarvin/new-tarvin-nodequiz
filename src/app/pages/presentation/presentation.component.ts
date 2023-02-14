/*
; ============================================
; Title:  presentation.component.ts
; Author: David Tarvin
; Date:   7 Oct 2019
; Description: NodeQuiz
;=============================================
*/

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PresentationService } from './presentation.service';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {
  images: any;
  presentations: any;
  presentationName: string;
  quizName: string;

  constructor(private route: ActivatedRoute, private http: HttpClient,
              private presentationService: PresentationService,
              private router: Router) {
    this.presentationName = route.snapshot.paramMap.get('name');
    this.presentationService.getPresentations()
    .subscribe(res => {
      this.presentations = res;
      console.log(this.presentations);
      this.images = this.presentations.filter(p => p.name === this.presentationName)[0].images;
      console.log(this.images);
    })
  }

  goToQuiz(quizName) {
    this.quizName = quizName;
    console.log('The quiz name is ' + this.quizName);
    this.router.navigate(['/dashboard/quizzes/' + this.quizName]);
  }

  ngOnInit() {

  }

}
