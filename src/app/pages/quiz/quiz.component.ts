/*
; ============================================
; Title:  quiz.component.ts
; Author: Richard Krasso
; Modified by: David Tarvin
; Date:   7 Oct 2019
; Description: NodeQuiz
;=============================================
*/

import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from './quiz.service';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { QuizSummaryDialogComponent} from '../../shared/quiz-summary-dialog/quiz-summary-dialog.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quizName: string;
  quizzes: any;
  quiz: any;
  questions: any;
  q: any = [];
  qs: any = [];
  // question: any;
  isShown:boolean = false;
  quizId: number;
  employeeId: string;
  quizResults: any;
  displayResults: any;
  result: any;
  quizSummary: any = [];
  completedQuiz: any;

  constructor(private route: ActivatedRoute, private http: HttpClient,
    private quizService: QuizService, private cookieService: CookieService,
    private location: Location, private router: Router, private dialog: MatDialog) {
      this.quizName = route.snapshot.paramMap.get('name');
      this.employeeId = this.cookieService.get('employeeId');
      // console.log('The quiz name is ', this.quizName);
      // this.quizId = parseInt(this.route.snapshot.paramMap.get('quizId'), 10);
      // this.employeeId = parseInt(this.cookieService.get('employeeId'), 10);
      // console.log('Running getQuizzes from component');
      this.quizService.getQuizzes()
      .subscribe(res => {
        this.quizzes = res;
        // console.log('The quizzes are as follows:', this.quizzes);
        this.questions = this.quizzes.filter(q => q.name === this.quizName)[0].questions;
        this.quiz = this.quizzes.filter(q => q.name === this.quizName)[0];
        // console.log(this.questions);
        // console.log('Quiz ID is ' + this.quiz.quizId);
      })
  }

  goToQuiz(quizName) {
    this.quizName = quizName;
    // console.log('The quiz name is ' + this.quizName);
    this.router.navigate(['/dashboard/quizzes/' + this.quizName]);
  }

  returnToPresentation(quizName) {
    this.quizName = quizName;
    this.router.navigate(['/dashboard/presentation/' + this.quizName]);
  }

  goBack() {
    this.location.back();
  }

  show() {
    this.isShown = !this.isShown;
  }

  onSubmit(form) {
  //   this.quizResults = form;
  //   this.displayResults = JSON.stringify(this.quizResults);
  //   this.show();
  // }
    /**
     * Variables for setting up our scoring calculation
     */
    const totalPossiblePoints = 100; // the total number of possible points a user can earn on a given test
    const questionCount = this.questions.length; // the total number of quiz questions
    let pointsPerQuestion = totalPossiblePoints / questionCount; // the total number of poiints per question
    let quizScore = 0; // variable to hold the quiz score

    /**
     * Variables for determining the user's selection
     */
    let correctRunningTotal = 0; // variable to hold the running total of correct answers
    let selectedAnswerIds = [];
    let selectedIsCorrectProp = [];

    /**
     * Form data
     */
    this.quizResults = form;
    this.quizResults['employeeId'] = this.employeeId; // add the employeeId to the quizResults object
    this.quizResults['quizName'] = this.quizName; // add the quizName to the quizResults object
    
    /**
     * 1. TODO: Save the quiz results to the database here...
     */
    this.http.post('/api/quizResults/' + this.quizName, {
      employeeId: this.employeeId,
      quizName: this.quizName,
      result: JSON.stringify(form)
    }).subscribe(res => {
      
    }, err => {

    }, () => {

    })

    /**
     * 2. Loop over the quizResults properties
     */
    for (const prop in this.quizResults) {
      /**
       * We need to check if hasOwnProperty to avoid returning null values
       */
      if (this.quizResults.hasOwnProperty(prop)) {

        /**
         * Once we are inside the object's properties we need to extract the properties not matching quizName and employeeId
         */
        if (prop !== 'employeeId' && prop !== 'quizName') {
          // console.log('this.quizResults[prop].split(;)[1] is ', this.quizResults[prop].split(';')[1]);
          selectedAnswerIds.push(parseInt(this.quizResults[prop].split(';')[1]));
          // console.log("this.quizResults[prop].split(';')[1] =", this.quizResults[prop].split(';')[1]);
          selectedIsCorrectProp.push(this.quizResults[prop].split(';')[3]);
        }
        // console.log('Selected Answer Ids include ', selectedAnswerIds);
      }
    }

    /**
     * 3. Determine the quiz score
     * With the properties extracted and pushed to our selectedAnswerIds and selectedIsCorrectProp arrays,
     * we need to get a running total of the entries matching 'true'
     */
    for (let x = 0; x < selectedIsCorrectProp.length; x++) {
      if (selectedIsCorrectProp[x] === "true") {
        correctRunningTotal += 1;
      }
    }

    quizScore = correctRunningTotal * pointsPerQuestion;

    /**
     * 4. Create the QuizSummary object for the dialog
     */
    let correctAnswers = [];
    let selectedAnswers = [];

    /**
     * Loop over the quiz.questions to get the selected answer and correct answer for each question
    //  */
    for (let question of this.questions) {
      for (let answer of question.answers) {
        // console.log('answer.answerId is ', answer.answerId);
        if (answer.isCorrect) {
          // console.log(answer.answerId + ' was correct');
          correctAnswers.push({
            questionId: question.questionId,
            questionText: question.questionText,
            answerId: answer.answerId,
            text: answer.answerText
          });
        }
        // console.log('answer.answerId is still ', answer.answerId);
        // console.log('selectedAnswerIds.includes(answer.answerId) = ', selectedAnswerIds.includes(answer.answerId));
        if (selectedAnswerIds.includes(answer.answerId)) {
          console.log('Includes statement');
          console.log(`Answer: ${answer.answerText}`);
          selectedAnswers.push({
            questionId: question.questionId,
            questionText: question.questionText,
            answerId: answer.answerId,
            text: answer.answerText
          });
        }
        console.log('done with ', answer.answerId);
      }
    }

    this.quizSummary['employeeId'] = this.employeeId;
    this.quizSummary['quizName'] = this.quizName;
    this.quizSummary['quizId'] = this.quiz.quizId;
    this.quizSummary['score'] = quizScore;
    this.quizSummary['correctAnswers'] = correctAnswers;
    this.quizSummary['selectedAnswers'] = selectedAnswers;
    console.log('Quiz summary = ', this.quizSummary);

    /**
     * 6. TODO: Create the cumulative summary object and insert into the database
     */

    this.completedQuiz = {
      employeeId: this.employeeId,
      quizId: this.quiz.quizId,
      quizName: this.quizName,
      dateTaken: moment().format('MM/DD/YYYY'),
      score: quizScore
    };

    this.http.post('/api/completedQuizzes/', {
      employeeId: this.completedQuiz['employeeId'],
      quizId: this.completedQuiz['quidId'],
      quizName: this.completedQuiz['quizName'],
      dateTaken: this.completedQuiz['dateTaken'],
      score: this.completedQuiz['score']
    }).subscribe(res => {

    }, err => {

    }, () => {

    })

    this.show();

    /**
     * 7. Open the dialog and pass the summary details to over
     */
    const dialogRef = this.dialog.open(QuizSummaryDialogComponent, {
      data: {
        quizSummary: this.quizSummary
      },
      disableClose: true,
      width: "800px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "confirm") {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit() {

  }

}
