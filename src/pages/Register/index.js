import React, { Component } from 'react'
import {View, Text, ScrollView} from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'

import setStateRegister from '../../actions/setStateRegister'
import actionRegister from '../../actions/register'

import Input from '../../components/Input'
import ButtonComp from '../../components/Button'
import validatorInput from './src/validatorInput'
import Alert from '../../components/Alert'

import config from '../../../config'

const { firebaseAuth, ngrokTunnel } = config

class Register extends Component {

  constructor(props) {

    super(props)

    this.state = {
      messageConsole: ''
    }
  }

  changeValue = (key, val) => {
    let dataUser = {
      [key] : val
    }
    this.props.setStateRegister(dataUser)
  }

  createAccount = () => {

    let { firstName, lastName, email, password } = this.props

    let objVal = {
      inputFname: firstName,
      inputLname: lastName,
      inputEmail: email,
      inputPassword: password
    }


    validatorInput(objVal)
      .then(data => {
        return firebaseAuth.createUserWithEmailAndPassword(
          String(email),
          String(password)
        )
      })
      .then(data => {
        return axios({
          url: `${ngrokTunnel}/users/register`,
          method: 'post',
          data: {
            fname: firstName,
            lname: lastName,
            email: email,
            uid: data.user.uid
          }
        })
      })
      .then(data => {
        this.setState({messageConsole: JSON.stringify(data) })
        Alert('Notification', 'Creating an account success!', [
          {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
        ])
      })
      .catch(err => {
        if (err.message) {
          Alert('Notification', `Creating an account failed! ${err.message}`, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ])
        } else {
          Alert('Notification', `Creating an account failed! ${err}`, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ])
        }
      })
  }

  actionRegister = () => {
    let dataUser = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      password: this.props.password
    }

    this.props.actionRegister(dataUser)
  }

  render() {

    const { 
      containerStyle,
      paddingOuter,
      boxContent,
      paddingOuterContent,
      boxContentTitle,
      textContentPage,
      BoxButtonRegister,
      buttonTextRegisterStyle
    } = styles

    const dataInput = [
      {
        placeholder:'Enter First Name',
        fn: (e) => this.changeValue('firstName', e),
        secureMode: false,
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
      }, {
        placeholder:'Enter Last Name',
        fn: (e) => this.changeValue('lastName', e),
        secureMode: false,
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
      },{
        placeholder:'Enter Email',
        fn: (e) => this.changeValue('email', e),
        secureMode: false,
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
      },{
        placeholder:'Enter Password',
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
      }
    ]

    return (
        <View style={containerStyle}>
          <View style={paddingOuter}>
          </View>
          <View style={{
            flex:1
          }}>
            <View style={paddingOuterContent}>
            </View>
              <View style={boxContent}>
                <View style={boxContentTitle}>
                  <Text
                    style={textContentPage}
                  >Register</Text>
                </View>

                <View>
                  { 
                    dataInput.map((data,idx) => 
                      <Input key={idx} data={data}/>
                    ) 
                  }
                </View>

                <ButtonComp
                  style={BoxButtonRegister}
                  styleText={buttonTextRegisterStyle}
                  fn={() => this.createAccount()}
                  title="Submit"/>
              </View>
            <View style={paddingOuterContent}>
              <ScrollView>
                <Text>
                  { this.state.messageConsole }
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
    flex:0.05
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
    flex: 2
  },
  paddingOuterContent: {
    flex:0.2
  },
  textContentPage: {
    fontSize: 40,
    fontWeight: '700',
    color: '#BCDAFB'
  },
  BoxButtonRegister: {
    elevation: 2,
    marginTop: 30,
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
  
}

const setStateToProps = (state) => {
  return ({
    firstName: state.FormInput.firstName,
    lastName: state.FormInput.lastName,
    email : state.FormInput.email,
    password : state.FormInput.password
  })
}

const setDispatchToProps = (dispatch) => {
  return({
    setStateRegister: (dataUser) => dispatch(setStateRegister(dataUser)),
    actionRegister: (dataUser) => dispatch(actionRegister(dataUser))
  })
}

export default connect(setStateToProps,setDispatchToProps)(Register)
