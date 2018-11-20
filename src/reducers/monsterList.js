let defaultState = {
  monsterList: 'asdasdasdas'
}

function monsterList (state = defaultState, action) {

  switch(action.type) {
    case 'SET_MONSTER_LIST':
      return {
        ...state,
        monsterList: action.payload
      }
    default:
      return state
  }

}

export default monsterList
