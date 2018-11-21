

export default function (playerWinner, gameId, roomId) {
  return function(dispatch){
    dispatch({
      type: 'SET_DATA_FROM_GAME',
      payload : {
        playerWinner: playerWinner,
        roomId: gameId,
        gameId: roomId
      }
    });
  }
 
}