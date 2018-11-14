let defaultState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}

function Login (state = defaultState, action) {

  switch(action.type) {
    case 'SET_STATE_LOGIN':
      return {
        ...state,
        [action.payload.key]: action.payload.val,
      }
    case 'SET_STATE_REGISTER':
      return {
        ...state,
        [action.payload.key]: action.payload.val,
      }
    default:
      return state
  }

}

export default Login
