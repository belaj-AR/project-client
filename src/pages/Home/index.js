import React, {Component} from 'react'
import axios from 'axios'
import {View, Text, Alert, ScrollView, TouchableOpacity, AsyncStorage, Image} from 'react-native'
import { connect } from 'react-redux'

import ActionArea from '../../components/ActionArea'
import ButtonComp from '../../components/Button'

import logout from '../../actions/logout'
import setToken from '../../actions/setToken'
import getCurrentUser from '../../actions/getCurrentUser'

import config from '../../../config'

import HistoryModal from '../../components/ModalHistory'

const { ngrokTunnel } = config

class HomePage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showModalHistory: false
    }
  }


  componentDidMount = async () => {
    let { getCurrentUser } = this.props
    let token = await AsyncStorage.getItem('token')
  
    getCurrentUser(token)
    BackHandler.addEventListener('hardwareBackPress', this.true)
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.true)
  }
  
  async logoutUser () {
    let { logout } = this.props

    logout()
    await AsyncStorage.removeItem('token')
    this.props.setToken(null)
    this.props.navigation.navigate('Login')
  }

  changeModalStatus () {
    
    this.setState({
      showModalHistory: !this.state.showModalHistory
    })
  }
  
  render() {
    
    const { token, logout, authProcess, currentUser } = this.props

    const {
      containerStyle,
      paddingOuter,
      paddingInner,
      contentArea,
      contentProfile,
      headerProfile,
      BoxButtonHistory,
      buttonTextHistoryStyle
    } = styles

    return (
      <View style={containerStyle}>
        <View style={paddingOuter}>
        </View>
        <View style={{
          flex: 1,
          flexDirection: 'column'
        }}>
          <View style={paddingInner}>
          </View>
          <View style={contentArea}>
            
            <View style={contentProfile}>
              <View style={{
                borderRadius: 10,
                padding: 13,
                alignSelf: 'stretch',
                backgroundColor: '#fff',
                flexDirection: 'row',
                borderWidth: 0.2
              }}>
                {
                  currentUser &&
                    <Image
                      style={{width: 80, height: 80, borderRadius: 10}}
                      source={{uri: currentUser.avatar}}
                    />
                }
                <View style={{
                  flex: 1,
                  width: 10,
                  marginLeft: 30,
                  justifyContent:'center'
                }}>
                  <Text style={{
                    fontSize: 25,
                    fontWeight: '500',
                    textAlign: 'left'
                  }}>
                    {
                      currentUser &&
                      currentUser.fname
                    }
                  </Text>
                  <Text style={{
                    fontSize: 15,
                    fontWeight: '300',
                    textAlign: 'left'
                  }}>
                    {
                      currentUser &&
                      currentUser.email
                    }
                  </Text>
                </View>
              </View>
              <View style={{flex: .7, alignSelf: 'stretch'}}>
                <View style={{
                  flex: 1,
                  borderWidth: 0.2,
                  borderRadius: 10,
                  marginBottom: 20,
                  marginTop: 20,
                  padding: 20,
                }}>
                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 17,
                    }}
                  >
                    Total games played: 
                    {
                      currentUser &&
                        this.props.currentUser.lose.length + this.props.currentUser.win.length
                    }
                  </Text>
                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 17,
                    }}
                  >
                    Win: 
                    {
                      currentUser &&
                        this.props.currentUser.win.length
                    }
                  </Text>
                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 17,
                    }}
                  >
                    Lose: 
                    {
                      currentUser &&
                        this.props.currentUser.lose.length
                    }
                  </Text>
                </View>
              </View>
              <View style={{flex: .1}}>
                <ButtonComp
                  style={BoxButtonHistory}
                  styleText={buttonTextHistoryStyle}
                  fn={() => this.changeModalStatus()}
                  title="History Battle"/>
              </View>
              <View style={{flex: .1, marginTop: 15}}>
                <ButtonComp
                  style={BoxButtonHistory}
                  styleText={buttonTextHistoryStyle}
                  fn={() => {this.logoutUser()}}
                  title="log out"/>
              </View>
            </View>
            <ActionArea fn={this.props.navigation.navigate}/>
          </View>
          <View style={paddingInner}>
          </View>
        </View>
        <View style={paddingOuter}>
      </View>
      <HistoryModal
        data={{
          showModalHistory: this.state.showModalHistory,
          closeModalFn: () => this.changeModalStatus()
        }}
      />
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
    flex:0.1,
  },
  paddingInner: {
    flex:0.03,
  },
  contentArea: {
    flex: 1,
  },
  headerProfile: {
    flex: .08,
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  contentProfile: {
    flex: .9,
    padding: 20,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionArea: {
    marginTop: 20,
    flex: .8,
    borderRadius: 10,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  BoxButtonHistory: {
    marginTop: 15,
    borderRadius: 7,
    width: 200,
    backgroundColor: '#E5B633',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center'
  },
    buttonTextHistoryStyle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff'
  }
  
}

const setStateToProps = (state) => {
  return ({
    token: state.token.token,
    currentUser: state.currentUser.currentUser
  })
}

const setDispatchToProps = (dispatch) => {
  return({
    logout: () => dispatch(logout()),
    setToken: (token) => dispatch(setToken(token)),
    getCurrentUser: (token) => dispatch(getCurrentUser(token))
  })
}

export default connect(setStateToProps,setDispatchToProps)(HomePage)
