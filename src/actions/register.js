
import config from '../../config'

const { firebaseAuth } = config

export default function (dataUser) {

  return function (dispatch) {

    

    dispatch({type: 'REGISTER_SUCCESS'})
  }

}
