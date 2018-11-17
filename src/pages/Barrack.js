import React, { Component } from 'react';
import {View, Text} from 'react-native';

import Config from '../../config';
var BarrackScene = require('../../js/BarrackScene');

var sharedProps = {
  apiKey: Config.API_KEY_VIRO,
}

import {
  ViroARSceneNavigator,
} from 'react-viro';

class Barrack extends Component {

  constructor() {
    super()

    this.state = {
      sharedProps : sharedProps,
      viroAppProps: false
    }

    this._getARNavigator = this._getARNavigator.bind(this);
  }

  render() {
    let { viroAppProps } = this.state
    return this._getARNavigator(viroAppProps);
  }

  _getARNavigator(viroAppProps) {
    return (
      <ViroARSceneNavigator  apiKey="BE16B1BD-2F4A-476E-951C-E0F585666BAB"
        initialScene={{scene: BarrackScene}} viroAppProps={viroAppProps}/> 
    );
  }

}

export default Barrack;