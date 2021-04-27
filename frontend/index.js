import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './src/components/App'
import rootReducer from './src/reducers'

const store = createStore(rootReducer)
 

import 'bulma/css/bulma.min.css'

ReactDOM.render(
  <Provider store = {store}>
    <App/>
  </Provider>, document.getElementById('react-root'))