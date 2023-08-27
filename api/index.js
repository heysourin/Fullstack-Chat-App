const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')

const app = express()
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
app.use(express.json()) //equivalent to app.use(bodyParser.json()) ;
dotenv.config()
app.use(cookieParser())
const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = process.env.JWT_SECRET
mongoose.connect(process.env.MONGO_URL)

app.get('/profile', (req, res) => {
  const token = req.cookies?.token

  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) {
        res.status(401).json({ error: 'Invalid token' })
      } else {
        res.json(userData)
      }
    })
  } else {
    res.status(401).json({ error: 'No token' })
  }
})

app.post('/logout', (req, res) => {
  res.cookie('token', '', { sameSite: 'none', secure: true }).json('ok')
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body
  try {
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt)
    const createdUser = await User.create({
      username: username,
      password: hashedPassword,
    })
    jwt.sign(
      { userId: createdUser._id, username },
      jwtSecret,
      {},
      (err, token) => {
        if (err) throw err
        res
          .cookie('token', token, { sameSite: 'none', secure: true })
          .status(201)
          .json({
            id: createdUser._id,
          })
      },
    )
  } catch (err) {
    if (err) throw err
    res.status(500).json('error')
  }
})

app.listen(8080, () => console.log('Server running at 8080'))
