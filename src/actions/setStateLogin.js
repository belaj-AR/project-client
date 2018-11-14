export default function (state) {

  return function (dispatch) {
    dispatch({type: 'SET_STATE_LOGIN', payload: {key: Object.keys(state), val: Object.values(state)}})
  }

}