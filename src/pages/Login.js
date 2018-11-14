import React, {Component} from 'react'
import {View, Text} from 'react-native'
import { connect } from 'react-redux'

import Input from '../components/Input'

import setStateLogin from '../actions/setStateLogin'

class Login extends Component {

  componentDidMount = () => {}

  changeValue = (key, val) => {
    let dataUser = {
      [key] : val
    }

    this.props.setStateLogin(dataUser)
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
      </View>
    )
  }

}

const styles = {

  containerStyle: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5
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
    setStateLogin: (dataUser) => dispatch(setStateLogin(dataUser))
  })
}

export default connect(setStateToProps,setDispatchToProps)(Login)