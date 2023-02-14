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

const CumulativeSummarySchema = new Schema({
  employeeId: {type: String},
  quizId: {type: String},
  quizName: {type: String},
  dateTaken: {type: String},
  score: {type: Number}
})

module.exports = mongoose.model('CumulativeSummary', CumulativeSummarySchema);
