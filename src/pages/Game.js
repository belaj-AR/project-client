import React, { Component } from 'react'
import {View, Text, AsyncStorage} from 'react-native'
import { connect } from 'react-redux'
import  axios from 'axios'
import config from '../../config'
const { ngrokTunnel } = config

var ArenaGame = require('../../js/ArenaGame');

import {
  ViroARSceneNavigator,
} from 'react-viro';

class Game extends Component {

  constructor(props) {
    super(props)

    this.state = {
      initAr: true,
      viroAppProps: 
      { 
        players: this.props.players,
        fn: () => this.props.navigation.navigate("Home")

      }
    }

  }

  componentDidMount = () => {
    // this.getToken()
  }

  getToken = async () => {
    let token = await AsyncStorage.getItem('token')

    let winner = ''
    let loser = ''

    if(this.props.players[0].status === true){
      winner = this.props.players[0].id
      loser = this.props.players[1].id
    } else {
      winner = this.props.players[1].id
      loser = this.props.players[0].id
    }

    axios({
      method: 'POST',
      url: `${ngrokTunnel}/matches`,
      headers: {
        token : token
      },
      data: {
        winner: winner,
        loser: loser
      }
    })
    .then((result) => {})
    .catch((err) => {});
  }

  navigateToHome = () => {
    return this.props.navigation.navigate("Home")
  }

  render(){
    
    if(this.state.initAr){
      return (
        <ViroARSceneNavigator  apiKey="BE16B1BD-2F4A-476E-951C-E0F585666BAB"
          initialScene={{scene: ArenaGame}} 
          viroAppProps={{fn: () => this.props.navigation.navigate("Home")}}/> 
      );
    } else {
      return (
        <View>
          <Text>{JSON.stringify(this.props.players)}</Text>
        </View>
      )
    }
   
  }

}

const setStateToProps = (state) => {
  return ({
    players: state.onGameData.onGameData
  })
}

const setDispatchToProps = (dispatch) => {
  return ({

  })
}

export default connect(setStateToProps, setDispatchToProps)(Game)

// viroAppProps={this.state.viroAppProps}