const express = require('express')
const User = require('../models/user')
const keys = require('../config/keys')
const {google} = require('googleapis')

const isUserAuthenticated = require('../middleware/isUserAuthenticated')

const router = express.Router()
  //clientID:'234704711750-ov0igr91l1va5vl4qlq82l2fo63n03ff.apps.googleusercontent.com',
    //clientSecret:'wSnYK_RrlI5kW4swUyvUZ037',
    //redirectURL: 'http://localhost:3000/auth/google/redirect'
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
  const oauth2Client = new google.auth.OAuth2()

  oauth2Client.setCredentials({
    'access_token': req.user.accessToken,
    'refresh_token': req.user.refresh_token,
    'client_id': keys.google.clientID,
    'client_secret': keys.google.clientSecret
  })

  const calendar = google.calendar({version: 'v3', auth: oauth2Client})
  calendar.events.insert()

})

module.exports = router

