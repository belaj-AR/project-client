import config from '../../config'

const { firebaseDB } = config

export default ({ fname, email, avatar },key) => {
  return (dispatch) => {
    firebaseDB.ref(`/Room/roomList/` + key +'/players/p2').set({
      fname ,
      email,
      avatar,
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
