import config from '../../config'
import axios from 'axios'

export default () => {

  return (dispatch) => {

    dispatch({
      type: 'ITEM_LOADING',
    });
    
    axios({
      method: 'GET',
      url: `${config.itemsApi}/items`
    })
    .then((response) => {
      dispatch({
        type: 'ADD_ITEM_SUCCESS',
        payload: response.data.data.data
      });
    }).catch((err) => {
      dispatch({
        type: 'ITEM_ERROR'
      });
    });
  
      

  };
};
    
