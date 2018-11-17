import React, {Component} from 'react'
import {View, Text, Alert, ScrollView, TouchableOpacity, AsyncStorage} from 'react-native'
import { connect } from 'react-redux'

import ActionArea from '../../components/ActionArea'
import ButtonComp from '../../components/Button'

import logout from '../../actions/logout'
import setToken from '../../actions/setToken'

class HomePage extends Component {

  constructor(props) {
    super(props)
  }

  async logoutUser () {
    let { logout } = this.props

    logout()
    await AsyncStorage.removeItem('token')
    this.props.navigation.navigate('Login')
  }
  
  render() {
    
    const { token, logout, authProcess } = this.props

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
                <View style={{width:80, height:80, borderRadius: 10,backgroundColor: 'black'}}>
                </View>
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
                    Gusti
                  </Text>
                  <Text style={{
                    fontSize: 15,
                    fontWeight: '300',
                    textAlign: 'left'
                  }}>
                    gstandryeanb@gmail.com
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
                  <Text>
                    { token }
                  </Text>
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
    token: state.token.token
  })
}

const setDispatchToProps = (dispatch) => {
  return({
    logout: () => dispatch(logout()),
    setToken: (token) => dispatch(setToken(token))
  })
}

export default connect(setStateToProps,setDispatchToProps)(HomePage)
