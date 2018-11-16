export default function (token) {

  return function (dispatch) {
    dispatch({type: 'SET_TOKEN', payload: token})
  }
}
