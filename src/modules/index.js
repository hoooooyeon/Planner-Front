import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import spot, { spotSaga } from './spot';

const rootReducer = combineReducers({
  loading,
  spot,
});

export function* rootSaga() {
  yield all([spotSaga()]);
}

export default rootReducer;
