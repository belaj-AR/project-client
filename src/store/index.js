import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import FormInput from '../reducers/FormInput'
import StatusLogin from '../reducers/StatusLogin'
import itemReducer from '../reducers/item'
import token from '../reducers/Token'

const reducers = combineReducers({
  FormInput, 
  StatusLogin, 
  itemReducer, 
  token
})

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

export default store
