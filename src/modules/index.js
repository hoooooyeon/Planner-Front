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
import invitationReducer, { invitationSaga } from './invitationModule';
import notificationReducer, { notificationSaga } from './notificationModule';

const rootPersistConfig = {
    key: 'root',
    storage,
    blacklist: [
        'accountReducer',
        'authReducer',
        'loadingReducer',
        'profileReducer',
        'plannerReducer',
        'spotReducer',
        'reviewReducer',
        'invitationReducer',
        'notificationReducer',
    ],
};

const authPersistConfig = {
    key: 'authReducer',
    storage,
    whitelist: ['account', 'token'],
};

const spotPersistConfig = {
    key: 'spotReducer',
    storage,
    whitelist: ['areas'],
};

const rootReducer = combineReducers({
    loadingReducer,
    authReducer: persistReducer(authPersistConfig, authReducer),
    accountReducer,
    plannerReducer,
    spotReducer: persistReducer(spotPersistConfig, spotReducer),
    reviewReducer,
    invitationReducer,
    notificationReducer,
});

export function* rootSaga() {
    yield all([
        authSaga(),
        accountSaga(),
        plannerSaga(),
        reviewSaga(),
        spotSaga(),
        invitationSaga(),
        notificationSaga(),
    ]);
}
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
export default persistedReducer;
