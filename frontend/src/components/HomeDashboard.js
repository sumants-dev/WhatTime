import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Navbar from './smallComponents/Navbar'

const HomeDashboard = () => {
  const [calendars, setCalendars] = useState()
  const history = useHistory()

  useEffect(() => {
    async function fetch() {
      const { data } =  await axios.get('user/calendars')
      if (data !== 'Not Authenticated') {
        setCalendars(data)  
      } else {
        history.push('/login')
      }
    }

    fetch()
  }, [])

  const changeActiveCalendar = async (calendar) => {
    console.log(calendar)
    await axios.post('user/activeCalendar', {calendar})
    history.push('/calendar')
  }

  const generatePanelBlock = (calendar) => {
    console.log(calendar)
    return (
      <>
        <a className="panel-block" onClick = {(e)=> {changeActiveCalendar(calendar)}}>
            {calendar}
        </a>
      </>)
  }

  const generateCalendar = () => {

    if (calendars !== undefined) {
        console.log(calendars)
        return (calendars.map((elm) => {
          return (
            <>
              {generatePanelBlock(elm)}
            </>
          )
        }))
    } else {
      return (
        <>
        </>
      )
    }
  }
  

  const tabs = (
  <>
        <div className="tabs is-medium">
          <ul>
            <li className="is-active"><a href='/'> Your Calendars </a></li>
            <li><a href='/new'> New Calendar </a></li>
          </ul>
        </div>      
  </>)

  return (
    <>
      <Navbar/>
      {tabs}
      <section className='section'>
        <div className = 'columns'>
          <div className = 'column'>
          </div>
          <div className = 'column'>
            <nav className='panel is-primary'>
              <p className='panel-heading'> Calendars </p>
              {generateCalendar()}
            </nav>
          </div>
          <div className = 'column'>
          </div>
        </div>
      </section>
    </>
  )
}



export default HomeDashboard
