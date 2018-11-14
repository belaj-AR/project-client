import React, { Component } from 'react'
import {View, Text} from 'react-native'

import Input from '../components/Input'

class Register extends Component {
  render() {

    const dataInput = [ {placeholder:'Enter First Name', fn: (e) => this.changeValue('firstName', e)}, 
                        {placeholder:'Enter Last Name', fn: (e) => this.changeValue('password', e)},
                        {placeholder:'Enter Last Name', fn: (e) => this.changeValue('password', e)}]

    return (
      <View>

      </View>
    )
  }
}



export default Register