import React, { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios'

const AppointmentButton = ({time, day, hour, calendar}) => {

  const changed_time = moment(time).add(day, 'd').hour(hour)
  const changed_time_format = changed_time.format()
  const [isClick, setIsClick] = useState(false)
  // https://github.com/facebook/react/issues/14326
  useEffect(() => {
    async function fetch() {
      const { data } = await axios.post('/user/avalibility', {calendar})
      const { times } = data[0]
      setIsClick(times.includes(changed_time_format))
    }

    fetch()
  }, [])


  const addAvalibility = () => {
    axios.post('/user/avalibility/add', 
      {calendar: calendar, time: changed_time_format }
    ).then(setIsClick(!isClick))
    .catch((e) => {console.log(e)})
  }

  const removeAvalibility = () => {
    axios.post('/user/avalibility/delete',
      {calendar: calendar, time: changed_time_format}
    ).then(setIsClick(!isClick))
  }

  if (isClick && moment().isBefore(changed_time)) {
  return (
    <>
      <button className="button has-text-centered	 is-primary is-fullwidth" onClick = {(e) => {removeAvalibility()}}> 
        {
          changed_time.format('hh:mm a')
        } 
      </button>
      <br/>
    </>
  )
  } else if (moment().isBefore(changed_time)) {
    return (
      <>
        <button className="button has-text-centered	is-fullwidth" onClick = {(e) => {addAvalibility()}}> 
          {
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