export default function (dataUser) {

  return function (dispatch) {
    dispatch({type: 'LOGIN_SUCCESS'})
  }

}