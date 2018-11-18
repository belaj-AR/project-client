export default function (dataPlayerOnline) {

  return function (dispatch) {

    let dataPlayer = JSON.parse(JSON.stringify(dataPlayerOnline))

    let p1Element = dataPlayer[0].monster.element
    let p2Element = dataPlayer[1].monster.element

    if (p1Element === 'fire') {
      if (p2Element === 'fire') {
        dataPlayer[0].status = null
        dataPlayer[1].status = null
      } else if (p2Element === 'water') {
        dataPlayer[0].status = false
        dataPlayer[1].status = true
      } else if (p2Element === 'earth') {
        dataPlayer[0].status = true
        dataPlayer[1].status = false
      }
    } else if (p1Element === 'water') {
      if (p2Element === 'fire') {
        dataPlayer[0].status = false
        dataPlayer[1].status = true
      } else if (p2Element === 'water') {
        dataPlayer[0].status = null
        dataPlayer[1].status = null
      } else if (p2Element === 'earth') {
        dataPlayer[0].status = true
        dataPlayer[1].status = false
      }
    } else if (p1Element === 'earth') {
      if (p2Element === 'fire') {
        dataPlayer[0].status = false
        dataPlayer[1].status = true
      } else if (p2Element === 'water') {
        dataPlayer[0].status = true
        dataPlayer[1].status = false
      } else if (p2Element === 'earth') {
        dataPlayer[0].status = null
        dataPlayer[1].status = null
      }
    }
    dispatch({ type: 'SET_ON_GAME_DATA', payload: dataPlayer })
  }

}
