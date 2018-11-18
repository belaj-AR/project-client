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
      firebaseDB.ref(`/Room/roomList/` + currentRoomId + '/players').set(
      {
        p1: {
          fname: structureDataPlayers[0].fname,
          email: structureDataPlayers[0].email,
          avatar: structureDataPlayers[0].avatar,
          monster: structureDataPlayers[0].monster || null
        }
      })
      dispatch({type: 'SET_ROOM_ID', payload: null})
    } else {
      firebaseDB.ref(`/Room/roomList/` + currentRoomId).remove()
    }
  }
}
