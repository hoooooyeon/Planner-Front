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

const LOAD_MY_PLANNER_LIST_TYPE = 'profile/LOAD_MY_PLANNER_LIST';
const LOAD_MY_PLANNER_LIST_SUCCESS_TYPE = 'profile/LOAD_MY_PLANNER_LIST_SUCCESS';
const LOAD_MY_PLANNER_LIST_FAILURE_TYPE = 'profile/LOAD_MY_PLANNER_LIST_FAILURE';

const LOAD_LIKE_LIST_TYPE = 'profile/LOAD_LIKE_LIST';
const LOAD_LIKE_LIST_SUCCESS_TYPE = 'profile/LOAD_LIKE_LIST_SUCCESS';
const LOAD_LIKE_LIST_FAILURE_TYPE = 'profile/LOAD_LIKE_LIST_FAILURE';

const RESET_LIKE_LIST_TYPE = 'profile/RESET_LIKE_LIST';

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

export const loadMyPlannerListAction = ({ accountId, pageNum, itemCount, sortCriteria }) => ({ type: LOAD_MY_PLANNER_LIST_TYPE, accountId, pageNum, itemCount, sortCriteria });

export const loadLikeListAction = ({ accountId, itemCount, sortCriteria, keyword, postType, pageNum }) => ({ type: LOAD_LIKE_LIST_TYPE, accountId, itemCount, sortCriteria, keyword, postType, pageNum });

export const resetLikeListAction = () => ({ type: RESET_LIKE_LIST_TYPE });

const profileLoad = createSaga(profileLoadType, profileAPI.profileLoad);
const profileUpdate = createSaga(profileUpdateType, profileAPI.profileUpdate);
const profileImageUpdate = createSaga(profileImageUpdateType, profileAPI.profileImageUpdate);
const loadMyPlannerListSaga = createSaga(LOAD_MY_PLANNER_LIST_TYPE, profileAPI.loadMyPlannerList);
const loadLikeListSaga = createSaga(LOAD_LIKE_LIST_TYPE, profileAPI.loadLikeList);

export function* profileSaga() {
    yield takeLatest(profileLoadType, profileLoad);
    yield takeLatest(profileUpdateType, profileUpdate);
    yield takeLatest(profileImageUpdateType, profileImageUpdate);
    yield takeLatest(LOAD_MY_PLANNER_LIST_TYPE, loadMyPlannerListSaga);
    yield takeLatest(LOAD_LIKE_LIST_TYPE, loadLikeListSaga);
}

const initialState = {
    profileField: {
        nickname: '',
        phone: '',
    },
    profile: null,
    profileUpdate: false,
    profileError: null,
    myPlanners: null,
    likeList: null,
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
        case LOAD_MY_PLANNER_LIST_SUCCESS_TYPE:
            return {
                ...state,
                myPlanners: action.payload.data,
            };
        case LOAD_MY_PLANNER_LIST_FAILURE_TYPE:
            return {
                ...state,
                profileError: action.payload.message,
            };
        case LOAD_LIKE_LIST_SUCCESS_TYPE:
            return {
                ...state,
                likeList: action.payload.data,
            };
        case LOAD_LIKE_LIST_FAILURE_TYPE:
            return {
                ...state,
                profileError: action.payload.message,
            };
        case RESET_LIKE_LIST_TYPE:
            return {
                ...state,
                likeList: null,
            };

        default: {
            return state;
        }
    }
}

export default profileReducer;
