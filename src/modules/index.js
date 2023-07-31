import { combineReducers } from 'redux';
import authReducer from './authModule';
import profileReducer, { profileSaga } from './profileModule';
import { all } from 'redux-saga/effects';
import { authSaga } from './authModule';
import loadingReducer from './loadingModule';
import plannerReducer, { plannerSaga } from './plannerModule';
import spotReducer, { spotSaga } from './spotModule';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reviewReducer, { reviewSaga } from './reviewModule';

const rootPersistConfig = {
    key: 'root',
    storage,
    // blacklist: ['loadingReducer', 'profileReducer', 'plannerReducer', 'spotReducer'],
    whitelist: ['plannerReducer', 'authReducer'],
};

const plannerPersistConfig = {
    key: 'plannerReducer',
    storage,
    whitelist: ['plannerData'],
};

const rootReducer = combineReducers({
    loadingReducer,
    authReducer,
    profileReducer,
    plannerReducer,
    // plannerReducer: persistReducer(plannerPersistConfig, plannerReducer),
    spotReducer,
    reviewReducer,
});

export function* rootSaga() {
    yield all([authSaga(), profileSaga(), plannerSaga(), reviewSaga(), spotSaga()]);
}
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default persistedReducer;
// export default rootReducer;
