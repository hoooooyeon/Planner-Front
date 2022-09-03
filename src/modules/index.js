import { combineReducers } from 'redux';
import authReducer from './authModule';
import { all } from 'redux-saga/effects';
import { authSaga } from './authModule';
import loading from './loading';
import spots, { spotsSaga } from './spots';

const rootReducer = combineReducers({
  authReducer,
  loading,
  spots,
});

export function* rootSaga() {
  yield all([authSaga(), spotsSaga()]);
}

export default rootReducer;
