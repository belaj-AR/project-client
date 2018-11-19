import config from '../../config'

const { firebaseDB } = config

export default function (dataPlayerOnline, roomKey, onGameKey) {

  return function (dispatch) {

    let dataPlayer = JSON.parse(JSON.stringify(dataPlayerOnline))

    let p1Element = dataPlayer[0].monster.element
    let p2Element = dataPlayer[1].monster.element

    if (p1Element === 'fire') {
      if (p2Element === 'fire') {
        dataPlayer[0].monster.dmg = 50
        dataPlayer[1].monster.dmg = 50
      } else if (p2Element === 'water') {
        dataPlayer[0].monster.dmg = 50
        dataPlayer[1].monster.dmg = 75
      } else if (p2Element === 'earth') {
        dataPlayer[0].monster.dmg = 75
        dataPlayer[1].monster.dmg = 50
      }
    } else if (p1Element === 'water') {
      if (p2Element === 'fire') {
        dataPlayer[0].monster.dmg = 50
        dataPlayer[1].monster.dmg = 75
      } else if (p2Element === 'water') {
        dataPlayer[0].monster.dmg = 50
        dataPlayer[1].monster.dmg = 50
      } else if (p2Element === 'earth') {
        dataPlayer[0].monster.dmg = 75
        dataPlayer[1].monster.dmg = 50
      }
    } else if (p1Element === 'earth') {
      if (p2Element === 'fire') {
        dataPlayer[0].monster.dmg = 50
        dataPlayer[1].monster.dmg = 75
      } else if (p2Element === 'water') {
        dataPlayer[0].monster.dmg = 75
        dataPlayer[1].monster.dmg = 50
      } else if (p2Element === 'earth') {
        dataPlayer[0].monster.dmg = 50
        dataPlayer[1].monster.dmg = 50
      }
    }

    firebaseDB.ref(`/OnGame/onGameList/` + onGameKey).set({
      gameId: onGameKey,
      roomId: roomKey,
      p1: {
        id: dataPlayer[0].id,
        fname: dataPlayer[0].fname,
        email: dataPlayer[0].email,
        avatar: dataPlayer[0].avatar,
        win : dataPlayer[0].win,
        lose : dataPlayer[0].lose,
        monster: dataPlayer[0].monster
      },
      p2: {
        id: dataPlayer[1].id,
        fname: dataPlayer[1].fname,
        email: dataPlayer[1].email,
        avatar: dataPlayer[1].avatar,
        win : dataPlayer[1].win,
        lose : dataPlayer[1].lose,
        monster: dataPlayer[1].monster
      },
      status: 'onGoing'    
    }, err => {
      if (!err) {
        firebaseDB.ref('/OnGame/onGameList/'+ onGameKey).on('value', function(snapshot) {
          dispatch({ type: 'SET_ON_GAME_DATA', payload: snapshot.val()})
        });
      }
    })

    firebaseDB.ref(`/Room/roomList/` + roomKey + '/status').set('On Game')
  }
}
