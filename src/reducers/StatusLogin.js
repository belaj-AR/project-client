let defaultState = {
  status: ''
}

function StatusLogin (state = defaultState, action) {

  switch(action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        status: action.payload
      }
    case 'LOGIN_FAILED':
      return {
        ...state,
        status: action.payload
      }
    default:
      return state
  }

}

export default StatusLogin