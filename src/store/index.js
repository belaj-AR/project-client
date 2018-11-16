import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import FormInput from '../reducers/FormInput'
import StatusLogin from '../reducers/StatusLogin'
import itemReducer from '../reducers/item'

const reducers = combineReducers({
  FormInput, StatusLogin, itemReducer
})

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

export default store