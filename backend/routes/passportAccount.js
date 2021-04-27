const passport = require('passport')
const isUserAuthenticated = require('../middleware/isUserAuthenticated')

const express = require('express')

//https://dev.to/phyllis_yym/beginner-s-guide-to-google-oauth-with-passport-js-2gh4

const router = express.Router()


router.get('/auth/google', 
passport.authenticate('google', {
  scope: ['profile', 'email','https://www.googleapis.com/auth/calendar', 
  'https://www.googleapis.com/auth/calendar.events']
})

)

router.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/')
})

router.get('/secret', isUserAuthenticated, (req, res) => {
    res.send('You have reached the secret route');
})

router.get('/logout', (req, res) => {
    req.logout(); 
    res.redirect('/login');
})

module.exports = router