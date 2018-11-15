import AlertComp from '../../../components/Alert'

export default ( errCode ) => {
  if (errCode === 'auth/user-not-found') {
    return AlertComp('Notification', 'Seems you not registered to our apps', [
        {text: 'Ok', onPress: () => console.log('OK Pressed')},
        {text: 'Register', onPress: () => console.log('OK Pressed')},
      ])
  } else if (errCode === 'auth/invalid-email') {
    return AlertComp('Notification', 'Opps.. seems your email is incorect', [
        {text: 'Ok', onPress: () => console.log('OK Pressed')},
      ])
  } else if (errCode === 'auth/wrong-password') {
    return AlertComp('Notification', 'Opps.. seems your email or password is incorect', [
        {text: 'Ok', onPress: () => console.log('OK Pressed')},
      ])
  }
}
