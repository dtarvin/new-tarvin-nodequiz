/*
; ============================================
; Title:  results.js
; Author: David Tarvin
; Date:   14 Oct 2019
; Description: NodeQuiz
;=============================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResultsSchema = new Schema({
  employeeId: {type: String},
  quizId: {type: String},
  result: {type: String}
})

module.exports = mongoose.model('Result', ResultsSchema);
