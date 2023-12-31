const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const ws = require('ws')

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

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  const foundUser = await User.findOne({ username })

  if (foundUser) {
    const passOk = bcrypt.compareSync(password, foundUser.password)

    if (passOk) {
      jwt.sign(
        { userId: foundUser._id, username },
        jwtSecret,
        {},
        (err, token) => {
          res.cookie('token', token, { sameSite: 'none', secure: true }).json({
            id: foundUser._id,
          })
        },
      )
    }
  }
})

const server = app.listen(8080, () => console.log('Server running at 8080'))
const wss = new ws.WebSocketServer({ server })
// console.log(wss);
wss.on('connection', (connection, req) => {
  // console.log(req.headers.cookie);// gonna grab cookies from headers
  //to show active users: wss.clients()

  const cookies = req.headers.cookie
  //to get only single cookie:
  if (cookies) {
    const tokenCookieStr = cookies
      .split(';')
      .find((str) => str.startsWith('token='))
    // console.log(tokenCookieStr)
    if (tokenCookieStr) {
      const token = tokenCookieStr.split('=')[1]
      if (token) {
        // console.log(token)
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
          if (err) throw err
          // console.log(userData)//userid, username, isat
          const { userId, username } = userData
          connection.userId = userId
          connection.username = username
        })
      }
    }
  }

  // console.log([...wss.clients].map((c) => c.username));
  ;[...wss.clients].map((client) => {
    client.send(
      JSON.stringify({
        onile: [...wss.clients].map((c) => ({
          userId: c.userId,
          username: c.username,
        })),
      }),
    )
  })
})
