/*
; ============================================
; Title:  quizResult.js
; Author: David Tarvin
; Date:   16 Oct 2019
; Description: NodeQuiz
;=============================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizResultsSchema = new Schema({
  employeeId: {type: String},
  quizName: {type: String},
  result: {type: String}
})

module.exports = mongoose.model('QuizResult', QuizResultsSchema);
