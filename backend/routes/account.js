const express = require('express')
const User = require('../models/user')
const passport = require('passport')

const router = express.Router()


router.post('/login', passport.authenticate('local'),  async (req, res) => {
  res.send('User logged in')
})

router.post('/signup', async (req, res, next) => {
  try {
    const { username, password } = req.body

    if (username === undefined || username === '' || username === null
        || password === undefined || password === '' || password === null) {
      throw new Error('Error: Signup Empty Fields')
    }
    await User.create({ username, password })
    res.status(200).send('User Created')
  } catch (error) {
    next(error, req, res)
  }
})

router.get('/logout', async (req, res) => {
  req.logout()
  res.send('User logged out')
})

module.exports = router
