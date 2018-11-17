export default function (val) {

  return function (dispatch) {
    dispatch({type: 'SET_VAL_CREATE_INPUT', payload: val})
  }
}
