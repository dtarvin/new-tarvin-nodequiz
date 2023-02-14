/*
; ============================================
; Title:  completedQuiz.js
; Author: David Tarvin
; Date:   8 Oct 2019
; Description: NodeQuiz
;=============================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompletedQuizSchema = new Schema({
    employeeId: {type: String},
    quizId: {type: Number},
    quizName: {type: String},
    dateTaken: {type: String},
    score: {type: Number}
});

module.exports = mongoose.model('CompletedQuiz', CompletedQuizSchema);
