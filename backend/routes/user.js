const express = require('express')
const User = require('../models/user')
const Avalibility = require('../models/avalibility')
const Calendar = require('../models/calendar')
const isUserAuthenticated = require('../middleware/isUserAuthenticated')

const _ = require('underscore')

const router = express.Router()

const setCalendarAvalibility = async (calendar) => {
    let avalibilities = await Avalibility.find( { calendar })
    const intersectingTimes = []

    avalibilities.forEach((element) => {
      intersectingTimes.push(element.times)
    })
    
    const calendarAvalibility = _.intersection.apply(_,intersectingTimes)

    await Calendar.findOneAndUpdate({calendar}, {calendarAvalibility})
}

router.post('/avalibility/delete', isUserAuthenticated, async(req, res, next) => {
  try {
    const { calendar, time } = req.body
    const user = req.user.username
    
    const query = await Avalibility.findOne({ user, calendar })
    let times = query.times

    if (query.length !== 0) {
      times = times.filter((elem) => {
        return (elem !== time)
      })
      
      await Avalibility.findOneAndUpdate({ user, calendar }, {times})
      setCalendarAvalibility(calendar)
    }

    res.send('Ok')



  } catch (error) {
    res.send("Not OK")
  }
})

router.post('/avalibility/add', isUserAuthenticated, async(req, res, next) => {
  try {
    const { calendar, time } = req.body
    console.log(calendar)


    const user = req.user.username
    
    const query = await Avalibility.find({ user, calendar })
    const calendarQuery = await Calendar.find({ calendar })
    

    if (query.length === 0 && calendarQuery.length !== 0 && time !== null) {
      await Avalibility.create({ user, calendar, time })
    } else {
      let times = await Avalibility.findOne({user, calendar})
      times = times.times 

      if (!times.includes(time)) {
        times.push(time)
      }
      await Avalibility.findOneAndUpdate({ user, calendar }, {times})
    }

    await setCalendarAvalibility(calendar)

    res.send("OK")
  } catch (error) {
    console.log(error)
    res.send("Not OK")
  }
})



router.post('/avalibility', isUserAuthenticated, async(req, res, next) => {
  try {
    const { calendar } = req.body
    const user = req.user.username
    console.log(user)
    console.log(calendar)
    
    const query = await Avalibility.find({ user, calendar })
    console.log(query)
    res.send(query)

  } catch (error) {
    res.send("Not OK")
  }
})


router.post('/calendars', isUserAuthenticated, async(req, res, next) => {
  try {
    const user = req.user.username
    const calendars = await User.find({ user })
    
    res.send(calendars)
  } catch (error) {
    res.send("Not OK")    
  }
})

module.exports = router
