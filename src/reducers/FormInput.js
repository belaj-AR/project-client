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
        [action.payload.key]: action.payload.val[0],
      }
    case 'SET_STATE_REGISTER':
      return {
        ...state,
        [action.payload.key]: action.payload.val[0],
      }
    default:
      return state
  }

}

export default Login
