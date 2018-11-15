import React from 'react'
import { View, TextInput } from 'react-native'

const Input = ({ data: { fn, placeholder, style, secureMode }}) => {

  return(
    <View>
      <TextInput onChangeText={(e) => fn(e)} placeholder={placeholder} secureTextEntry={secureMode} style={style}/>
    </View>
  )

}

export default Input
