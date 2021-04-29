import React, {useState, useEffect} from 'react'
import Navbar from './smallComponents/Navbar'
import axios from 'axios'

const CalendarInfo = () => {
  const [usersWithNoAvalibility, setUsersWithNoAvalibility] = useState([])
  const [users, setUsers] = useState([])
  const [toggle, setToggle] = useState(true)

  useEffect(() => {
    async function fetch() {
      const usersWoAvalibility = await axios.get('/calendar/usersWithNoAvalibility')
      const user = await axios.get('/calendar/users')

      setUsersWithNoAvalibility(usersWoAvalibility.data)
      setUsers(user.data)
    }
    fetch()
  }, [])
  
  console.log(usersWithNoAvalibility)
  
  const generatePanelBlock = (elem) => {
    return (
      <>
        <a className="panel-block">
            {elem}
        </a>
      </>)
  }

  const panelTab = () => {
    if (toggle) {
      return(
      <>
        <p className='panel-tabs'>
          <a className='is-active'> All </a>
          <a onClick = {(e) => {setToggle(!toggle)}}> Pending </a>
        </p>
      </>)
    } else {
      return(
        <>
          <p className='panel-tabs'>
            <a onClick = {(e) => {setToggle(!toggle)}}> All </a>
            <a className='is-active'> Pending </a>
          </p>
        </>
      )
    }
    
  }

  const generatePanel = () => {
    let listOfElements = users
    
    if (!toggle) {
       listOfElements = usersWithNoAvalibility
    } 

    if (listOfElements !== undefined) {
        return (listOfElements.map((elm) => {
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
      <div className ="tabs is-medium">
        <ul>
          <li><a href='/calendar'>My Avalibility</a></li>
          <li><a href='/avalibility'>Group Avalibility</a></li>
          <li className = 'is-active'><a href='/info'> Group Info </a> </li>
        </ul>
      </div>
    </>)

  return (
    <>
      <Navbar/>
      {tabs}
      <div className = 'columns'>
        <div className= 'column'>
        </div>
        <div className = 'column'>
          {
            <nav className='panel is-primary'>
              <p className='panel-heading'> All Users </p>
              {panelTab()}
              {generatePanel()}
            </nav>
          }
        </div>
        <div className = 'column'>
        </div>
      </div>
    </>
  )


}

export default CalendarInfo
