const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const Book = require('./models/Book')
const User = require('./models/User')
const { users, books } = require('./classes-oop')

const app = express()
const uri = process.env.MONGODB_URI
const PORT = 3000

// Express middleware to parse the bodies of incoming JSON.
app.use(express.json())

// Create get request to see books and users information.
app.get('/books', async(req, res) => {
  try {
    const books = await Book.find()
    res.json(books)
  } catch (error) {
    console.error('Error getting books:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

app.get('/users', async(req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    console.error('Error getting users:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

// Create server and connect with mongoDB database. If there isn't information yet, we insert the arrays books and users.
// This avoid to insert the same data more than once.
app.listen(PORT, async () => {
  try {
    await mongoose.connect(uri)
    console.log('Connected to MongoDB')

    const bookCount = await Book.countDocuments()
    const userCount = await User.countDocuments()

    if (bookCount === 0) {
      await Book.insertMany(books)
      console.log('Books inserted into database')
    }
    if (userCount === 0) {
      await User.insertMany(users)
      console.log('Users inserted into database')
    }

  } catch (error) {
    console.log(error)
  }
})

console.log(`Server started on port ${PORT}`)