import React, {Component} from 'react'
import {Modal, Text, TextInput, TouchableHighlight, View} from 'react-native'
import { connect } from 'react-redux'

import Input from '../Input'
import ButtonComp from '../Button'

import SetValCreateInput from '../../actions/SetValCreateInput'
import setRoom from '../../actions/setRoom'

class ModalComp extends Component {

  constructor(props) {
    super(props)
  }

  render () {
    const {
    valCreateInput,
    SetValCreateInput,
    setRoom,
    currentUser,
    data: { 
      modalVisible, 
      msgTitle, 
      msgSuccess, 
      msgFailed,  
      actionModalStatus,
      changeModalVisible,
      fn: {
        fnSuccess,
        fnFailed
      }
    }} = this.props


    const {
      BoxButtonRegister,
      buttonTextRegisterStyle
    } = styles

  return (
    <View>
      <Modal 
        animationType="slide"
        transparent={false}
        visible={modalVisible}>
        <Text>
          { JSON.stringify(this.props) }
          { JSON.stringify(valCreateInput) }
        </Text>
        <Input
          data={
            {
              placeholder:'Room name',
              fn: (e) => SetValCreateInput(e),
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
            }
          }
        />
        <ButtonComp
          style={BoxButtonRegister}
          styleText={buttonTextRegisterStyle}
          fn={() => {
            if (valCreateInput.length === 0) {
              return alert('You need to fill your room name')
            } else {
              setRoom(currentUser, valCreateInput)
              changeModalVisible()
            }
          }}
          title="Create Room"/>
      </Modal>
    </View>
  )
  }
}


const styles = {
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
  }
}

const setStateToProps = (state) => {
  return ({
    valCreateInput: state.valCreateInput.valCreateInput,
    actionModalStatus: state.actionModalStatus.actionModalStatus,
    currentUser: state.currentUser.currentUser
  })
}

const setDispatchToProps = (dispatch) => {
  return({
    SetValCreateInput: (val) => dispatch(SetValCreateInput(val)),
    setRoom: (valUser, valName) => dispatch(setRoom(valUser, valName))
  })
}

export default connect(setStateToProps,setDispatchToProps)(ModalComp)
