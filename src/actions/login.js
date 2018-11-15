export default function (userData) {
  return function (dispatch) {
    dispatch({type: 'LOGIN_SUCCESS'})
  }
}
