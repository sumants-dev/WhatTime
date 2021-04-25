import moment from "moment"

import moment from 'moment'

let defaultState = {time: moment()}

const introduction = (state = defaultState, action) => {
  const { type, image, description, isModify } = action

  switch (type) {
    case 'MODIFY_INTRODUCTION':
      return {image, description, isModify}
    case 'TOGGLE_INTRODUCTION':
      return {...state, isModify: !state.isModify}
    default:
      return state
  }
}

export default introduction