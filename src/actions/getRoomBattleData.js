import config from '../../config'

const { firebaseDB } = config

export default (key) => {
  return (dispatch) => {
    alert('masuk room')
    if (key) {
      firebaseDB.ref('Room/roomList/'+ key).on('value', function(snapshot) {

        if (snapshot.val()) {
          let data = {
            host: snapshot.val().host,
            id: snapshot.val().id,
            roomName: snapshot.val().name,
            players: [],
            status: snapshot.val().status
          }

          for (let i = 0; i < Object.keys(snapshot.val().players).length; i++) {
            data.players.push(
              Object.values(snapshot.val().players)[i]
            )
          }

          dispatch({type: 'SET_DATA_ROOM_BATTLE', payload: data})
        }
      });
    }
  }
};