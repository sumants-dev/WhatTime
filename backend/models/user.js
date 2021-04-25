const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
  username:  { type: String, required: true},
  googleId: { type: String, required: true, unique: true},
  accessToken: { type: String, required: true },
  calendars: { type: [String] }
})

module.exports = model('User', userSchema, 'User')
