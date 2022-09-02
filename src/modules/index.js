import { combineReducers } from 'redux';
import authReducer from './authModule';
import { all } from 'redux-saga/effects';
import { authSaga } from './authModule';
import loading from './loading';
import spot, { spotSaga } from './spot';

const rootReducer = combineReducers({
  authReducer,
  loading,
  spot,
});

export function* rootSaga() {
  yield all([authSaga(), spotSaga()]);
}

export default rootReducer;
