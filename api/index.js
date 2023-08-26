const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) //equivalent to app.use(express.json());
dotenv.config()
app.use(cookieParser())

const jwtSecret = process.env.JWT_SECRET
// mongoose.connect(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req, res) => {
  res.json('terst ok')
})

app.get('/profile', (req, res) => {
  const token = req.cookies?.token

  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) throw err
      // const { id, username } = userData

      res.json(userData)
    })
  } else {
    res.status(401).json('no token')
  }
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

  //we want to login that user immediately

  jwt.sign({ userId: createdUser._id }, jwtSecret, {}, (err, token) => {
    if (err) throw err
    res
      .cookie(
        'token',
        token,
        { sameSite: 'none', secure: true },
        { httpOnly: true },
      ) // set httpOnly to true
      .status(201)
      .json({ id: createdUser._id, username: username })
  })
})

app.listen(8080, () => console.log('Server running at 8080'))

/**
 *
 * , { sameSite: 'none', secure: true }
 */
