import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import FormInput from '../reducers/FormInput'
import StatusLogin from '../reducers/StatusLogin'
import itemReducer from '../reducers/item'
import token from '../reducers/Token'
import valCreateInput from '../reducers/valCreateInput'
import actionModalStatus from '../reducers/actionModalStatus'
import onlineUser from '../reducers/onlineUser'
import roomId from '../reducers/currentRoomId'
import currentUser from '../reducers/currentUser'
import dataRoom from '../reducers/dataRoom'
import dataRoomBattle from '../reducers/dataRoomBattle'
import onGameData from '../reducers/onGamedata'
import monsterList from '../reducers/monsterList'
import matches from '../reducers/matches'
import dataFromGame from '../reducers/dataFromGame'


const reducers = combineReducers({
  FormInput, 
  StatusLogin, 
  itemReducer, 
  token,
  valCreateInput,
  actionModalStatus,
  onlineUser,
  roomId,
  currentUser,
  dataRoom,
  dataRoomBattle,
  onGameData,
  monsterList,
  matches,
  dataFromGame
})

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

export default store
