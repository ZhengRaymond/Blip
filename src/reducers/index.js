import { combineReducers } from 'redux';
import mainReducer from './reducer_main';
// import TweetsReducer from './reducer_tweets';

const rootReducer = combineReducers({
  main: mainReducer,
});

export default rootReducer;
