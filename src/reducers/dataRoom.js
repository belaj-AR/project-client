let defaultState = {
  dataRoom: []
}

function dataRoom (state = defaultState, action) {

  switch(action.type) {
    case 'SET_DATA_ROOM':
      return {
        ...state,
        dataRoom: action.payload,
      }
    default:
      return state
  }

}

export default dataRoom
