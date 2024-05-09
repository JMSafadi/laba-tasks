const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const userSchema = new mongoose.Schema({
  _name: { type: String, required: true },
  _email: { type: String, required: true },
  _userId: { type: String, default: uuidv4 },
})

const User = mongoose.model('User', userSchema)

module.exports = User