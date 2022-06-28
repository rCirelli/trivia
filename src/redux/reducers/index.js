import { combineReducers } from 'redux';
import player from './player';
import ranking from './ranking';

const reducer = combineReducers({ player, ranking });

export default reducer;
