/*
; ============================================
; Title:  user.js
; Author: David Tarvin
; Date:   26 Sep 2019
; Description: NodeQuiz
;=============================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  employeeId: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  runningAverage: { type: Number }
})

module.exports = mongoose.model('User', UserSchema);
