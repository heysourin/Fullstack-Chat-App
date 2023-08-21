const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const app = express()
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))

dotenv.config()
mongoose.connect(process.env.MONGO_URL)

const jwtSecret = process.env.JWT_SECRET
mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req, res) => {
  res.json('terst ok')
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body

  const createdUser = await User.create({
    username: username,
    password: password,
  })

  jwt.sign({ userId: createdUser._id }, jwtSecret, {}, (err, token) => {
    if (err) throw err
    res.cookie('token', token).status(201).json('ok')
  })
})

app.listen(8080, () => console.log('Server running at 8080'))
