import { combineReducers } from 'redux';
import authReducer from './authModule';
import profileReducer, { profileSaga } from './ProfileModule';
import { all } from 'redux-saga/effects';
import { authSaga } from './authModule';
import loadingReducer from './loadingModule';
import { spotSaga } from './spotModule';
import spotReducer from './spotModule';

const rootReducer = combineReducers({
    loadingReducer,
    authReducer,
    profileReducer,
    spotReducer,
});

export function* rootSaga() {
    yield all([authSaga(), profileSaga(), spotSaga()]);
}

export default rootReducer;
