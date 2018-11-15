import React, { Component } from 'react'
import  {View,Text, Image} from 'react-native'

import ButtonComp from '../components/Button'

class LoadingPreGame extends Component {

  playGame = () => {
    alert('masuk')
  }

  render(){

     const { containerStyle,
             cardContainer,
             userStyle,
             userAvatar,
             BoxButtonPlayGame,
             buttonTextPlayGameStyle} = styles

     const dataUser = [
                       {name: 'Harles Bayu Agggara', avatar:'https://banner2.kisspng.com/20180410/bbw/kisspng-avatar-user-medicine-surgery-patient-avatar-5acc9f7a7cb983.0104600115233596105109.jpg', win: 10, lose: 3, heroID: 'abcde'},
                       {name: 'Giri Anggara', avatar:'https://banner2.kisspng.com/20180410/bbw/kisspng-avatar-user-medicine-surgery-patient-avatar-5acc9f7a7cb983.0104600115233596105109.jpg', win: 10, lose: 4, heroID: 'abcde'},
                      ]  

    return (
      <View style={containerStyle}>

        {
          dataUser.map((user, idx) => 
            <View key={idx} style={cardContainer}>
              <View style={userStyle}>
                <View style={{marginRight:5}}>
                  <Image style={userAvatar} source={{uri: user.avatar}}/>
                </View>

                <View>
                  <Text>{user.name}</Text>
                  <Text>{'WIN  : ' + user.win}</Text>
                  <Text>{'LOSE : ' + user.lose}</Text>
                </View>
              </View>
            </View>
          )
        }

        <View style={cardContainer}>
          <ButtonComp 
            style={BoxButtonPlayGame} 
            styleText={buttonTextPlayGameStyle} 
            fn={() => this.playGame()} 
            title='Play Game'/>
        </View>
        
      </View>
    )
  }

}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#72A2C0',
    justifyContent: "center",
  },
  cardContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  userStyle: {
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "#ddd",
    position: "relative",
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#1D65A6'
  },
  userAvatar: {
    width: 70,
    height: 70
  },
  BoxButtonPlayGame: {
    elevation: 2,
    marginTop: 20,
    borderRadius: 7,
    backgroundColor: '#192E5B',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextPlayGameStyle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#BCDAFB'
  }
}

export default LoadingPreGame