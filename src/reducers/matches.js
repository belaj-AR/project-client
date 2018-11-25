let defaultState = {
  matches: []
}

function matches (state = defaultState, action) {

  switch(action.type) {
    case 'SET_MATCHES':
      return {
        ...state,
        matches: action.payload,
      }
    default:
      return state
  }

}

export default matches
