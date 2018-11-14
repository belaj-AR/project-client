import React from 'react'
import { View, TextInput } from 'react-native'

const Input = ({data}) => {

  return(
    <View>
      <TextInput onChangeText={(e) => data.fn(e)} placeholder={data.placeholder} style={styles.inputStyle}/>
    </View>
  )

}

const styles = {
  inputStyle: {
    height: 60,
    borderWidth: 1,
    borderColor: 'grey'
  }
}

export default Input