import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Week from './Week'

const Calendar = () => {
  const [day, setDay] = useState(0)

  const changeDay = (delta) => {
    if (day + delta >= 0 && day + delta < 7) {
      setDay(day + delta)
    }
  }
  return (
    <>
      <br></br>
      <nav className='level-right'>
        <p className='level-item'>
          <button className='button' onClick = {(e) => {changeDay(-3)}}>Prev</button>
        </p>
        <p className='level-item'>
          <button className='button' onClick = {(e) => {changeDay(3)}}>Next</button>  
        </p>
      </nav>

      <div className='columns is-0 section'>
        <Week day = {day}/>
        <Week day = {day + 1}/>
        <Week day = {day + 2}/>
      </div>
    </>
  )
}

export default Calendar
