import React, {Component} from 'react'
import {View, Text, Alert, ScrollView} from 'react-native'
import { connect } from 'react-redux'

import Input from '../../components/Input'
import ButtonComp from '../../components/Button'

import setStateLogin from '../../actions/setStateLogin'
import actionLogin from '../../actions/login'

import config from '../../../config'

const { firebaseAuth, ngrokTunnel } = config

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      errorMessage: 'console'
    }
  }

  componentDidMount = () => {}

  changeValue = (key, val) => {
    let dataUser = {
      [key] : val
    }

    this.props.setStateLogin(dataUser)
  }

  actionLogin = () => {

    let { email, password } = this.props

    firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        this.setState({errorMessage: JSON.stringify(user.uid) })
      })
      .catch(({ code }) => {
        if (code === 'auth/user-not-found') {
          Alert.alert(
            'Notification',
            `Seems you not registered to our apps`,
            [
              {text: 'Ok', onPress: () => console.log('OK Pressed')},
              {text: 'Register', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        } else if (code === 'auth/invalid-email') {
          Alert.alert(
            'Notification',
            `Opps.. seems your email is incorect`,
            [
              {text: 'Ok', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        } else if (code === 'auth/wrong-password') {
          Alert.alert(
            'Notification',
            `Opps.. seems your email or password is incorect`,
            [
              {text: 'Ok', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        }
        this.setState({errorMessage: JSON.stringify(code) })
      });

    // this.props.actionLogin(dataUser)
  }

  render(){

    const { 
      containerStyle,
      paddingOuter,
      textContentPage,
      boxContentTitle,
      boxContent,
      BoxButtonLogin,
      BoxButtonRegister,
      buttonTextLoginStyle,
      buttonTextRegisterStyle,
      paddingOuterContent
    } = styles

    const dataInput = [{
      placeholder:'Your Email',
      fn: (e) => this.changeValue('email', e),
      secureMode: false,
      style: {
        fontSize: 17,
        letterSpacing: 1,
        color: '#192E5B',
        marginTop: 10,
        padding: 8,
        height: 40,
        borderColor: 'grey',
        borderRadius: 7,
        backgroundColor: '#FFF'
      }
    },{
      placeholder:'Password',
      fn: (e) => this.changeValue('password', e),
      secureMode: true,
      style: {
        fontSize: 17,
        letterSpacing: 5,
        color: '#192E5B',
        marginTop: 10,
        padding: 8,
        height: 40,
        borderColor: 'grey',
        borderRadius: 7,
        backgroundColor: '#FFF'
      }
    }]

    return (
      <View style={containerStyle}>
        <View style={paddingOuter}>
        </View>
        <View style={{
          flex: 1
        }}>
          <View style={paddingOuterContent}>
          </View>
          <View
            style={{
              flex: 1
            }}
          >
            <View style={boxContent}>  
              <View
                style={boxContentTitle}
              >
                <Text
                  style={textContentPage}
                >Login</Text>
              </View>
              <View>
                { 
                  dataInput.map((data,idx) => 
                    <Input key={idx} data={data}/>
                  ) 
                }
                <ButtonComp
                  style={BoxButtonLogin}
                  styleText={buttonTextLoginStyle}
                  fn={() => this.actionLogin()}
                  title="Login"/>
                <ButtonComp
                  style={BoxButtonRegister}
                  styleText={buttonTextRegisterStyle}
                  fn={() => this.actionLogin()}
                  title="Register"/>
              </View>
            </View>
          </View>
          <View style={paddingOuterContent}>
            <ScrollView>
              <Text>
                { this.state.errorMessage }
              </Text>
            </ScrollView>
          </View>
        </View>
        <View style={paddingOuter}>
        </View>
      </View>
    )
  }

}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#72A2C0',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  paddingOuter: {
    flex:0.05,
  },
  paddingOuterContent: {
    flex:0.37,
  },
  textContentPage: {
    fontSize: 40,
    fontWeight: '700',
    color: '#BCDAFB'
  },
  boxContent: {
    flex:1,
    elevation: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#1D65A6',
    padding: 20,
    borderRadius: 10
  },
  boxContentTitle: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1
  },
  BoxButtonLogin: {
    elevation: 2,
    marginTop: 40,
    borderRadius: 7,
    backgroundColor: '#192E5B',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BoxButtonRegister: {
    elevation: 2,
    marginTop: 5,
    borderRadius: 7,
    backgroundColor: '#192E5B',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextRegisterStyle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#BCDAFB'
  },
  buttonTextLoginStyle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#BCDAFB'
  }

}

const setStateToProps = (state) => {
  return ({
    email : state.FormInput.email,
    password : state.FormInput.password
  })
}

const setDispatchToProps = (dispatch) => {
  return({
    setStateLogin: (dataUser) => dispatch(setStateLogin(dataUser)),
    actionLogin: (dataUser) => dispatch(actionLogin(dataUser))
  })
}

export default connect(setStateToProps,setDispatchToProps)(Login)
