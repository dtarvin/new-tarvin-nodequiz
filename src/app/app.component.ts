/*
; ============================================
; Title:  app.component.ts
; Author: Richard Krasso
; Modified By: David Tarvin
; Date:   26 Sep 2019
; Description: NodeQuiz
;=============================================
*/

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './shared/guards/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Node Quiz';

  constructor(private router: Router, private cookieService: CookieService, private authGuard: AuthGuard) {
    let test = this.cookieService.get("isAuthenticated");
    console.log(test);
    if (!test) {
      router.navigate(["/session/login"]);
    } else {
      router.navigate(['/dashboard']);
    }
  }
  logout() {
    console.log("clicked logout");
    this.cookieService.delete("isAuthenticated");
    this.router.navigate(['/session/login']);
  }
  goToDashboard() {
    this.router.navigate(['/dashboard/']);
  }
  goToCumulativeSummary() {
    this.router.navigate(['/dashboard/cumulative-summary']);
  }
}
