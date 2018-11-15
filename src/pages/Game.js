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

  constructor() {
    super()

    this.state = {
      sharedProps : sharedProps,
      viroAppProps: false
    }

    this._getARNavigator = this._getARNavigator.bind();
  }

  render(){
    let { viroAppProps } = this.state
    return this._getARNavigator(viroAppProps);
  }

  _getARNavigator(viroAppProps) {
    return (
      <ViroARSceneNavigator  apiKey="BE16B1BD-2F4A-476E-951C-E0F585666BAB"
        initialScene={{scene: ArenaGame}} viroAppProps={viroAppProps}/> 
    );
  }

}

export default Game