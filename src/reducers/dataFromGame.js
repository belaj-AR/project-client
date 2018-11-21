let defaultState = {
  playerWinner: null,
  roomId: null,
  gameId: null
} 

function dataFromGame (state = defaultState, action) {

  switch(action.type) {
    case 'SET_DATA_FROM_GAME':
      return {
        ...state,
        playerWinner: action.payload.playerWinner,
        gameId: action.payload.gameId,
        roomId: action.payload.roomId
      }
    default:
      return state
  }

}

export default dataFromGame
