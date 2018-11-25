let defaultState = {
  actionModalStatus: null
}

function actionModalStatus (state = defaultState, action) {

  switch(action.type) {
    case 'SET_ACTION_MODAL_STATUS':
      return {
        ...state,
        actionModalStatus: action.payload
      }
    default:
      return state
  }

}

export default actionModalStatus
