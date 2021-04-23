import React from 'react'
import Calendar from './Calendar'

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
      <Calendar/>
    </>
  )
}

export default App
