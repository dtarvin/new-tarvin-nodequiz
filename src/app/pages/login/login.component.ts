/*
; ============================================
; Title:  login.component.ts
; Author: David Tarvin
; Date:   7 Oct 2019
; Description: NodeQuiz
;=============================================
*/

import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  errorMessage: string;

  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.form = this.fb.group({
      employeeId: [null, Validators.compose([Validators.required])]
    });
  }

  login() {
    const employeeId = this.form.controls['employeeId'].value;
    console.log(employeeId);

    this.http.get('/api/users/' + employeeId).subscribe(res => {
      if (res) {
        this.cookieService.set('isAuthenticated', 'true', 1);
        this.cookieService.set('employeeId', employeeId, 1);
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = "The employee Id you entered is invalid, please try again.";
      }
    })
  }
}
