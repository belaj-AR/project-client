import React, { Component } from 'react'
import {
  AsyncStorage,
  View,
  Image,
  Animated,
  Easing,
  Dimensions
} from 'react-native';

import ButtonComp from '../../components/Button'

export default class AuthProcess extends Component {
  constructor(props) {
    super(props);

    this.animatedValue = new Animated.Value(0)
  }

  tokenChecker = async () => {
    const userToken = await AsyncStorage.getItem('token');

    this.props.navigation.navigate(userToken ? 'App' : 'Login');
  };

  animate () {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear
      }
    ).start(() => this.animate())
  }

  componentDidMount () {
    this.animate()
  }

  render() {

    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    })

    const {
      boxButtonJoinRoom,
      buttonTextFullJoinRoomStyle
    } = style

    return (
      <View
        style={{
          flex:1,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff'
        }}
      >
        <View style={{
          flex: .92,
          justifyContent: 'center',
          alignItems: 'center'
        }}>

        <Image style={{
          width: 150,
          height: 100,
        }} source={require('../..//image/logoWhite.png')}/>
        <Animated.Text
          style={{
            opacity,
            marginTop: 20,
            fontSize: 20,
            fontWeight: '500',
            color: '#72A2C0'
            }}>
            Watch your surrounding
          </Animated.Text>
          <Animated.Text
          style={{
            opacity,
            fontSize: 20,
            fontWeight: '500',
            color: '#72A2C0'
            }}>
            before you play
          </Animated.Text>
        </View>
        <View style={{
          flex: .08
        }}>
          <ButtonComp
            style={boxButtonJoinRoom}
            styleText={buttonTextFullJoinRoomStyle}
            fn={() => this.tokenChecker()}
            title="Play game"/>
        </View>
      </View>
    );
  }
}

const style = {
  boxButtonJoinRoom: {
    width: Dimensions.get('window').width * 0.78,
    marginTop: 10,
    padding: 5,
    borderRadius: 7,
    backgroundColor: '#E5B633',
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextFullJoinRoomStyle: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white'
  }
}
