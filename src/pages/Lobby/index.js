import React, { Component } from 'react'
import {View, Text, ScrollView, StyleSheet} from 'react-native'
import ButtonComp from '../../components/Button'

class Lobby extends Component {
  
  joinRoom = () => {
    alert('hello')
  }

  render() {

    const { containerStyle, 
            boxCreate, 
            butttonCreateStyle, 
            buttonTextCreateStyle, 
            boxRoom,
            boxTitleStyle,
            titleStyle,
            buttonRoomStyle,
            buttonRoomTextStyle } = styles

    return (
      <View style={containerStyle}>
        
        <View style={boxCreate}>
          <ButtonComp 
            style={butttonCreateStyle}
            styleText={buttonTextCreateStyle}
            title='CREATE ROOM'
            fn={() => {}}/>
        </View>

        <View style={boxRoom}>
          <View style={boxTitleStyle}>
            <Text style={titleStyle}>JOIN ROOM</Text>
          </View>

          <ScrollView>
            <ButtonComp 
              style={buttonRoomStyle} 
              styleText={buttonRoomTextStyle} 
              title='Room: Cmon War'
              fn={() => this.joinRoom()}/>
          </ScrollView>

        </View>

       

      </View>
    )
  }

}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#72A2C0',
    paddingTop: 20
  },
  boxCreate: {
    marginLeft: 10,
    marginRight: 10
  },
  butttonCreateStyle: {
    elevation: 2,
    marginTop: 5,
    borderRadius: 7,
    backgroundColor: '#192E5B',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextCreateStyle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#BCDAFB'
  },
  boxRoom: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 7,
    height: 500,
    backgroundColor: '#192E5B'
  },
  boxTitleStyle: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  titleStyle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#BCDAFB',
  },
  buttonRoomStyle: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 7,
    padding: 10,
    backgroundColor: '#72A2C0'
  },
  buttonRoomTextStyle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#192E5B'
  }
}

export default Lobby