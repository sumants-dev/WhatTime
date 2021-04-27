
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import styled from 'styled-components'


const AvalibilityStaticButton = ({time, day, hour, isOwner}) => {
  const changed_time = moment(time).add(day, 'd').hour(hour)
  const changed_time_format = changed_time.format()
  const [isClick, setIsClick] = useState(false)
  // https://github.com/facebook/react/issues/14326
  
  useEffect(() => {
    const intervalID = setInterval(async () => {
      const { data } = await axios.get('calendar/avalibility')
      setIsClick(data.includes(changed_time_format))
    }, 3500)
    return () => clearInterval(intervalID)
  }, [])

  const click = () => {
    if (isOwner) {
      // do Something
    } else {
      alert('Not Owner; You cannot set the date')
    }
  }

  if (isClick && moment().isBefore(changed_time)) {
  return (
    <>
      <button className="button has-text-centered	is-primary is-fullwidth" onClick = {(e) => {click()}}> 
        {
          changed_time.format('hh:mm a')
        } 
      </button>
      <br/>
    </>)
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

export default AvalibilityStaticButton
