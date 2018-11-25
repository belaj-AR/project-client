import { Alert } from 'react-native'

export default (titleNotif, messageNotif, arrChoisesButton) => {
  return (
    Alert.alert(
      titleNotif,
      messageNotif,
      arrChoisesButton,
      { cancelable: false }
    )
  )
}
