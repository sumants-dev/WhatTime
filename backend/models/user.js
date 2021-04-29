const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
  username:  { type: String, required: true},
  googleId: { type: String, unique: true},
  accessToken: { type: String },
  refreshToken: {type: String},
  calendars: { type: [String] },
})

module.exports = model('User', userSchema, 'User')
