let defaultState = {
  fistName: '',
  lastName: '',
  email: '',
  password: '',
}

function Login (state = defaultState, action) {

  switch(action.type) {
    case 'SET_STATE_LOGIN':
      return {
        ...state,
        firstName: action.payload,
        lastName: action.payload,
        email: action.payload,
        password: action.payload
      }
    default:
      return state
  }

}

export default Login
