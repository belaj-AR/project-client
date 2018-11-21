import React, {Component} from 'react'
import {Modal, Text, ScrollView, Image, FlatList, View, AsyncStorage} from 'react-native'

const style = {
  listBox: {
    elevation: 2,
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    height: 110,
    justifyContent: 'center',
  },
  listContentBox: {
    flex:.3,
    marginRight: 10,
    justifyContent: 'center'
  },
  userAvatarWinner: {
    borderWidth: 3,
    borderColor: '#E5B633',
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  userAvatarLosser: {
    borderWidth: 3,
    borderColor: '#192E5B',
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  winBox: {
    backgroundColor:'#E5B633',
    padding: 10,
    height: 90,
    borderRadius :10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  winTextBox: {
    fontSize: 26,
    color: 'white',
    fontWeight: '700'
  },
  loseBox: {
    backgroundColor:'#192E5B',
    padding: 10,
    height: 90,
    borderRadius :10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loseTextBox: {
    fontSize: 26,
    color: 'white',
    fontWeight: '700'
  },
  userInfoBox: {
    flex:.7
  },
  userInfoBoxTop: {
    flex: .8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  areaWinner: {
    flex: .4
  },
  areaVS: {
    flex: .2
  },
  textVS: {
    fontSize: 18,
    fontWeight: '600'
  },
  areaLosser: {
    flex: .4,
    alignItems: 'flex-end'
  },
  userInfoBoxBottom: {
    flex: .2,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

let {
  listBox,
  listContentBox,
  userAvatarWinner,
  userAvatarLosser,
  winBox,
  winTextBox,
  loseBox,
  loseTextBox,
  userInfoBox,
  userInfoBoxTop,
  areaWinner,
  areaVS,
  textVS,
  areaLosser,
  userInfoBoxBottom
} = style

export default listHistoryCard = ({ data: { item, currentUser } }) => {
  return (
    <View style={listBox}>
      <View style={listContentBox}>
        {
          currentUser.id === item.winner._id ?
            <View style={winBox}>
              <Text style={winTextBox}>
                WIN
              </Text>
            </View>
          :
            <View style={loseBox}>
              <Text style={loseTextBox}>
                LOSE
              </Text>
            </View>
        }
      </View>
      <View style={userInfoBox}>
        <View style={userInfoBoxTop}>
          <View style={areaWinner}>
            <Image style={userAvatarWinner} source={{uri: item.winner.avatar}}/>
            <Text>
              { item.winner.fname }
            </Text>
          </View>
          <View style={areaVS}>
            <Text
              style={textVS}
            >
              VS
            </Text>
          </View>
          <View style={areaLosser}>
            <Image style={userAvatarLosser} source={{uri: item.loser.avatar}}/>
            <Text>
              { item.loser.fname }
            </Text>
          </View>
        </View>
        <View style={userInfoBoxBottom}>
          <Text>
            { new Date(item.createdAt).getFullYear() } - { new Date(item.createdAt).getMonth() + 1 } - { new Date(item.createdAt).getDate() }
          </Text>
        </View>
      </View>
    </View>
  )
}

