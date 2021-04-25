const express = require('express')
const User = require('../models/user')
const Avalibility = require('../models/avalibility')
const Calendar = require('../models/calendar')
const _ = require('underscore')

const router = express.Router()

router.post('/create', async (req, res, next) => {
  try {
    const { calendar, invitedUsers, owner } = req.body
    const users = [owner]

    const query = await Calendar.find({ calendar })

    if (query.length === 0) {
      await Calendar.create({ calendar, users, invitedUsers, owner })
    }
    res.send("OK")
  } catch (error) {
    console.log(error)
    res.send("Not OK")
  }
})

router.post('/avalibility', async (req, res, next) => {
  try {
    const { calendar } = req.body
    let avalibilities = await Calendar.find( { calendar })

    avalibilities = avalibilities[0].calendarAvalibility
    res.send(avalibilities)

  } catch (error) {
    console.log(error)
    res.send('Not OK')
  }
})

router.post('/users', async (req, res, next) => {
  try {
    const { calendar } = req.body
    const { users } = await Calendar.findOne({ calendar })

    res.send(users)
  } catch (error) {
    res.send('Not OK')    
  }
})

router.post('/invitedUsers', async (req, res, next) => {
  try {
    const { calendar } = req.body
    const { invitedUsers } = await Calendar.findOne({ calendar })

    res.send(invitedUsers)
  } catch (error) {
    res.send('Not OK')    
  }
})


router.post('/owner', async (req, res, next) => {
  try {
    const { calendar } = req.body
    const { owner } = await Calendar.find({ calendar })

    res.send(owner)
  } catch (error) {
    res.send('Not OK')    
  }
})
module.exports = router
