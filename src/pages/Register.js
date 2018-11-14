import React, { Component } from 'react'
import {View, Text} from 'react-native'
import { connect } from 'react-redux'

import setStateRegister from '../actions/setStateRegister'
import actionRegister from '../actions/register'

import Input from '../components/Input'
import ButtonComp from '../components/Button'

class Register extends Component {

  changeValue = (key, val) => {
    let dataUser = {
      [key] : val
    }

    this.props.setStateRegister(dataUser)
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

    const { containerStyle } = styles

    const dataInput = [ {placeholder:'Enter First Name', fn: (e) => this.changeValue('firstName', e)}, 
                        {placeholder:'Enter Last Name', fn: (e) => this.changeValue('lastName', e)},
                        {placeholder:'Enter Email', fn: (e) => this.changeValue('email', e)},
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

        <ButtonComp fn={() => this.actionRegister()} title="REGISTER"/>       
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