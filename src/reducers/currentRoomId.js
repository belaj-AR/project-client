let defaultState = {
  roomId: null
}

function roomId (state = defaultState, action) {

  switch(action.type) {
    case 'SET_ROOM_ID':
      return {
        ...state,
        roomId: action.payload,
      }
    default:
      return state
  }

}

export default roomId
