export default function (state) {

  return function (dispatch) {
    dispatch({type: 'SET_STATE_REGISTER', payload: {key: Object.keys(state), val: Object.values(state)}})
  }

}