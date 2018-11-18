let defaultState = {
  valCreateInput: 'asd'
}

function valCreateInput (state = defaultState, action) {

  switch(action.type) {
    case 'SET_VAL_CREATE_INPUT':
      return {
        ...state,
        valCreateInput: action.payload
      }
    default:
      return state
  }

}

export default valCreateInput
