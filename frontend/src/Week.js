import React, { useEffect, useState } from 'react'
import moment from 'moment'
import AppointmentButton from './smallComponents/AppointmentButton'

const Week = (props) => {
  const {day} = props
  const time = moment().startOf('day')

  const hours =  [...Array(24).keys()]

  return(
    <>
      <div className='column'>              
        <h1 className='is-size-4'> {moment(time).add(day, 'd').format('dddd MM DD')} </h1>
    
        {
          hours.map(hour => {
            return(
              <AppointmentButton time = {time} day = {day} hour = {hour} />
            )
          })
        }
      </div>
    </>
  )

}

export default Week