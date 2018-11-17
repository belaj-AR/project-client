import React, { Component } from 'react'
import {View, Text} from 'react-native'

import Config from '../../config';
var ArenaGame = require('../../js/ArenaGame');

var sharedProps = {
  apiKey: Config.API_KEY_VIRO,
}

import {
  ViroARSceneNavigator,
} from 'react-viro';

class Game extends Component {

  constructor(props) {
    super(props)

    this.state = {
      sharedProps : sharedProps,
      initAr: false
    }

  }

  myNavigation = () => {
    return this.props.navigation.navigate("LoadingPreGame")
  }

  render(){
    
    if(this.state.initAr){
      return (
        <ViroARSceneNavigator  apiKey="BE16B1BD-2F4A-476E-951C-E0F585666BAB"
          initialScene={{scene: ArenaGame}} customNavigation={this.myNavigation}/> 
      );
    } else {
      return (
        <View>
          <Text>{JSON.stringify(this.props.navigation.navigate)}</Text>
        </View>
      )
    }
   
  }

}

export default Game