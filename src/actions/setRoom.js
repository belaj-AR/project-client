import config from '../../config'

const { firebaseDB } = config

export default ({ email, fname, avatar, win, lose }, roomName) => {
  return (dispatch) => {

    let newKey = firebaseDB
      .ref()
      .child(`/Room/roomList`)
      .push().key

    firebaseDB.ref(`/Room/roomList/` + newKey).set({
      id: newKey,
      name: roomName,
      host: email,
      players: {
        p1: {
          fname: fname ,
          email: email,
          avatar: avatar,
          win : win.length,
          lose : lose.length,
          monster: null
        }
      },
      status: 'Waiting'    
    }, err => {
      if (!err) {
        dispatch({type: 'SET_ROOM_ID', payload: newKey})
        dispatch({type: 'SET_VAL_CREATE_INPUT', payload: ''})
      } else {
        
      }
    })
  }
};
