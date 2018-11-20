import config from '../../config'

const {firebaseDB} = config

export default (currentRoomId, onGameKey) => { 

  return function (dispatch) {
    dispatch({ type: 'SET_ON_GAME_DATA', payload: null})
    firebaseDB.ref(`/Room/roomList/` + currentRoomId).remove()
    firebaseDB.ref(`/OnGame/onGameList/` + onGameKey).remove()
  }


}