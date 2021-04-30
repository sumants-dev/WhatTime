import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Week from './Week'
import moment from 'moment'
import Navbar from './smallComponents/Navbar'

const CalendarAppointment = () => {
  const day = 0
  const time = moment().startOf('day')
  const [calendar, setCalendar] = useState('')

  useEffect(() => {
    async function fetch() {
      const { data } = await axios.get('/user/activeCalendar')
      const { calendar } = data
      setCalendar(calendar)
    }

    fetch()
  }, [])

  const tabs = (
    <>
      <div className ="tabs is-medium">
        <ul>
          <li className = 'is-active'><a href='/calendar'>My Avalibility</a></li>
          <li><a href='/avalibility'>Group Avalibility</a></li>
          <li><a href='/info'> Group Info </a> </li>
        </ul>
      </div>
    </>
  )

  console.log(calendar)

  if (calendar !== '') {
    return (
      <>
        <Navbar/>
        {tabs}
        <div className='columns is-0 section'>
          <Week time = {time} day = {day} />
          <Week time = {time} day = {day + 1} />
          <Week time = {time} day = {day + 2} />
          <Week time = {time} day = {day + 3} />
          <Week time = {time} day = {day + 4} />
        </div>
      </>
    )
  } else {
    return (
      <>
        {tabs}
      </>
    )
  }
  
}


export default CalendarAppointment
