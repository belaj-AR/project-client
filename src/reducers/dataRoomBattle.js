let defaultState = {
  dataRoomBattle: null
}

function dataRoomBattle (state = defaultState, action) {

  switch(action.type) {
    case 'SET_DATA_ROOM_BATTLE':
      return {
        ...state,
        dataRoomBattle: action.payload,
      }
    default:
      return state
  }

}

export default dataRoomBattle
