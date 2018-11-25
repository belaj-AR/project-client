import React, {Component} from 'react'
import {Modal, Text, FlatList, View, AsyncStorage} from 'react-native'
import { connect } from 'react-redux'

import ButtonComp from '../Button'
import ListHistoryCard from './Components/listHistoryCard'

import getMatches from '../../actions/getMatch'

class ModalHistory extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = async () => {

    let { getMatches } = this.props
    let token = await AsyncStorage.getItem('token')

    getMatches(token)    
  }
  
  render () {

    let {
      containerStyle,
      boxButtonCloseModal,
      boxButtonTextCloseModal,
      contentArea,
    } = style

    let {
      data: {
      showModalHistory,
      closeModalFn
      },
      currentUser,
      matches
    } = this.props

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={showModalHistory}
      >
        <View style={containerStyle}>
          <View style={contentArea}>
            <View style={{
              flex:.1,
              marginBottom: 20
            }}>
              <View>
                <Text style={{
                  color: '#E5B633',
                  fontWeight: '600',
                  fontSize: 24
                }}>
                  Battle History
                </Text>
              </View>
            </View>
            <View style={{
              flex:.8,
              justifyContent: 'center'
            }}>
              {
                matches &&
                  <FlatList
                    data={matches}
                    renderItem={({item}) => (
                      <ListHistoryCard data={{ item, currentUser }} />
                    )}
                  />
              }
            </View>
            <View style={{
              flex:.1,
              marginTop: 20
            }}>
              <ButtonComp
                style={boxButtonCloseModal}
                styleText={boxButtonTextCloseModal}
                fn={() => closeModalFn()}
                title="back"/>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

let style = {
  containerStyle: {
    flex: 1,
    padding: 20,
    backgroundColor: '#72A2C0',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  boxButtonCloseModal: {
    marginTop: 15,
    borderRadius: 7,
    alignSelf:'stretch',
    backgroundColor: '#E5B633',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
    boxButtonTextCloseModal: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff'
  },
  contentArea: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
}

const setStateToProps = (state) => {
  return ({
    matches: state.matches.matches,
    currentUser: state.currentUser.currentUser
  })
}

const setDispatchToProps = (dispatch) => {
  return({
    getMatches: (token) => dispatch(getMatches(token))
  })
}

export default connect(setStateToProps,setDispatchToProps)(ModalHistory)
