import React, { useState } from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import Navbar from './smallComponents/Navbar'

const CreateCalendar  = () => {
  const [calendar, setCalendar] = useState('')
  const [invitedUsers, setInvitedUsers] = useState('')
  const history = useHistory()

  const submit = async () => {
    if (calendar !== '' && calendar !== undefined && invitedUsers !== '' && invitedUsers !== undefined) {
      await axios.post('/calendar/create', { calendar, invitedUsers})
      clear()
      history.push('/')
    } else {
      alert("Empty Fields")
    }
  }

  const clear = () => {
    setCalendar('')
    setInvitedUsers('')
  }


  const tabs = (
  <>
        <div className="tabs is-medium">
          <ul>
            <li><a href='/'> Your Calendars </a></li>
            <li className="is-active"><a href='/new'> New Calendar </a></li>
          </ul>
        </div>      
  </>)

  return (
    <>
      <Navbar/>
      {tabs}
      <section className='section'>
        <div className = 'columns'>
          <div className = 'column'></div>
          <div className = 'column'>
            <div className='card'>
              <header className='card-header'>
                <p className='card-header-title'>
                  Enter Information for your new calendar
                </p>
              </header>
              <div className='card-content'>
                <h1 className='has-text-weight-semibold	is-size-4'> Calendar Name</h1>
                <input className="input is-large" type="text" placeholder="Calendar Name" onChange = {(e) => {console.log(e); setCalendar(e.target.value)}} value =  {calendar} ></input>
              </div>
              <div className='card-content'>
                <h1 className='has-text-weight-semibold	is-size-4'> Invited User's Emails</h1>
                <textarea className="textarea is-link" placeholder="sumants@sas.upenn.edu; sshringari@gmail.com" onChange = {(e) => {setInvitedUsers(e.target.value)}} value =  {invitedUsers}></textarea>
              </div>
              <footer className="card-footer">
                <a href="#" className="card-footer-item" onClick={(e) => {clear()}}>Clear</a>
                <a href="#" className="card-footer-item" onClick={(e) => {submit()}}>Save</a>
              </footer>
            </div>      
          </div>
          <div className = 'column'></div>
        </div>
      </section>
    </>
  )
}

export default CreateCalendar
