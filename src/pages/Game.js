import React, { Component } from 'react'
import {View, Text} from 'react-native'
import { connect } from 'react-redux'

var ArenaGame = require('../../js/ArenaGame');

import {
  ViroARSceneNavigator,
} from 'react-viro';

class Game extends Component {

  constructor(props) {
    super(props)

    this.state = {
      // initAr: false,
      viroAppProps: { players: 
        [
          { name: 'Harles',
            status: false,
            monster: {
              name: 'Red Dragon',
              model: '',
              texture: [] }},
          {
            name: 'Superman',
            status: true,
            monster: {
              name: 'Blue Dragon',
              model: '',
              texture: [] }}
        ]
        }
      }

  }

  myNavigation = () => {
    return this.props.navigation.navigate("LoadingPreGame")
  }

  render(){
    
    // if(this.state.initAr){
      return (
        <ViroARSceneNavigator  apiKey="BE16B1BD-2F4A-476E-951C-E0F585666BAB"
          initialScene={{scene: ArenaGame}} myNavigation={() => this.myNavigation()} viroAppProps={this.state.viroAppProps}/> 
      );
    // } else {
    //   return (
    //     <View>
    //       <Text>BUAT TEST</Text>
    //     </View>
    //   )
    // }
   
  }

}

const setStateToProps = (state) => {
  return ({
    
  })
}

const setDispatchToProps = (dispatch) => {
  return ({

  })
}

export default connect(setStateToProps, setDispatchToProps)(Game)