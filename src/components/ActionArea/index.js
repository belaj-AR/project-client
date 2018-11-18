import React, {Component} from 'react'
import {View, Text, Alert, ScrollView, TouchableOpacity} from 'react-native'

const styles = {
  firstButton: {
    backgroundColor: '#1D65A6',
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  secondButton: {
    backgroundColor: '#1D65A6',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdButton: {
    backgroundColor: '#1D65A6',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  firstText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    color: '#BCDAFB'
  },
  secondText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    color: '#BCDAFB'
  },
  thirdText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    color: '#BCDAFB'
  },
  actionArea: {
    marginTop: 20,
    flex: .08,
    borderRadius: 10,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  flexTouchableArea: {
    flex: 1
  }
}

const {
  flexTouchableArea,
  firstButton,
  secondButton,
  thirdButton,
  firstText,
  secondText,
  thirdText,
  actionArea
} = styles

export default ({ fn }) => {
  return (
    <View style={actionArea}>
      <TouchableOpacity
        onPress={() => {
          fn('Home')
        }}
        style={flexTouchableArea}
      >
        <View style={firstButton}>
          <Text
            style={firstText}
          >profile</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          fn('CharOption')
        }}
        style={flexTouchableArea}
      >
        <View style={secondButton}>
          <Text
            style={secondText}
          >encyclopedia</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          fn('LobbyStack')
        }}
        style={flexTouchableArea}
      >
        <View style={thirdButton}>
          <Text
            style={thirdText}
          >lobby</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
