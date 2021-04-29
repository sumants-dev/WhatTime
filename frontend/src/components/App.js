import React from 'react'
import CalendarAppointment from './CalendarAppointment'
import CalendarAvalibility from './CalendarAvalibility'
import Login from './Login'
import HomeDashboard from './HomeDashboard'
import CreateCalendar from './CreateCalendar'
import CalendarInfo from './CalendarInfo'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

// User https://reactrouter.com/web/example/url-params to figure out front end routing
// Used Bulma example components throughout
const App = () => {
  return (
    <>
    <Router>
      <Switch>
        <Route path = '/login'>
          <Login/>
        </Route>
        <Route path = '/calendar'>
          <CalendarAppointment/>
        </Route>
        <Route path = '/avalibility'>
          <CalendarAvalibility/>
        </Route>  
        <Route exact path = '/'>
          <HomeDashboard/>        
        </Route>
        <Route path = '/new'>
          <CreateCalendar/>
        </Route>
        <Route path = '/info'>
          <CalendarInfo/>
        </Route>
      </Switch>
    </Router>
    </>
  )
}

export default App
