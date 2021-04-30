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
  const [finalTime, setFinalTime] = useState('')

  useEffect(() => {
    async function fetch() {
      const ownerData  = await axios.get('/calendar/owner')
      const { data } = await axios.get('/user/activeCalendar')
      const { calendar } = data
      const finalData = await axios.get('/calendar/finalTime')

      setIsOwner(ownerData.data)
      setCalendar(calendar)
      setFinalTime(finalData.data)
    }
    fetch()
  }, [])


  console.log(finalTime)
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

  if (calendar !== '' && (finalTime === undefined || finalTime === '')) {
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
  } else if (calendar !== '' && finalTime !== '') {
    return (
      <>
        <Navbar/>
        {tabs}
        <section>
          <div className = 'columns'>
            <div className = 'column'></div>
            <div className = 'column'>
              <div class="card">
                  <header className='card-header'>
                    <p className='card-header-title'> Event Time for {calendar}</p>
                  </header>
                  <div class="card-content">
                    <div class="content">
                      <p> The event has been set for the time at {moment(finalTime).format('LLLL')}. An event has been created in your google calendar. </p>
                    </div>
                  </div>
                </div>
              </div>
            <div className = 'column'></div>
          </div>
        </section>
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
