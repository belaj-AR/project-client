import React, { Component } from 'react'
import  { View,Text, Image, FlatList, TouchableOpacity, AsyncStorage, Dimensions } from 'react-native'
import { connect } from 'react-redux'

import ButtonComp from '../components/Button'

import getRoomBattleData from '../actions/getRoomBattleData'
import getMonsterList from '../actions/getMonsterList'
import exitRoom from '../actions/exitRoom'
import setPickMonster from '../actions/setPickMonster'
import setOnGameData from '../actions/setOnGameData'
import setKeyOnGamedata from '../actions/setKeyOnGamedata'

class RoomGame extends Component {

  constructor(props){
    super(props)

    this.state = {
      generateOnGameKey: false,
      isUserWasPickAMonster: false,
      selectedMonster: null
    }
  }

  componentDidMount = async () => {
    let { roomId, getRoomBattleData, getMonsterList } = this.props

    if (roomId === null)  {
      this.props.navigation.navigate('Lobby')
    }

    let token = await AsyncStorage.getItem('token')

    getMonsterList(token)
    getRoomBattleData(roomId)
  }

  componentDidUpdate = (nextProps, nextState) => {
    if (this.props.roomId === null || this.props.dataRoomBattle === null)  {
      this.props.navigation.navigate('Lobby')
    }
  }
  

  roomChecker = () => {
    let { dataRoomBattle, setKeyOnGamedata, roomId, currentUser } = this.props

    if (dataRoomBattle) {
      if (dataRoomBattle.players.length === 2) {
        if (dataRoomBattle.players[0].monster && dataRoomBattle.players[1].monster) {
          if (!this.state.generateOnGameKey) {
            if ( dataRoomBattle.host === currentUser.email) {
              setKeyOnGamedata(roomId)
              
              this.setState({
                generateOnGameKey: true,
              })
            }
          }
          return true
        }
      }
    }
  }

  changeSelectedMonster(monster) {
    this.setState({
      selectedMonster: monster
    })
  }

  changeUserPickedMonster() {
    this.setState({
      isUserWasPickAMonster: true
    })
  }

  playGame = () => {
    let { dataRoomBattle, setOnGameData, navigation , roomId} = this.props

    setOnGameData(dataRoomBattle.players, roomId, dataRoomBattle.onGameKey)
    navigation.navigate('Game')
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
             BoxButtonSelectMonster,
             monsterAvatar,
             monsterSelectedAvatar,
             buttonTextPlayGameStyle} = styles

    const { dataRoomBattle, currentUser, monsterList, setPickMonster, roomId } = this.props
    const { isUserWasPickAMonster, selectedMonster } = this.state

    return (
      <View style={containerStyle}>
        <View style={{
          flex: .6,
        }}>
        <View style={{
          flex: 1,
          margin: 10
        }}>
          {
            dataRoomBattle &&
              <FlatList
                data={dataRoomBattle.players}
                renderItem={({item}) => (
                  <View style={userStyle}>
                    <View style={{
                      marginRight:5
                    }}>
                      <Image style={userAvatar} source={{uri: item.avatar}}/>
                    </View>

                    <View style={{
                      justifyContent: 'center'
                    }}>
                      <Text style={userTextStyle}>{ item.fname }</Text>
                      <Text style={userTextStyle}>{'WIN  : ' + item.win}</Text>
                      <Text style={userTextStyle}>{'LOSE : ' + item.lose}</Text>
                    </View>
                  </View>
                )}
              />
          }
        </View>
        
        </View>
        <View style={{
          flex: .4,
          backgroundColor: '#1D65A6',
          borderRadius: 10,
          marginLeft: 10,
          marginRight: 10,
          padding: 10
        }}>
          <View
            style={{
              padding: 10,
              borderRadius: 10,
              backgroundColor: '#192E5B',
              justifyContent: 'center'
            }}
          > 
            {
              !isUserWasPickAMonster ?
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '700'
                  }}
                >
                  Select Your monster :
                </Text>
              :
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700'
                }}
              >
                You pick { selectedMonster.name } as your monster
              </Text>
            }
            { dataRoomBattle &&
              !isUserWasPickAMonster ?
                dataRoomBattle.players.map((user, idx) => {
                  return (
                    user.email === currentUser.email &&
                      !user.monster &&
                        monsterList &&
                          <FlatList
                              data={monsterList}
                              horizontal
                              showsHorizontalScrollIndicator={false}
                              renderItem={({item}) => (
                                <TouchableOpacity
                                  onPress={() => this.changeSelectedMonster(item)}
                                >
                                  <View style={{
                                    height: 70,
                                    width: 70,
                                    marginTop: 10,
                                    borderRadius: 10,
                                    backgroundColor: 'white',
                                    margin: 5
                                  }}>
                                    <Image style={monsterAvatar} source={{uri: item.image}}/>
                                  </View>
                                </TouchableOpacity>
                              )}
                          />
                  )
                })
              :
                dataRoomBattle &&
                  <View
                    style={{
                      height: Dimensions.get('window').height * 0.199,
                      marginTop: 10,
                      padding: 5
                    }}
                  >
                    <View style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row'
                    }}>
                      <View style={{
                        flex: .5,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {
                          dataRoomBattle.players[0] &&
                            dataRoomBattle.players[0].monster ?
                              <Image style={{
                                width: 110,
                                height: 110,
                                borderRadius: 10,
                              }} source={{uri: dataRoomBattle.players[0].monster.image}}/>
                            :
                              <Image style={{
                                width: 110,
                                height: 110,
                                borderRadius: 10,
                              }} source={{uri: dataRoomBattle.players[0].avatar}}/>
                        }
                      </View>
                      <View style={{
                        flex: .5,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {
                          dataRoomBattle.players[1] &&
                            dataRoomBattle.players[1].monster ?
                              <Image style={{
                                width: 110,
                                height: 110,
                                borderRadius: 10,
                              }} source={{uri: dataRoomBattle.players[1].monster.image}}/>
                            :
                              dataRoomBattle &&
                                dataRoomBattle.players[1] &&
                                  dataRoomBattle.players[1].avatar &&
                                    <Image style={{
                                      width: 110,
                                      height: 110,
                                      borderRadius: 10,
                                    }} source={{uri: dataRoomBattle.players[1].avatar}}/>
                        }
                      </View>
                    </View>
                  </View>
            }
          </View>
          <View
            style={{
              flex: .3
            }}
          >
            {
              selectedMonster ?
                !isUserWasPickAMonster &&
                  <ButtonComp 
                    style={BoxButtonSelectMonster} 
                    styleText={buttonTextPlayGameStyle}
                    fn={() => {
                      setPickMonster(roomId, currentUser.email, dataRoomBattle.players, selectedMonster)
                      this.changeUserPickedMonster()
                    }}
                    title='Select monster'/>
              : 
                <ButtonComp 
                  style={BoxButtonSelectMonster} 
                  styleText={buttonTextPlayGameStyle}
                  fn={() => {}}
                  title='Pick Your monster'/>
            }
          </View>
        </View>

        <View style={cardContainer}>
        {
          this.roomChecker() &&
            <ButtonComp 
              style={BoxButtonPlayGame} 
              styleText={buttonTextPlayGameStyle} 
              fn={() => this.playGame()} 
              title='START GAME'/>
        }
          <ButtonComp 
            style={BoxButtonPlayGame} 
            styleText={buttonTextPlayGameStyle}
            fn={() => this.exitRoom(roomId, currentUser.email, dataRoomBattle.players)}
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
  },
  cardContainer: {
    justifyContent: 'flex-end',
    flex:.3,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20
  },
  userStyle: {
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "#ddd",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#1D65A6'
  },
  userAvatar: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  monsterAvatar: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  monsterSelectedAvatar: {
    width: Dimensions.get('window').height * 0.1,
    height: Dimensions.get('window').height * 0.1,
    borderRadius: 10,
  },
  userTextStyle: {
    color: "#BCDAFB",
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 20
  },
  BoxButtonSelectMonster: {
    elevation: 2,
    marginTop: 10,
    borderRadius: 7,
    backgroundColor: '#192E5B',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BoxButtonPlayGame: {
    elevation: 2,
    marginTop: 10,
    borderRadius: 7,
    backgroundColor: '#192E5B',
    height: 40,
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
    dataRoom: state.dataRoom.dataRoom,
    monsterList: state.monsterList.monsterList
  })
}

const setDispatchToProps = (dispatch) => {
  return({
    getRoomBattleData: (key) => dispatch(getRoomBattleData(key)),
    getMonsterList: (token) => dispatch(getMonsterList(token)),
    exitRoom: (currentRoomId, currentUserEmail, structureDataPlayers) => dispatch(exitRoom(currentRoomId, currentUserEmail, structureDataPlayers)),
    setPickMonster: (currentRoomId, currentUserEmail, structureDataPlayers, monsterData) => dispatch(setPickMonster(currentRoomId, currentUserEmail, structureDataPlayers, monsterData)),
    setOnGameData: (data, roomId, onGameKey) => dispatch(setOnGameData(data, roomId, onGameKey)),
    setKeyOnGamedata: (roomId) => dispatch(setKeyOnGamedata(roomId))
  })
}

export default connect(setStateToProps,setDispatchToProps)(RoomGame)
 