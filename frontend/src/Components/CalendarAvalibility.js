import React, { useState, useEffect} from 'react'
import axios from 'axios'
import WeeklyAvalibility from './WeeklyAvalibility'
import moment from 'moment'
import { useHistory } from 'react-router-dom'

const CalendarAvalibility = () => {
  const day = 0
  const time = moment().startOf('day')
  const calendar = 'test'

  const history = useHistory()  
  return (
    <>

      <div class="tabs is-large">
        <ul>
          <li><a href='/'>Your Avalibility</a></li>
          <li class="is-active" ><a href='/avalibility'>Everyone's Avalibility</a></li>
        </ul>
      </div>
      
      <div className='columns is-0 section'>
        <WeeklyAvalibility calendar = {calendar} time = {time} day = {day} />
        <WeeklyAvalibility calendar = {calendar} time = {time} day = {day + 1} />
        <WeeklyAvalibility calendar = {calendar} time = {time} day = {day + 2} />
        <WeeklyAvalibility calendar = {calendar} time = {time} day = {day + 3} />
        <WeeklyAvalibility calendar = {calendar} time = {time} day = {day + 4} />
      </div>
    </>
  )
}

export default CalendarAvalibility
