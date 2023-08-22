const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())//equivalent to app.use(express.json());
dotenv.config()
mongoose.connect(process.env.MONGO_URL)

const jwtSecret = process.env.JWT_SECRET
mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req, res) => {
  res.json('terst ok')
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body

  // Validate user input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' })
  }

  const createdUser = await User.create({
    username: username,
    password: password,
  })

  jwt.sign({ userId: createdUser._id }, jwtSecret, {}, (err, token) => {
    if (err) throw err
    res
      .cookie('token', token, { sameSite: 'none', secure: true })
      .status(201)
      .json({ id: createdUser._id })
  })
})

app.listen(8080, () => console.log('Server running at 8080'))
