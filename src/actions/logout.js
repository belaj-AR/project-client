export default function () {
  return function (dispatch) {
    dispatch({type: 'SET_TOKEN', payload: null})
  }
}
