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

    const { containerStyle } = styles

    const dataInput = [ {placeholder:'Enter Email', fn: (e) => this.changeValue('email', e)}, 
                        {placeholder:'Enter Password', fn: (e) => this.changeValue('password', e)}]

    return (
      <View style={containerStyle}>
        <View>
          <Text>LOGIN</Text>
        </View>

        <View>
          { 
            dataInput.map((data,idx) => 
              <Input key={idx} data={data}/>
            ) 
          }
        </View>

        <ButtonComp fn={() => this.actionLogin()} title="LOGIN"/>       
      </View>
    )
  }

}

const styles = {

  containerStyle: {
    flex: 1,
    backgroundColor: '#FFF'
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