import { combineReducers } from 'redux';
import authReducer from './authModule';
import { all } from 'redux-saga/effects';
import { authSaga } from './authModule';

const rootReducer = combineReducers({
  authReducer,
});

export function* rootSaga() {
  yield all([authSaga()]);
}

export default rootReducer;
