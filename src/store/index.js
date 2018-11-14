import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import Login from '../reducers/Login'

const reducers = combineReducers({
  Login
})

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

export default store