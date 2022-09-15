import { combineReducers } from 'redux';
import authReducer from './authModule';
import spotReducer from './spotModule';
import { all } from 'redux-saga/effects';
import { authSaga } from './authModule';
import { spotSaga } from './spotModule';

const rootReducer = combineReducers({
  authReducer,
  spotReducer,
});

export function* rootSaga() {
  yield all([authSaga(), spotSaga()]);
}

export default rootReducer;
