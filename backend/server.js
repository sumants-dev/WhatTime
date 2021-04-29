// Imports
const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const path = require('path')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')

//models
const User = require('./models/user')

//Middleware
const isAuthenticated = require('./middleware/isUserAuthenticated')
// Routers
const calendarRouter = require('./routes/calendar')
const passportAccountRouter = require('./routes/passportAccount')
const userRouter = require('./routes/user')
const googleRouter = require('./routes/google')
// Initialization variables
const MONGO_URI = 'mongodb://localhost:27017/when2meet'
const port = process.env.PORT || 3000

const app = express()

// Middleware
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(cookieSession({
  // milliseconds of a day
  maxAge: 24*60*60*1000,
  keys:[keys.session.cookieKey]
}))


app.use(passport.initialize())
app.use(passport.session())
// callbackURL: '/auth/google/redirect'
const options = { upsert: true, new: true, setDefaultsOnInsert: true }

passport.use(
  new GoogleStrategy({
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: '/auth/google/redirect'
  }, (accessToken, refreshToken, profile, done) => {

    User.findOneAndUpdate(
      {username: profile._json.email}, {username: profile._json.email, googleId: profile.id, 
      accessToken: accessToken, 
      refreshToken: refreshToken},
      options).then((username) => {
      done(null, username)

      })
    })
)


passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user)
  })
})


// INTEGRATION
app.use(express.static('dist'))
app.use(express.json())

// ROUTER
app.use('/calendar', calendarRouter)
app.use('/user', userRouter)
app.use('/google', googleRouter)
app.use('/', passportAccountRouter)

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
