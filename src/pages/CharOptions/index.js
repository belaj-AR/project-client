import React, { Component } from 'react'
import {View, Text, Image, ScrollView} from 'react-native'
import {connect} from 'react-redux'

import addItem from '../../actions/addItem'
import ButtonComp from '../../components/Button'
import ActionArea from '../../components/ActionArea'

class CharOptions extends Component {

  characterSelected = (hero) => {
    this.props.navigation.navigate('Loading Before Game', { hero })
  }

  render() {

    const { 
      containerStyle,
      paddingOuter,
      paddingInner,
      contentArea,
      contentProfile,
      cardList,
      headerProfile,
      BoxButtonHistory,
      buttonTextHistoryStyle
     } = styles

    const dataChar = [{image: 'https://d1a9v60rjx2a4v.cloudfront.net/2016/12/30/11_02_30_448_Fantasy_Monster_Dragon_01_1.jpg', 
                      name: 'DRAGON', element: 'FIRE', 
                      styles :{ borderWidth: 1,
                        borderRadius: 2,
                        borderColor: "#ddd",
                        backgroundColor: "#ED7C02",
                        elevation: 1,
                        marginLeft: 5,
                        marginRight: 5,
                        marginTop: 10}},
                      {image: 'https://d1a9v60rjx2a4v.cloudfront.net/2016/12/30/11_02_30_448_Fantasy_Monster_Dragon_01_1.jpg', 
                      name: 'DRAGON', element: 'WATER',
                      styles :{ borderWidth: 1,
                        borderRadius: 2,
                        backgroundColor: "#00A8C2",
                        borderColor: "#ddd",
                        elevation: 1,
                        marginLeft: 5,
                        marginRight: 5,
                        marginTop: 10}}]  

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
              <View style={cardList}>

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
    marginTop:30,
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
    marginTop: 20,
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  cardList: {
    alignSelf: 'stretch',
    elevation: 2,
    padding: 8,
    borderRadius: 10,
    height: 80,
    backgroundColor: 'white',
    borderColor: 'red'
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
    heroes: state.itemReducer.items
  })
}

const setDispatchToProps = (dispatch) => {
  return ({
    addItem: () => dispatch(addItem())
  })
}

export default connect(setStateToProps, setDispatchToProps)(CharOptions)
