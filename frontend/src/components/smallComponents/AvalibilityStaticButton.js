
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const AvalibilityStaticButton = ({time, day, hour, isOwner}) => {
  const changed_time = moment(time).add(day, 'd').hour(hour)
  const changed_time_format = changed_time.format()
  const [isClick, setIsClick] = useState(false)
  const [isNotAvalible, setIsNotAvalible] = useState(false)
  const history = useHistory()
  // https://github.com/facebook/react/issues/14326

  useEffect(() => {
    async function fetch() {
      const { data } = await axios.get('calendar/avalibility')
      let allTimes = await axios.get('calendar/times')
      allTimes = allTimes.data
      setIsClick(data.includes(changed_time_format))
      setIsNotAvalible(allTimes.includes(changed_time_format))
    }
    fetch()
  }, [])

  const click = () => {
    if (isOwner) {
      axios.post('/google/calendar/newEvent', { time: changed_time_format })
          .then((res) => {console.log(res)})
          .catch((e) => console.log(e))
    } else {
      alert('Not Owner! You cannot set the date!')
    }
  }

  if (isClick && moment().isBefore(changed_time)) {
    return (
      <>
        <button className="button has-text-centered	is-primary is-fullwidth" onClick = {(e) => {click(); location.reload(true)}}> 
          {
            changed_time.format('hh:mm a')
          } 
        </button>
        <br/>

      </>)
  } else if (isNotAvalible && moment().isBefore(changed_time)) {
    return (
      <>
        <button className="button has-text-centered	is-warning is-fullwidth"> 
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

export default AvalibilityStaticButton
