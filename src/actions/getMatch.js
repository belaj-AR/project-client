import axios from 'axios'

import config from '../../config'

const { ngrokTunnel } = config

export default function async (token) {
  return function (dispatch) {

    axios({
      method: 'get',
      url: `${ngrokTunnel}/matches`,
      headers: {
        token
      }
    })
      .then(({ data }) => {
        dispatch({type: 'SET_MATCHES', payload: data.data})
      })
      .catch(err => {
        alert('Failed when get history game data')
      })
  }
}
