let defaultState = {
  onlineUser: null
}

function onlineUser (state = defaultState, action) {

  switch(action.type) {
    case 'SET_ONLINE_USER':
      return {
        ...state,
        onlineUser: action.payload
      }
    default:
      return state
  }

}

export default onlineUser
