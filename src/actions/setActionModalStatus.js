export default function (val) {

  return function (dispatch) {
    dispatch({type: 'SET_ACTION_MODAL_STATUS', payload: val})
  }

}
