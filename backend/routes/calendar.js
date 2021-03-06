const express = require('express')
const User = require('../models/user')
const Avalibility = require('../models/avalibility')
const Calendar = require('../models/calendar')
const _ = require('underscore')

const router = express.Router()

router.post('/create', async (req, res, next) => {
  try {
    let { calendar, invitedUsers } = req.body
    const owner = req.user.username
    invitedUsers = invitedUsers.replace(' ', '')
    invitedUsers = invitedUsers.trim()
    invitedUsers = invitedUsers.split(';')
    
    invitedUsers.push(owner)

    const users = _.uniq(invitedUsers, false)
    const query = await Calendar.find({ calendar })
    if (query.length === 0) {
      await Calendar.create({ calendar, users, owner })
      await users.map(async (user) => {
        const query = await User.findOne({username: user}) 
        if (query !== null) {
          const calendars = query.calendars
          calendars.push(calendar)
          await User.findOneAndUpdate({username: user}, {calendars})
        } else {
          await User.create({username: user, calendars: [calendar]})
        }
      })
    }
    res.send('OK')
  } catch (error) {
    res.send('Not OK')
  }
})


router.get('/times', async (req, res, next) => {
  try {
    const calendar = req.session.activeCalendar
    const query = await Calendar.findOne({ calendar })
    const { users } = query
    let times = []

    for (let index = 0; index < users.length; index++) {
      const user = users[index]
      const userAvalibility = await Avalibility.findOne({ user, calendar })
      const userTimes = userAvalibility.times
      times.push(...userTimes)
    }

    res.send(times)

  } catch (error) {
    res.send('Not OK')
  }
})

router.get('/avalibility', async (req, res, next) => {
  try {
    const calendar = req.session.activeCalendar
    let currCalendar = await Calendar.findOne( { calendar })
    const avalibilities = currCalendar.calendarAvalibility
    res.send(avalibilities)
  } catch (error) {
    res.send('Not OK')
  }
})

router.get('/users', async (req, res, next) => {
  try {
    const calendar = req.session.activeCalendar
    const { users } = await Calendar.findOne({ calendar })

    res.send(users)
  } catch (error) {
    res.send('Not OK')    
  }
})

router.get('/usersWithNoAvalibility', async (req, res, next) => {
  try {
    const calendar = req.session.activeCalendar
    const { users } = await Calendar.findOne({ calendar })
    const notAvailableUsers = [] 

    for (let index = 0; index < users.length; index++) {
      const user = users[index]
      const avail = await Avalibility.find({ calendar, user })
      
      if (avail.length === 0) {
        notAvailableUsers.push(user)
      }
    }
    res.send(notAvailableUsers)
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


router.get('/owner', async (req, res, next) => {
  try {
    const activeCalendar = req.session.activeCalendar
    const currentUser = req.user.username
    const { owner } = await Calendar.findOne({ calendar: activeCalendar })
    if (owner !== null) {
      res.send(currentUser === owner)
    } else {
      res.send(false)
    }
  } catch (error) {
    res.send('Not OK')    
  }
})

router.get('/finalTime', async (req, res, next) => {
  try {
    const activeCalendar = req.session.activeCalendar
    const { finalTime } = await Calendar.findOne({ calendar: activeCalendar })
    console.log(finalTime)
    res.send(finalTime)
  } catch(error) {
    console.log(error)
    res.send('Not Ok')
  }
})
module.exports = router
