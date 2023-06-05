import { combineReducers } from 'redux';
import authReducer from './authModule';
import profileReducer, { profileSaga } from './profileModule';
import { all } from 'redux-saga/effects';
import { authSaga } from './authModule';
import loadingReducer from './loadingModule';
import { spotSaga } from './spotModule';
import spotReducer from './spotModule';
import reviewReducer, { reviewSaga } from "./reviewModule";

const rootReducer = combineReducers({
    loadingReducer,
    authReducer,
    profileReducer,
    spotReducer,
    reviewReducer,
});

export function* rootSaga() {
    yield all([authSaga(), profileSaga(), reviewSaga(), spotSaga()]);
}

export default rootReducer;
