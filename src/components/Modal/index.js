import React, {Component} from 'react'
import {Modal, Text, TextInput, TouchableHighlight, View} from 'react-native'
import { connect } from 'react-redux'

import Alert from '../Alert'
import Input from '../Input'
import ButtonComp from '../Button'

import SetValCreateInput from '../../actions/SetValCreateInput'


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

const {
  BoxButtonRegister,
  buttonTextRegisterStyle
} = styles

const ModalComp = ({data: { 
  modalVisible, 
  msgTitle, 
  msgSuccess, 
  msgFailed, 
  valCreateInput, 
  SetValCreateInput, 
  actionModalStatus,
  changeModalVisible,
  fnSuccess, 
  fnFailed }}) => {

  return (
    <View>
      <Modal 
        animationType="slide"
        transparent={false}
        visible={modalVisible}>
        {
          actionModalStatus === 'success' &&
            Alert(msgTitle, msgSuccess, [
              {text: 'OK', onPress: () => fnSuccess()},
            ])
        }
        {
          actionModalStatus === 'failed' &&
            Alert(msgTitle, msgFailed, [
              {text: 'OK', onPress: () => fnFailed()},
            ])
        }
        <Input
          data={
            {
              placeholder:'Room name',
              fn: () => SetValCreateInput(valCreateInput),
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
            changeModalVisible()
          }}
          title="Create Room"/>
      </Modal>
    </View>
  )
}

const setStateToProps = (state) => {
  return ({
    valCreateInput: state.valCreateInput.valCreateInput,
    actionModalStatus: state.actionModalStatus.actionModalStatus,
  })
}

const setDispatchToProps = (dispatch) => {
  return({
    SetValCreateInput: (val) => dispatch(SetValCreateInput(val))
  })
}

export default connect(setStateToProps,setDispatchToProps)(ModalComp)
