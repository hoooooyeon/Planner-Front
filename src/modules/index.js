import { combineReducers } from "redux";
import authReducer from "./authModule";
import profileReducer, { profileSaga } from "./profileModule";
import { all } from 'redux-saga/effects';
import { authSaga } from "./authModule";
import loadingReducer from "./loadingModule";
import reviewReducer, { reviewSaga } from "./reviewModule";
import plannerReducer, { plannerSaga } from "./plannerModule";

const rootReducer = combineReducers({
    loadingReducer,
    authReducer,
    profileReducer,
    reviewReducer,
    plannerReducer
});

export function* rootSaga() {
    yield all([authSaga(), profileSaga(), reviewSaga(), plannerSaga()]);
};

export default rootReducer;