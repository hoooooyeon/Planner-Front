import { combineReducers } from 'redux';
import authReducer from './authModule';
import { all } from 'redux-saga/effects';
import { authSaga } from './authModule';
import loadingReducer from './loadingModule';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import plannerReducer, { plannerSaga } from './plannerModule';
import spotReducer, { spotSaga } from './spotModule';
import reviewReducer, { reviewSaga } from './reviewModule';
import accountReducer, { accountSaga } from './accountModule';

const rootPersistConfig = {
    key: 'root',
    storage,
    blacklist: ['loadingReducer', 'profileReducer', 'plannerReducer', 'spotReducer', 'reviewReducer'],
};

const plannerPersistConfig = {
    key: 'plannerReducer',
    storage,
    whitelist: ['plannerData'],
};

const rootReducer = combineReducers({
    loadingReducer,
    authReducer,
    accountReducer,
    plannerReducer: persistReducer(plannerPersistConfig, plannerReducer),
    spotReducer,
    reviewReducer,
});

export function* rootSaga() {
    yield all([authSaga(), accountSaga(), plannerSaga(), reviewSaga(), spotSaga()]);
}
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
export default persistedReducer;
