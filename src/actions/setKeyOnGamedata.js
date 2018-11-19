import config from '../../config'

const { firebaseDB } = config

export default function (roomId) {

  return function (dispatch) {

    let newKey = firebaseDB
      .ref()
      .child(`/OnGame/onGameList`)
      .push().key

    firebaseDB.ref(`/Room/roomList/` + roomId + '/onGameKey').set(newKey)
  }
}
