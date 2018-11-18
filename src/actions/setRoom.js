import config from '../../config'

const { firebaseDB } = config

export default ({ email, fname }, roomName) => {
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
              monster: 'naga kocak'
            }
          },
          status: 'Waiting'    
        }, err => {
          if (!err) {
            alert('creating room success')
            dispatch({type: 'SET_VAL_CREATE_INPUT', payload: ''})
          }
        })
  }
};
