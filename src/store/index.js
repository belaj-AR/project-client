import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import FormInput from '../reducers/FormInput'
import StatusLogin from '../reducers/StatusLogin'

const reducers = combineReducers({
  FormInput, StatusLogin
})

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

export default store