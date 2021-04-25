import React from 'react'
import CalendarAppointment from './CalendarAppointment'
import CalendarAvalibility from './CalendarAvalibility'

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
        <Route exact path = '/'>
          <CalendarAppointment/>
        </Route>
        <Route path = '/avalibility'>
          <CalendarAvalibility />
        </Route>  
      </Switch>
    </Router>
    </>
  )
}

export default App
