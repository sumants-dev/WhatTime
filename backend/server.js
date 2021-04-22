// Imports
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const path = require('path')
const bodyParser = require('body-parser')
const connectEnsureLogin = require('connect-ensure-login')



const accountRouter = require('./routes/account')

const User = require('./models/user')
// Initialization variables
const MONGO_URI = 'mongodb://localhost:27017/when2meet'
const port = process.env.PORT || 3000

const app = express()

// Middleware
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}))
// INTEGRATION
app.use(express.static('dist'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));


// Set Up Passport
app.use(passport.initialize())
app.use(passport.session())
passport.use(User.createStrategy())

// To use with sessions
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Routers
app.use('/account', accountRouter)

// INTEGRATION
app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

// Start Server
app.listen(port, () => {
  console.log('mongoDB is connected')
  console.log(`listening on ${port}`)
})
