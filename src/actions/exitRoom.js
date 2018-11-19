import axios from 'axios'

import config from '../../config'

const { firebaseDB } = config

export default function (currentRoomId, currentUserEmail, structureDataPlayers) {
  return function (dispatch) {
    
    let isPlayerHost = false
    for (let i = 0; i < structureDataPlayers.length; i++) {
      if (structureDataPlayers[i].email === currentUserEmail) {
        if ( i == 0) {
          dispatch({type: 'SET_ROOM_ID', payload: null})
          isPlayerHost = true
        }
      }
    }

    if (!isPlayerHost) {
      firebaseDB.ref(`/Room/roomList/` + currentRoomId + '/players/p2').remove()
      dispatch({type: 'SET_ROOM_ID', payload: null})
    } else {
      if (structureDataPlayers.length === 2) {
        firebaseDB.ref(`/Room/roomList/` + currentRoomId + '/players/p1').set({
          avatar: structureDataPlayers[1].avatar,
          email: structureDataPlayers[1].email,
          fname: structureDataPlayers[1].fname,
          monster: structureDataPlayers[1].monster || null,
          lose: structureDataPlayers[1].lose,
          win: structureDataPlayers[1].win
        })
        firebaseDB.ref(`/Room/roomList/` + currentRoomId + '/host').set(structureDataPlayers[1].email)
        firebaseDB.ref(`/Room/roomList/` + currentRoomId + '/players/p2').remove()
      } else {
        firebaseDB.ref(`/Room/roomList/` + currentRoomId).remove()
      }
    }
  }
}
