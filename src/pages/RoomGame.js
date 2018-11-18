import React, { Component } from 'react'
import  { View,Text, Image, BackHandler } from 'react-native'
import { connect } from 'react-redux'

import ButtonComp from '../components/Button'

import getRoomBattleData from '../actions/getRoomBattleData'
import exitRoom from '../actions/exitRoom'

class RoomGame extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount = () => {
    let { roomId, getRoomBattleData } = this.props

    if (roomId === null)  {
      this.props.navigation.navigate('Lobby')
    }
    getRoomBattleData(roomId)
  }

  componentDidUpdate = () => {
    if (this.props.roomId === null || this.props.dataRoomBattle === null)  {
      this.props.navigation.navigate('Lobby')
    }
  }

  playGame = () => {
    this.props.navigation.navigate('Game')
  }

  exitRoom = (currentRoomId, currentUserEmail, structureDataPlayers) => {
    this.props.exitRoom(currentRoomId, currentUserEmail, structureDataPlayers)
  }

  render(){

     const { containerStyle,
             cardContainer,
             userStyle,
             userAvatar,
             userTextStyle,
             BoxButtonPlayGame,
             buttonTextPlayGameStyle} = styles

    const { dataRoomBattle, currentUser } = this.props

     const dataUser = [
                       {name: 'Harles Bayu Agggara', avatar:'https://banner2.kisspng.com/20180410/bbw/kisspng-avatar-user-medicine-surgery-patient-avatar-5acc9f7a7cb983.0104600115233596105109.jpg', win: 10, lose: 3, heroID: 'abcde'},
                       {name: 'Giri Anggara', avatar:'https://banner2.kisspng.com/20180410/bbw/kisspng-avatar-user-medicine-surgery-patient-avatar-5acc9f7a7cb983.0104600115233596105109.jpg', win: 10, lose: 4, heroID: 'abcde'},
                      ]  

    return (
      <View style={containerStyle}>
        <Text>
          { JSON.stringify(this.props.dataRoomBattle) }
        </Text>
        <Text>
          { JSON.stringify(this.props.roomId) }
        </Text>
        {
          dataRoomBattle &&
            dataRoomBattle.players.map((user, idx) => 
            <View key={idx} style={cardContainer}>
              <View style={userStyle}>
                <View style={{
                  marginRight:5
                }}>
                  <Image style={userAvatar} source={{uri: user.avatar}}/>
                </View>

                <View>
                  <Text style={userTextStyle}>{user.fname}</Text>
                  <Text style={userTextStyle}>{'WIN  : ' + '10'}</Text>
                  <Text style={userTextStyle}>{'LOSE : ' + '10'}</Text>
                </View>
              </View>
            </View>
          )
        }

        <View style={cardContainer}>
          <ButtonComp 
            style={BoxButtonPlayGame} 
            styleText={buttonTextPlayGameStyle} 
            fn={() => this.playGame()} 
            title='START GAME'/>
        </View>
        <View style={cardContainer}>
          <ButtonComp 
            style={BoxButtonPlayGame} 
            styleText={buttonTextPlayGameStyle} 
            fn={() => this.exitRoom(this.props.roomId, currentUser.email, dataRoomBattle.players)} 
            title='Exit'/>
        </View>
        
      </View>
    )
  }
}



const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#72A2C0',
    justifyContent: "center",
  },
  cardContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  userStyle: {
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "#ddd",
    position: "relative",
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#1D65A6'
  },
  userAvatar: {
    width: 70,
    height: 70
  },
  userTextStyle: {
    color: "#BCDAFB"
  },
  BoxButtonPlayGame: {
    elevation: 2,
    marginTop: 20,
    borderRadius: 7,
    backgroundColor: '#192E5B',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextPlayGameStyle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#BCDAFB'
  }
}

const setStateToProps = (state) => {
  return ({
    roomId: state.roomId.roomId,
    dataRoomBattle: state.dataRoomBattle.dataRoomBattle,
    currentUser: state.currentUser.currentUser,
    dataRoom: state.dataRoom.dataRoom
  })
}

const setDispatchToProps = (dispatch) => {
  return({
    getRoomBattleData: (key) => dispatch(getRoomBattleData(key)),
    exitRoom: (currentRoomId, currentUserEmail, structureDataPlayers) => dispatch(exitRoom(currentRoomId, currentUserEmail, structureDataPlayers))
  })
}

export default connect(setStateToProps,setDispatchToProps)(RoomGame)
