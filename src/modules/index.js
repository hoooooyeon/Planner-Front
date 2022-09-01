import { combineReducers } from 'redux';
import loading from './loading';
import spot from './spot';

const rootReducer = combineReducers({
  loading,
  spot,
});

export default rootReducer;
