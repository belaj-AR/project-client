import React, { Component } from 'react'
import {View, Text, AsyncStorage} from 'react-native'
import { connect } from 'react-redux'
import   axios from 'axios'
import   config from '../../config'
const { ngrokTunnel, firebaseDB } = config

import resetGame from '../actions/resetGame'
import getCurrentUser from '../actions/getCurrentUser'
var ArenaGame = require('../../js/ArenaGame');

import {
  ViroARSceneNavigator,
} from 'react-viro';

class Game extends Component {

  constructor(props) {
    super(props)

    this.state = {
      initAr: true,
    }

  }

  // attack = (gameId, playersTargetNumber, dmg, remainingHealth) => {
  //   let newHealth = remainingHealth - dmg
  
  //   if (newHealth < 0) {
  //     newHealth = 0
  //   }

  //   firebaseDB.ref(`/OnGame/onGameList/` + gameId + '/' + playersTargetNumber + '/monster/health').set(newHealth)
  // }

  setTheWinner = async (playerWinner, playerLoser) => {
    let token = await AsyncStorage.getItem('token')

    axios({
      method: 'POST',
      url: `${ngrokTunnel}/matches`,
      headers: {
        token : token
      },
      data: {
        winner: playerWinner,
        loser: playerLoser
      }
    })
    .then((result) => {
      this.props.getCurrentUser(token)
    })
    .catch((err) => {});
  }

  resetData = () => {
    this.props.resetGame(this.props.players.roomId , this.props.players.gameId)
  }

  render(){
    return (
      <ViroARSceneNavigator  apiKey="BE16B1BD-2F4A-476E-951C-E0F585666BAB"
        initialScene={{scene: ArenaGame}} 
        viroAppProps={{ propsFromGame: {
                          players: this.props.players,
                          fn: () => this.props.navigation.navigate("Home"),
                          setTheWinner: (playerWinner, playerLoser) => this.setTheWinner(playerWinner, playerLoser),
                          resetData: () => this.resetData()
                      }}}/> 
    );
  }
}

const setStateToProps = (state) => {
  return ({
    players: state.onGameData.onGameData
  })
}

const setDispatchToProps = (dispatch) => {
  return ({
    resetGame: (currentRoomId, onGameKey) => dispatch(resetGame(currentRoomId, onGameKey)),
    getCurrentUser: (token) => dispatch(getCurrentUser(token))
  })
}

export default connect(setStateToProps, setDispatchToProps)(Game)

// fn: () => this.props.navigation.navigate("Home"),