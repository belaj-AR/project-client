import React, {Component} from 'react'
import {View, Text} from 'react-native'
import { connect } from 'react-redux'

import Input from '../components/Input'
import ButtonComp from '../components/Button'

import setStateLogin from '../actions/setStateLogin'
import actionLogin from '../actions/login'

class Login extends Component {

  componentDidMount = () => {}

  changeValue = (key, val) => {
    let dataUser = {
      [key] : val
    }

    this.props.setStateLogin(dataUser)
  }

  actionLogin = () => {
    let dataUser = {
      email: this.props.email,
      password: this.props.password
    }

    this.props.actionLogin(dataUser)
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
      buttonTextRegisterStyle
    } = styles

    const dataInput = [{
      placeholder:'Your Email',
      fn: (e) => this.changeValue('email', e),
      secureMode: false,
      style: {
        fontSize: 20,
        letterSpacing: 1,
        color: '#6E6E6D',
        marginTop: 10,
        padding: 8,
        height: 50,
        borderColor: 'grey',
        borderRadius: 10
      }
    },{
      placeholder:'Password',
      fn: (e) => this.changeValue('password', e),
      secureMode: true,
      style: {
        fontSize: 20,
        letterSpacing: 5,
        color: '#6E6E6D',
        marginTop: 10,
        padding: 8,
        height: 50,
        borderColor: 'grey',
        borderRadius: 10
      }
    }]

    return (
      <View style={containerStyle}>
        <View style={paddingOuter}>
        </View>
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
          <View style={paddingOuter}>
        </View>
      </View>
    )
  }

}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  paddingOuter: {
    flex:0.1
  },
  textContentPage: {
    fontSize: 30,
    fontWeight: '500',
    color: '#BC6A0C'
  },
  boxContent: {
    flex:1,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  boxContentTitle: {
    alignItems: 'center'
  },
  BoxButtonLogin: {
    elevation: 1,
    marginTop: 50,
    borderRadius: 7,
    backgroundColor: '#F4D34E',
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BoxButtonRegister: {
    elevation: 1,
    marginTop: 5,
    borderRadius: 7,
    backgroundColor: '#F4D34E',
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextRegisterStyle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#BC6A0C'
  },
  buttonTextLoginStyle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#BC6A0C'
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
