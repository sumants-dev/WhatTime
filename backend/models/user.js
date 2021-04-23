const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  calendar: { type: [String] }
})


module.exports = model('User', userSchema, 'User')