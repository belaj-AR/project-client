import React from 'react'
import {TouchableOpacity, View, Text} from 'react-native'

const ButtonComp = ({fn, title, style, styleText}) => {

  return (
    <TouchableOpacity
      style={{
        padding: 5
      }}
      onPress={() => fn()}
    >
      <View
        style={style}
        >
        <Text
          style={styleText}
        >{ title }</Text>
      </View>
    </TouchableOpacity>
  )

}

export default ButtonComp
