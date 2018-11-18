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

const { ngrokTunnel } = config

class HomePage extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount = async () => {

    let { getCurrentUser } = this.props

    let token = await AsyncStorage.getItem('token')
  
    getCurrentUser(token)
  }

  wow = async (token) => {
    
    alert(token)

    
  }
  

  async logoutUser () {
    let { logout } = this.props

    logout()
    await AsyncStorage.removeItem('token')
    this.props.setToken(null)
    this.props.navigation.navigate('Login')
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
            <View style={headerProfile}>
                <Text>
                  Number
                </Text>
            </View>
            <View style={contentProfile}>
              <View style={{
                borderRadius: 10,
                padding: 13,
                alignSelf: 'stretch',
                borderColor: 'red',
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
              <View style={{flex: .8, alignSelf: 'stretch'}}>
                <View style={{
                  flex: 1,
                  borderWidth: 0.2,
                  borderRadius: 10,
                  marginBottom: 20,
                  marginTop: 20,
                }}>
                </View>
              </View>
              <View style={{flex: .1}}>
                <ButtonComp
                  style={BoxButtonHistory}
                  styleText={buttonTextHistoryStyle}
                  fn={() => {}}
                  title="History Battle"/>
              </View>
              <View style={{flex: .1}}>
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
    flex: 1
  },
  headerProfile: {
    flex: .08,
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  contentProfile: {
    flex: .9,
    padding: 20,
    marginTop: 20,
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
