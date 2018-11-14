import React from 'react'
import {Button, TouchableOpacity} from 'react-native'

const ButtonComp = ({fn, title}) => {

  return (
    <TouchableOpacity>
      <Button onPress={() => fn()} title={title}/>
    </TouchableOpacity>
  )

}

export default ButtonComp