import config from '../../config'

const { firebaseDB } = config

export default function (currentRoomId, currentUserEmail, structureDataPlayers, monsterData) {
  return function (dispatch) {
    
    for (let i = 0; i < structureDataPlayers.length; i++) {
      if (structureDataPlayers[i].email === currentUserEmail) {
        firebaseDB.ref(`/Room/roomList/` + currentRoomId + '/players/p' + (i + 1) +'/monster' ).set(monsterData)
      }
    }
  }
}
