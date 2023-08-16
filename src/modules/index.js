import { combineReducers } from 'redux';
import authReducer from './authModule';
import { all } from 'redux-saga/effects';
import { authSaga } from './authModule';
import loadingReducer from './loadingModule';
import { spotSaga } from './spotModule';
import spotReducer from './spotModule';
import reviewReducer, { reviewSaga } from "./reviewModule";
import accountReducer, { accountSaga } from './accountModule';

const rootReducer = combineReducers({
    loadingReducer,
    authReducer,
    accountReducer,
    spotReducer,
    reviewReducer,
});

export function* rootSaga() {
    yield all([authSaga(), accountSaga(), reviewSaga(), spotSaga()]);
}

export default rootReducer;
