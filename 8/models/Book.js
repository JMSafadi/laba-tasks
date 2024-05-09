const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  _title: { type: String, required: true },
  _author: { type: String, required: true },
  _isbn: { type: Number, required: true },
  _price: { type: Number, required: true },
  _availability: { type: Boolean, default: true },
  _type: { type: String, default: false },
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book