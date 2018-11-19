import React, {Component} from 'react'
import {Modal, Text, TextInput, TouchableHighlight, View} from 'react-native'
import { connect } from 'react-redux'

import Input from '../Input'
import ButtonComp from '../Button'

import SetValCreateInput from '../../actions/SetValCreateInput'
import setRoom from '../../actions/setRoom'

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#72A2C0',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  paddingOuter: {
    flex:0.1,
  },
  paddingInner: {
    flex:0.03,
  },
  contentArea: {
    flex: 1,
    paddingTop: 20
  },
  titleModal: {
    color: '#192E5B',
    fontSize: 21,
    marginBottom: 20,
    fontWeight: '800'
  },
  BoxButtonRegister: {
    padding: 20,
    elevation: 2,
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 7,
    backgroundColor: '#192E5B',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextRegisterStyle: {
    padding: 7,
    fontSize: 15,
    fontWeight: '500',
    color: '#BCDAFB'
  }
}

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
      containerStyle,
      paddingOuter,
      BoxButtonRegister,
      paddingInner,
      contentArea,
      titleModal,
      buttonTextRegisterStyle
    } = styles

  return (
    <View>
      <Modal 
        animationType="slide"
        transparent={false}
        visible={modalVisible}>
        <View style={containerStyle}>
          <View style={paddingOuter}>
          </View>
            <View style={paddingInner}>
            </View>
              <View style={contentArea}>
                <Text style={titleModal}>
                  Create Room 
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
              </View>
            <View style={paddingInner}>
            </View>
          <View style={paddingOuter}>
          </View>
        </View>
      </Modal>
    </View>
  )
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
