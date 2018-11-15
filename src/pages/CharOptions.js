import React, { Component } from 'react'
import {View, Text, Image} from 'react-native'

import ButtonComp from '../components/Button'

class CharOptions extends Component {

  selectCharacter = (data) => {
    alert(data)
  }

  render() {

    const { conatinerMain,
            containerStyle, 
            cardSection, 
            boxImage,
            imageStyle,
            boxContent } = styles

    const dataChar = [{image: 'https://d1a9v60rjx2a4v.cloudfront.net/2016/12/30/11_02_30_448_Fantasy_Monster_Dragon_01_1.jpg', name: 'Dragon', element: 'fire'},
                      {image: 'https://d1a9v60rjx2a4v.cloudfront.net/2016/12/30/11_02_30_448_Fantasy_Monster_Dragon_01_1.jpg', name: 'Dragon', element: 'water'},
                      {image: 'https://d1a9v60rjx2a4v.cloudfront.net/2016/12/30/11_02_30_448_Fantasy_Monster_Dragon_01_1.jpg', name: 'Dragon', element: 'wind'}]  

    return (
      <View style={conatinerMain}>
        {
          dataChar.map((char,idx) => 
            <View style={containerStyle}>
              <View style={cardSection}>
                <View style={boxImage}>
                  <Image style={imageStyle} source={{uri: char.image}}/>
                </View>
                
                <View style={boxContent}>
                  <Text>{char.name}</Text>
                  <Text>Element: {char.element}</Text>
                </View>
              </View>
            
              <View>
                <ButtonComp fn={() => this.selectCharacter("datacharacter")} title='SELECT CHARACTER'/>
              </View> 
            </View> 
          )
        }
      </View>
    )
  }

}

const styles = {
  conatinerMain: {
    flex: 1,
    backgroundColor: "#FFF"
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
  boxContent: {
   
  }
}

export default CharOptions