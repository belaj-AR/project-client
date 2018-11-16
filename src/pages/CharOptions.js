import React, { Component } from 'react'
import {View, Text, Image, ScrollView} from 'react-native'
import {connect} from 'react-redux'

import addItem from '../actions/addItem'
import ButtonComp from '../components/Button'

class CharOptions extends Component {

  characterSelected = (hero) => {
    this.props.navigation.navigate('Loading Before Game', { hero })
  }

  componentDidMount = () => {
    // this.props.addItem()
  }

  render() {

    const { heroes } = this.props

    const { conatinerMain,
            containerStyle, 
            cardSection, 
            boxImage,
            imageStyle,
            boxContent,
            charTextStyle,
            boxButton,
            buttonStyle,
            buttonText,
            elementWater } = styles

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
      <View style={conatinerMain}>
        <ScrollView>
        {
          heroes.map((char,idx) => 
            <View style={elementWater}>
              <View style={cardSection}>
                <View style={boxImage}>
                  {/* <Image style={imageStyle} source={{uri: char.image}}/> */}
                </View>
                
                <View style={boxContent}>
                  <Text style={charTextStyle}>{char.name}</Text>
                  <Text style={charTextStyle}>Element: {char.element}</Text>
                </View>
              </View>
            
              <View style={boxButton}>
                <ButtonComp 
                  fn={() => this.characterSelected(char)} 
                  title='SELECT CHARACTER'
                  style={buttonStyle}
                  styleText={buttonText}/>
              </View> 
            </View> 
          )
        }
        </ScrollView>
        
      </View>
    )
  }

}

const styles = {
  conatinerMain: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#72A2C0',
  },
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  },
  cardSection: {
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "#ddd",
    position: "relative",
    paddingTop: 10,
    paddingBottom: 10
  },
  boxImage: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    width: 80,
    height:80
  },
  boxContent: {},
  charTextStyle: {
    color: "#F0F2FC"
  },
  boxButton: {  
    alignItems: "center",
    marginBottom: 10
  },
  buttonStyle: {
    elevation: 2,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 7,
    height: 40,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: "#fff",
    fontSize: 18
  },
  elementWater: {
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: "#00A8C2",
    borderColor: "#ddd",
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
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
