let defaultState = {calendarName: ''}

const calendar = (state = defaultState, action) => {
  const { type, calendarName} = action
  console.log(calendarName)
  switch (type) {
    case 'MODIFY_ACTIVE_CALENDAR':
      return {...state, calendarName}
    default:
      return {...state}
  }
}

export default calendar