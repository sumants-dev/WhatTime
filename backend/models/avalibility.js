const mongoose = require('mongoose')
const { Schema, model } = mongoose

const AvalibilitySchema = new Schema({
  user: {type: String, required: true},
  calendar: {type: String, required: true},
  times: {type: [String]}
})

module.exports = model('Avalibility', AvalibilitySchema , 'Avalibility')
