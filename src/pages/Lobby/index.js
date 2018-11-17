import React, { Component } from 'react'
import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'

import ActionArea from '../../components/ActionArea'
import ButtonComp from '../../components/Button'
import Modal from '../../components/Modal'

class Lobby extends Component {

  constructor(props) {
    super(props)

    this.state={
      modalVisible: false
    }
  }
  
  changeModalVisible = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    })
  }

  joinRoom = () => {
    Alert('Notification', 'Creating an account success!', [
      {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
    ])
  }

  render() {

    const {
      containerStyle,
      paddingOuter,
      paddingInner,
      contentArea,
      contentProfile,
      cardList,
      BoxButtonRegister,
      buttonTextRegisterStyle
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
              <View style={cardList}>

              </View>
            </View>
            <ActionArea fn={this.props.navigation.navigate}/>
          </View>
          <Modal
            data={{
              changeModalVisible: this.changeModalVisible,
              modalVisible : this.state.modalVisible,
              msgTitle: 'Notification Create', 
              msgSuccess: 'Room created', 
              msgFailed: 'Creating room failed',
              fnSuccess: this.props.navigation.navigate('Home'),
              fnFailed: this.props.navigation.navigate('Lobby')
            }}
          >
          </Modal>
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
    borderWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  cardList: {
    alignSelf: 'stretch',
    elevation: 2,
    padding: 8,
    borderRadius: 10,
    height: 80,
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
}

export default Lobby
