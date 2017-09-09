import { combineReducers } from 'redux';
import BlipsReducer from './reducer_blips';

const rootReducer = combineReducers({
  blips: BlipsReducer
});

export default rootReducer;
