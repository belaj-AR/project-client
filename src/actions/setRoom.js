import config from '../../config'

const { firebaseDB } = config

export default (currentUser, cb) => {
  return (dispatch) => {

    // let { fname, email } = currentUser

    // firebaseDB.ref('Rooms/' + email).set({
    //   host: {
    //     email
    //   },
    //   players: {
    //     p1: {
    //       fname,
    //       email,
    //       monster: 'as'
    //     }
    //   },
    //   status: 'Waiting'
    // }, err => {
    //   if (!err) {
    //     cb()
    //   }
    // })

  }
};
