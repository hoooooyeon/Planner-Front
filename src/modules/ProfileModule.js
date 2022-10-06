import createSaga from '../lib/createSaga';
import { takeLatest } from 'redux-saga/effects';
import * as profileAPI from '../lib/api/profileAPI';

// 액션 타입
const initializeType = 'profile/INITIALIZE';
const initializeErrorType = 'profile/INITIALIZERROR';
const changeFieldType = 'profile/CHANGE_FIELD';

const profileLoadType = 'profile/PROFILE_LOAD';
const profileLoadSuccessType = 'profile/PROFILE_LOAD_SUCCESS';
const profileLoadFailureType = 'profile/PROFILE_LOAD_FAILURE';
const profileUpdateType = 'profile/PROFILE_UPDATE';
const profileUpdateSuccessType = 'profile/PROFILE_UPDATE_SUCCESS';
const profileUpdateFailureType = 'profile/PROFILE_UPDATE_FAILURE';
const profileImageUpdateType = 'profile/PROFILE_IMAGE_UPDATE';
const profileImageUpdateSuccessType = 'profile/PROFILE_IMAGE_UPDATE_SUCCESS';
const profileImageUpdateFailureType = 'profile/PROFILE_IMAGE_UPDATE_FAILURE';
const likeSpotIdCheckType = 'profile/LIKE_SPOT_ID_CHECK';
const likeSpotIdCheckSuccessType = 'profile/LIKE_SPOT_ID_CHECK_SUCCESS';
const likeSpotIdCheckFailureType = 'profile/LIKE_SPOT_ID_CHECK_FAILURE';

// 액션 함수
export const initializeAction = () => ({
    type: initializeType,
});

export const initializeErrorAction = () => ({
    type: initializeErrorType,
});

export const changeFieldAction = ({ name, value }) => ({
    type: changeFieldType,
    name,
    value,
});

export const profileLoadAction = (accountId) => ({
    type: profileLoadType,
    accountId,
});

export const profileUpdateAction = ({ accountId, nickname, phone }) => ({
    type: profileUpdateType,
    accountId,
    nickname,
    phone,
});

export const profileImageUpdateAction = ({ accountId, formData }) => ({
    type: profileImageUpdateType,
    accountId,
    formData,
});

export const likeSpotIdCheckAction = (accountId, spotId) => ({
    type: likeSpotIdCheckType,
    accountId,
    spotId,
});

const profileLoad = createSaga(profileLoadType, profileAPI.profileLoad);
const profileUpdate = createSaga(profileUpdateType, profileAPI.profileUpdate);
const profileImageUpdate = createSaga(profileImageUpdateType, profileAPI.profileImageUpdate);
const likeSpotIdCheck = createSaga(likeSpotIdCheckType, profileAPI.likeSpotIdCheck);

export function* profileSaga() {
    yield takeLatest(profileLoadType, profileLoad);
    yield takeLatest(profileUpdateType, profileUpdate);
    yield takeLatest(profileImageUpdateType, profileImageUpdate);
    yield takeLatest(likeSpotIdCheckType, likeSpotIdCheck);
}

const initialState = {
    profileField: {
        nickname: '',
        phone: '',
    },
    profile: null,
    profileUpdate: false,
    profileError: null,
    likeSpotId: null,
};

function profileReducer(state = initialState, action) {
    switch (action.type) {
        case initializeType: {
            return { ...initialState };
        }
        case initializeErrorType: {
            return { ...state, profileError: '' };
        }
        case changeFieldType: {
            return { ...state, profileField: { ...state.profileField, [action.name]: action.value } };
        }
        case profileLoadSuccessType: {
            return {
                ...state,
                profile: action.payload.data,
                profileField: { ...state.profileField, nickname: action.payload.data.nickname, phone: action.payload.data.phone || '' },
            };
        }
        case profileLoadFailureType: {
            return { ...state, profileError: action.payload.data };
        }
        case profileUpdateSuccessType: {
            return { ...state, profileUpdate: true };
        }
        case profileUpdateFailureType: {
            return { ...state, profileUpdate: false, profileError: action.payload.message };
        }
        case profileImageUpdateSuccessType: {
            return { ...state, profileUpdate: true };
        }
        case profileImageUpdateFailureType: {
            return { ...state, profileUpdate: false, profileError: action.payload.message };
        }
        case likeSpotIdCheckSuccessType: {
            return { ...state, likeSpotId: action.payload.contentIds };
        }
        case likeSpotIdCheckFailureType: {
            return { ...state, profileError: action.payload.data };
        }
        default: {
            return state;
        }
    }
}

export default profileReducer;
