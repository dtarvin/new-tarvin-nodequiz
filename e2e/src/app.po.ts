/*
; ============================================
; Title:  app.po.ts
; Author: Richard Krasso
; Modified By: David Tarvin
; Date:   7 Oct 2019
; Description: NodeQuiz
;=============================================
*/

import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }
}
