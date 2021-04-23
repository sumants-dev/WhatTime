import React, { useEffect, useState } from 'react'
import moment from 'moment'

const AppointmentButton = ({time, day, hour}) => {
  const [isClicked, setIsClicked] = useState(false)
  const changed_time = moment(time).add(day, 'd').hour(hour)

  if (isClicked && moment().isBefore(changed_time)) {
  return (
    <>
      <button className="button has-text-centered	 is-primary is-fullwidth" onMouseDown = {(e) => {
        console.log(changed_time.format())
        setIsClicked(!isClicked)
      }}> {
        changed_time.format('hh:mm a')
      } 
      </button>
      <br/>
    </>
  )
  } else if (moment().isBefore(changed_time)) {
    return (
      <>
        <button className="button has-text-centered	is-fullwidth" onMouseDown = {(e) => {
          console.log(changed_time.format())
          setIsClicked(!isClicked)
        }}> {
          changed_time.format('hh:mm a')
        } 
        </button>
        <br/>
      </>
    )
  } else {
    return (
      <>
        <button className="button is-static has-text-weight-light	has-text-centered	is-fullwidth">
          {changed_time.format('hh:mm a')}
        </button>
        <br/>
      </>
    )
  }

}

export default AppointmentButton