import axios from 'axios'

import config from '../../config'

const { ngrokTunnel } = config

export default function async (token) {
  return function (dispatch) {

    axios({
      method: 'get',
      url: `${ngrokTunnel}/users`,
      headers: {
        token
      }
    })
      .then(({ data: { data } }) => {
        dispatch({type: 'SET_CURRENT_USER', payload: data})
      })
      .catch(err => {
        alert('Failed when get user data')
      })
  }
}
