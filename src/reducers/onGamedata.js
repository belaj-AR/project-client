let defaultState = {
  onGameData: null
}

function onGameData (state = defaultState, action) {

  switch(action.type) {
    case 'SET_ON_GAME_DATA':
      return {
        ...state,
        onGameData: action.payload,
      }
    default:
      return state
  }

}

export default onGameData
