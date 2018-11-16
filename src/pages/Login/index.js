import React, {Component} from 'react'
import {View, Text, Alert, ScrollView} from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'

import Input from '../../components/Input'
import ButtonComp from '../../components/Button'

import setStateLogin from '../../actions/setStateLogin'
import actionLogin from '../../actions/login'

import config from '../../../config'
import AlertCatcher from './src/alertCatcher'

const { firebaseAuth, ngrokTunnel } = config

class Login extends Component {

  changeValue = (key, val) => {
    let dataUser = {
      [key] : val
    }

    this.props.setStateLogin(dataUser)
  }

  actionLogin = () => {

    let { email, password } = this.props

    firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(({ user: { uid } }) => {

        return axios({
          url: `${ngrokTunnel}/users/login`,
          method: 'post',
          data: {
            email,
            uid
          }
        })
      })
      .then(({ data: { token } }) => {
        // save token to asycnStorage
        this.props.navigation.navigate('Home')
      })
      .catch(({ code }) => {
        return AlertCatcher(code)
      });
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
