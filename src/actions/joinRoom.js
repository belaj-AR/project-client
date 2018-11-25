import config from '../../config'

const { firebaseDB } = config

export default ({ fname, email, avatar, win, lose, id },key) => {
  return (dispatch) => {
    firebaseDB.ref(`/Room/roomList/` + key +'/players/p2').set({
      id,
      fname ,
      email,
      avatar,
      win : win.length,
      lose : lose.length,
      monster: null
    }, err => {
    if (!err) {
      dispatch({type: 'SET_ROOM_ID', payload: key})
    } else {
      alert('failed joining room')
    }
    }) 
  }
};
