import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './src/store'
import {
  AsyncStorage,
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Easing
} from 'react-native';

import { createNavigationContainer ,createStackNavigator, SwitchNavigator } from 'react-navigation';

import Config from './config';

import Login from './src/pages/Login'
import Register from './src/pages/Register'
import Lobby from './src/pages/Lobby'
import CharOption from './src/pages/CharOptions'
import Room from './src/pages/RoomGame'
import Game from './src/pages/Game'
import Home from './src/pages/Home'
import AuthProcess from './src/pages/authProcess'

const AppStack = createStackNavigator({
  Home: Home,
  CharOption: CharOption,
  Lobby: Lobby,
  Room: Room,
  Game: Game,
}, {
  initialRouteName: 'Home',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
})

const LoginStack = createStackNavigator({
  Login: Login,
  Register: Register
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
})

const RouteAuth = createNavigationContainer(SwitchNavigator({
  AuthProcess: AuthProcess,
  App: AppStack,
  Login: LoginStack
}, {
  initialRouteName: 'AuthProcess'
}))

var sharedProps = {
  apiKey: Config.API_KEY_VIRO,
}

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {}
  }

  render() {
    return (
      <Provider store={store} style={styles.Container}>
        <RouteAuth/>
      </Provider>
    )
  }

}

const styles = {
  Container: {
    backgroundColor: "#FFF"
  }
}

var localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "black",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 80,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});

module.exports = ViroSample
