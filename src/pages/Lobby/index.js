import React, { Component } from 'react'
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, BackHandler, BackAndroid, Dimensions, FlatList} from 'react-native'
import { connect } from 'react-redux'

import ActionArea from '../../components/ActionArea'
import ButtonComp from '../../components/Button'
import ModalComp from '../../components/Modal'

import getRoomData from '../../actions/getRoomData'
import setRoom from '../../actions/setRoom'
import joinRoom from '../../actions/joinRoom'

class Lobby extends Component {

  constructor(props) {
    super(props)

    this.state={
      modalVisible: false
    }
  }
  
  componentDidMount = () => {
    let { getRoomData } = this.props
    getRoomData()
    BackHandler.addEventListener('hardwareBackPress', this.true)
  }

  componentDidUpdate = () => {
    if (this.props.roomId !== null) {
      this.props.navigation.navigate('Room');
    }
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.true)
  }
  
  true () {
    return true
  }
  
  changeModalVisible = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    })
  }

  joinRoom = (currentUser, key) => {
    this.props.joinRoom(currentUser, key)
  }

  render() {

    const { dataRoom, currentUser } = this.props

    const {
      containerStyle,
      paddingOuter,
      paddingInner,
      contentArea,
      contentProfile,
      cardList,
      BoxButtonRegister,
      buttonTextRegisterStyle,
      boxButtonJoinRoom,
      buttonTextJoinRoomStyle,
    } = styles

    return (
      <View style={containerStyle}>
        <View style={paddingOuter}>
        </View>
        <View style={{
          flex: 1,
          flexDirection: 'column'
        }}>
          <View style={paddingInner}>
          </View>
          <View style={{
            flex: 0.07,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
            <ButtonComp
              style={BoxButtonRegister}
              styleText={buttonTextRegisterStyle}
              fn={() => this.changeModalVisible()}
              title="Create room"/>
          </View>
          <View style={contentArea}>
            <View style={contentProfile}>
              <FlatList
                data={dataRoom}
                renderItem={({item}) => {
                    if (item.room.name !== 'InitAdmin') {
                      return (
                      <View style={cardList}>
                        <View style={{
                          flex:1,
                          flexDirection: 'row'
                        }}>
                          <View style={{
                            flex: 1,
                            paddingBottom: 10
                          }}>
                            <Text>
                              room :
                              { ' '+item.room.name }
                            </Text>
                            <Text>
                              host :
                              { ' '+item.room.players.p1.fname }
                            </Text>
                          </View>
                          <View style={{
                            flex: 1,
                            alignItems: 'flex-start',
                          }}>
                            <View style={{
                              borderRadius: 5,
                              padding: 5,
                              alignSelf: 'flex-end',
                              alignItems: 'center',
                              backgroundColor: item.room.status === 'Waiting' ? 'green' : 'red'
                            }}>
                              <Text style={{
                                color: 'white',
                                fontSize: 10,
                                fontWeight: '400'
                              }}>
                                { item.room.status }
                              </Text>
                            </View>
                          </View>                    
                        </View>
                        <ButtonComp
                          style={boxButtonJoinRoom}
                          styleText={buttonTextJoinRoomStyle}
                          fn={() => this.joinRoom(currentUser, item.room.id)}
                          title="Join room"/>
                      </View>)
                    }   
                  }
                }
              />
            </View>
            <ActionArea fn={this.props.navigation.navigate}/>
          </View>
          <ModalComp
            data={{
              changeModalVisible: this.changeModalVisible,
              modalVisible : this.state.modalVisible,
              msgTitle: 'Notification Create', 
              msgSuccess: 'Room created', 
              msgFailed: 'Creating room failed',
              fn: {
                fnSuccess: () => this.props.navigation.navigate('Lobby'),
                fnFailed: () => this.props.navigation.navigate('Lobby'),
              }
            }}
          />
          <View style={paddingInner}>
          </View>
        </View>
        <View style={paddingOuter}>
        </View>
      </View>
    )
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#72A2C0',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  paddingOuter: {
    flex:0.1,
  },
  paddingInner: {
    flex:0.03,
  },
  contentArea: {
    flex: 1
  },
  headerProfile: {
    flex: .08,
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  contentProfile: {
    flex: .9,
    marginTop: 10,
    padding: 5,
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  cardList: {
    flexDirection: 'column',
    marginBottom: 10,
    width: Dimensions.get('window').width * 0.78,
    elevation: 2,
    padding: 8,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'red'
  },
  actionArea: {
    marginTop: 20,
    flex: .8,
    borderRadius: 10,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  BoxButtonRegister: {
    elevation: 2,
    padding: 5,
    borderRadius: 7,
    backgroundColor: '#192E5B',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextRegisterStyle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#BCDAFB'
  },
  buttonTextJoinRoomStyle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#BCDAFB'
  },
  boxButtonJoinRoom: {
    marginTop: 10,
    padding: 5,
    borderRadius: 7,
    backgroundColor: '#1D65A6',
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  }
}

const setStateToProps = (state) => {
  return ({
    // onlineUser: state.onlineUser.onlineUser,
    roomId: state.roomId.roomId,
    currentUser: state.currentUser.currentUser,
    dataRoom: state.dataRoom.dataRoom
  })
}

const setDispatchToProps = (dispatch) => {
  return({
    getRoomData: () => dispatch(getRoomData()),
    setRoom: () => dispatch(setRoom()),
    joinRoom: (currentUser, key) => dispatch(joinRoom(currentUser, key))
  })
}

export default connect(setStateToProps,setDispatchToProps)(Lobby)
