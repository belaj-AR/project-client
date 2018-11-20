import axios from 'axios'

import config from '../../config'

const { ngrokTunnel } = config

export default function async (token) {
  return function (dispatch) {

    axios({
      method: 'get',
      url: `${ngrokTunnel}/items`,
      headers: {
        token
      }
    })
      .then(({ data: { data: { data } } }) => {
        dispatch({type: 'SET_MONSTER_LIST', payload: data})
      })
      .catch(err => {
        alert('Failed when get monster list data')
      })
  }
}
