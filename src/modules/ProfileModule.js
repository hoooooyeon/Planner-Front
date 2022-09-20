import createSaga from "../lib/createSaga";
import { takeLatest } from 'redux-saga/effects';
import * as profileAPI from "../lib/api/profileAPI";

// 액션 타입
const initializeType = 'profile/INITIALIZE';
const changeFieldType = 'profile/CHANGE_FIELD';

const profileLoadType = 'profile/PROFILE_LOAD';
const profileLoadSuccessType = 'profile/PROFILE_LOAD_SUCCESS';
const profileLoadFailureType = 'profile/PROFILE_LOAD_FAILURE';
const profileUpdateType = 'profile/PROFILE_UPDATE';
const profileUpdateSuccessType = 'profile/PROFILE_UPDATE_SUCCESS';
const profileUpdateFailureType = 'profile/PROFILE_UPDATE_FAILURE';

// 액션 함수
export const initializeAction = () => ({
    type: initializeType
});

export const changeFieldAction = ({ name, value }) => ({
    type: changeFieldType,
    name,
    value
});

export const profileLoadAction = (accountId) => ({
    type: profileLoadType,
    accountId
});

export const profileUpdateAction = ({ accountId, username, nickname }) => ({
    type: profileUpdateType,
    accountId,
    username,
    nickname
});

const profileLoad = createSaga(profileLoadType, profileAPI.profileLoad);
const profileUpdate = createSaga(profileUpdateType, profileAPI.profileUpdate);

export function* profileSaga() {
    yield takeLatest(profileLoadType, profileLoad);
    yield takeLatest(profileUpdateType, profileUpdate);
};

const initialState = {
    profileField: {
        nickname: '',
        phone: ''
    },
    profile: null,
    profileError: null
};

function profileReducer(state = initialState, action) {
    switch (action.type) {
        case initializeType: {
            return { ...initialState };
        }
        case changeFieldType: {
            return { ...state, profileField: { ...state.profileField, [action.name]: action.value } };
        }
        case profileLoadSuccessType: {
            return {
                ...state,
                profile: action.payload.data,
                profileField: { ...state.profileField, nickname: action.payload.data.nickname, phone: action.payload.data.phone || '' }
            };
        }
        case profileLoadFailureType: {
            return { ...state, profileError: action.payload.data };
        }
        case profileUpdateSuccessType: {
            return { ...state };
        }
        case profileUpdateFailureType: {
            return { ...state, profileError: action.payload.message };
        }
        default: {
            return state;
        }
    }
}

export default profileReducer;
