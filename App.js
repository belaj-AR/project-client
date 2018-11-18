import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './src/store'
import {
  AsyncStorage,
  View,
  StyleSheet,
} from 'react-native';

import { createNavigationContainer , createTabNavigator ,createStackNavigator, SwitchNavigator } from 'react-navigation';


import Config from './config';

import Login from './src/pages/Login'
import Register from './src/pages/Register'
import Lobby from './src/pages/Lobby'
import CharOption from './src/pages/CharOptions'
import Room from './src/pages/RoomGame'
// import Barrack from './src/pages/Barrack';
import Game from './src/pages/Game'
import Home from './src/pages/Home'

class AuthProcess extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('token');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Login');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
      </View>
    );
  }
}

const AppStack = createStackNavigator({
  Home: Home,
  CharOption: CharOption,
  Lobby: Lobby,
  Room: Room,
  Game: Game,
}, {
  initialRouteName: 'Home'
})

const LoginStack = createStackNavigator({
  Login: Login,
  Register: Register
})

const RouteAuth = createNavigationContainer(SwitchNavigator({
  AuthProcess: AuthProcess,
  App: AppStack,
  Login: LoginStack
}, {
  initialRouteName: 'AuthProcess'
}))

// const MyApp = createBottomTabNavigator ({
//   "Login": {
//     screen: Login
//   },
//   "Register": {
//     screen: Register
//   },
//   "Lobby": {
//     screen: Lobby
//   },
//   "Select Monster": {
//     screen: CharOption
//   },
//   "Loading Before Game": {
//     screen: LoadingPreGame
//   },
//   "Game": {
//     screen: Game
//   },
//   "Home": {
//     screen: Home
//   }
// },
//  {
//    initialRouteName: "Home"
//  }
// )

/*
 TODO: Insert your API key below
 */
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
