const express = require('express')
const User = require('../models/user')
const Calendar = require('../models/calendar')
const moment = require('moment') 
const keys = require('../config/keys')
const {google} = require('googleapis')

const isUserAuthenticated = require('../middleware/isUserAuthenticated')

const router = express.Router()

router.get('/calendar/events', isUserAuthenticated, async (req, res, next) => {

  const oauth2Client = new google.auth.OAuth2()

  oauth2Client.setCredentials({
    'access_token': req.user.accessToken,
    'refresh_token': req.user.refresh_token,
    'client_id': keys.google.clientID,
    'client_secret': keys.google.clientSecret
  })

  const calendar = google.calendar({version: 'v3', auth: oauth2Client})

  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
      }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err)
      const events = res.data.items;
      if (events.length) {
        console.log('Upcoming 10 events:');
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        });
      } else {
        console.log('No upcoming events found.');
      }
    })
})

router.post('/calendar/newEvent', isUserAuthenticated, async (req, res, next) => {
  const { time } = req.body
  const calendarName = req.session.activeCalendar
  const { users } = await Calendar.findOne({ calendar: calendarName })
  const time2 = moment(time).add(1, 'hour').format()

  var event = {
    'summary': calendarName,
    'description': 'Calendar created with WhatTime',
    'start': {
      'dateTime': time,
      'timeZone': 'America/New_York',
    },
    'end': {
      'dateTime': time2,
      'timeZone': 'America/New_York',
    },
    'reminders': {
      'useDefault': true
    },
  }

  const oauth2Client = new google.auth.OAuth2()
  const calendar = google.calendar({version: 'v3', auth: oauth2Client})

  await Calendar.findOneAndUpdate({ calendar: calendarName }, { finalTime: time })
  
  for (let index= 0; index < users.length; index++) {
    const username = users[index]
    const user = await User.findOne({ username })
    console.log(user) 
    oauth2Client.setCredentials({
      'access_token': user.accessToken,
      'refresh_token': user.refreshToken,
      'client_id': keys.google.clientID,
      'client_secret': keys.google.clientSecret
    })
    
    await calendar.events.insert({
      auth: oauth2Client,
      calendarId: 'primary',
      resource: event,
      }, function(err, event) {
        if (err) {
          console.log('There was an error contacting the Calendar service: ' + err);
          return;
        }
        console.log('Event created:' )
        console.log(event.htmlLink)
    })
  }

})

module.exports = router

