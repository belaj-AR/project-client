import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import FormInput from '../reducers/FormInput'

const reducers = combineReducers({
  FormInput
})

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

export default store