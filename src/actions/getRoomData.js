import config from '../../config'

const { firebaseDB } = config

export default () => {
  return (dispatch) => {
    firebaseDB.ref('Room').on('value', function(snapshot) {
      let data  = []

      for (let i = 0; i < Object.values(snapshot.val().roomList).length; i++) {
        data.push({
          idRoom: Object.keys(snapshot.val().roomList)[i],
          room: Object.values(snapshot.val().roomList)[i]
        })
      }

      dispatch({type: 'SET_DATA_ROOM', payload: data})
    });
  }
};
