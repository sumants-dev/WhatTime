const mongoose = require('mongoose')
const { Schema, model } = mongoose

const CalendarSchema = new Schema({
  calendar: {type: String, required: true, unique: true},
  users: {type: [String], required: true},
  invitedUsers: {type: [String], required: true},
  owner: {type: String, required: true},
  calendarAvalibility: {type: [String], required: false}
})

module.exports = model('Calendar', CalendarSchema, 'Calendar')
