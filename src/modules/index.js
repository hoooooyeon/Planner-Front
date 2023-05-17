import { combineReducers } from 'redux';
import authReducer from './authModule';
import profileReducer, { profileSaga } from './ProfileModule';
import { all } from 'redux-saga/effects';
import { authSaga } from './authModule';
import loadingReducer from './loadingModule';
import plannerReducer, { plannerSaga } from './plannerModule';
import spotReducer, { spotSaga } from './spotModule';

const rootReducer = combineReducers({
    loadingReducer,
    authReducer,
    profileReducer,
    plannerReducer,
    spotReducer,
});

export function* rootSaga() {
    yield all([authSaga(), profileSaga(), plannerSaga(), spotSaga()]);
}

export default rootReducer;
