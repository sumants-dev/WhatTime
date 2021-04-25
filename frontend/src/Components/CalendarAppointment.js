import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Week from './Week'
import moment from 'moment'

const CalendarAppointment = () => {
  const day = 0
  const time = moment().startOf('day')
  const calendar = 'test'
  
  return (
    <>
      <div class="tabs is-large">
        <ul>
          <li class = 'is-active'><a href='/'>Your Avalibility</a></li>
          <li><a href='/avalibility'>Everyone's Avalibility</a></li>
        </ul>
      </div>

      <div className='columns is-0 section'>
        <Week calendar = {calendar} time = {time} day = {day} />
        <Week calendar = {calendar} time = {time} day = {day + 1} />
        <Week calendar = {calendar} time = {time} day = {day + 2} />
        <Week calendar = {calendar} time = {time} day = {day + 3} />
        <Week calendar = {calendar} time = {time} day = {day + 4} />
      </div>
    </>
  )
}

export default CalendarAppointment
