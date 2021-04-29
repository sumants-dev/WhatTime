import React, { useState, useEffect} from 'react'
import WeeklyAvalibility from './WeeklyAvalibility'
import moment from 'moment'
import axios from 'axios'
import Navbar from './smallComponents/Navbar'

const CalendarAvalibility = () => {
  const day = 0
  const time = moment().startOf('day')
  const [isOwner, setIsOwner] = useState(false)
  const [calendar, setCalendar] = useState('')

  useEffect(() => {
    async function fetch() {
      const ownerData  = await axios.get('/calendar/owner')
      const { data } = await axios.get('/user/activeCalendar')
      const { calendar } = data
      console.log(ownerData)
      setIsOwner(ownerData.data)
      setCalendar(calendar)
    }

    fetch()
  }, [])

  console.log(isOwner)
  console.log(calendar)
  
  const tabs = (
    <>
      <div className ="tabs is-medium">
        <ul>
          <li><a href='/calendar'>My Avalibility</a></li>
          <li className = 'is-active'><a href='/avalibility'>Group Avalibility</a></li>
          <li><a href='/info'> Group Info </a> </li>
        </ul>
      </div>
    </>)

  if(calendar !== '') {
    return (
      <>
        <Navbar/>
        {tabs}
        <div className='columns is-0 section'>
          <WeeklyAvalibility time = {time} day = {day} isOwner = {isOwner} />
          <WeeklyAvalibility time = {time} day = {day + 1} isOwner = {isOwner} />
          <WeeklyAvalibility time = {time} day = {day + 2} isOwner = {isOwner} />
          <WeeklyAvalibility time = {time} day = {day + 3} isOwner = {isOwner} />
          <WeeklyAvalibility time = {time} day = {day + 4} isOwner = {isOwner} />
        </div>
      </>
    )
  } else {
    return (
      <>
        {tabs}
        Currently No Avalibility
      </>
    )
  }
}


export default CalendarAvalibility
