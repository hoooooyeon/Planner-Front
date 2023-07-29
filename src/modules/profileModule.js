import createSaga from '../lib/createSaga';
import { takeLatest } from 'redux-saga/effects';
import * as profileAPI from '../lib/api/profileAPI';

// 액션 타입
const INITIALIZE_TYPE = 'profile/INITIALIZE';
const INITIALIZE_ERROR_TYPE = 'profile/INITIALIZERROR';
const CHANGE_FIELD_TYPE = 'profile/CHANGE_FIELD';
const PROFILE_LOAD_TYPE = 'profile/PROFILE_LOAD';
const PROFILE_LOAD_SUCCESS_TYPE = 'profile/PROFILE_LOAD_SUCCESS';
const PROFILE_LOAD_FAILURE_TYPE = 'profile/PROFILE_LOAD_FAILURE';
const PROFILE_UPDATE_TYPE = 'profile/PROFILE_UPDATE';
const PROFILE_UPDATE_SUCCESS_TYPE = 'profile/PROFILE_UPDATE_SUCCESS';
const PROFILE_UPDATE_FAILURE_TYPE = 'profile/PROFILE_UPDATE_FAILURE';
const PROFILE_IMAGE_UPDATE_TYPE = 'profile/PROFILE_IMAGE_UPDATE';
const PROFILE_IMAGE_UPDATE_SUCCESS_TYPE = 'profile/PROFILE_IMAGE_UPDATE_SUCCESS';
const PROFILE_IMAGE_UPDATE_FAILURE_TYPE = 'profile/PROFILE_IMAGE_UPDATE_FAILURE';
const PROFILE_MY_PLANNER_LOAD_TYPE = 'profile/PROFILE_MY_PLANNER_LOAD';
const PROFILE_MY_PLANNER_LOAD_SUCCESS_TYPE = 'profile/PROFILE_MY_PLANNER_LOAD_SUCCESS';
const PROFILE_MY_PLANNER_LOAD_FAILURE_TYPE = 'profile/PROFILE_MY_PLANNER_LOAD_FAILURE';
const PROFILE_LIKE_PLANNER_LOAD_TYPE = 'profile/PROFILE_LIKE_PLANNER_LOAD';
const PROFILE_LIKE_PLANNER_LOAD_SUECCESS_TYPE = 'profile/PROFILE_LIKE_PLANNER_LOAD_SUCCESS';
const PROFILE_LIKE_PLANNER_LOAD_FAILURE_TYPE = 'profile/PROFILE_LIKE_PLANNER_LOAD_FAILURE';
const PROFILE_LIKE_SPOT_LOAD_TYPE = 'profile/PROFILE_LIKE_SPOT_LOAD';
const PROFILE_LIKE_SPOT_LOAD_SUECCESS_TYPE = 'profile/PROFILE_LIKE_SPOT_LOAD_SUCCESS';
const PROFILE_LIKE_SPOT_LOAD_FAILURE_TYPE = 'profile/PROFILE_LIKE_SPOT_LOAD_FAILURE';

const RESET_LIKE_LIST_TYPE = 'profile/RESET_LIKE_LIST';
const RESET_MY_PLANNER_LIST_TYPE = 'profile/RESET_MY_PLANNER_LIST';

// 액션 함수
export const initializeAction = () => ({
    type: INITIALIZE_TYPE,
});

export const initializeErrorAction = () => ({
    type: INITIALIZE_ERROR_TYPE,
});

export const changeFieldAction = ({ name, value }) => ({
    type: CHANGE_FIELD_TYPE,
    name,
    value,
});

export const profileLoadAction = (accountId) => ({
    type: PROFILE_LOAD_TYPE,
    accountId,
});

export const profileUpdateAction = ({ accountId, nickname, phone }) => ({
    type: PROFILE_UPDATE_TYPE,
    accountId,
    nickname,
    phone,
});

export const profileImageUpdateAction = ({ accountId, formData }) => ({
    type: PROFILE_IMAGE_UPDATE_TYPE,
    accountId,
    formData,
});

export const profileMyPlannerLoadAction = ({ accountId, pageNum, itemCount, sortCriteria }) => ({
    type: PROFILE_MY_PLANNER_LOAD_TYPE,
    accountId,
    pageNum,
    itemCount,
    sortCriteria,
});

export const profileLikePlannerLoadAction = ({ accountId, itemCount, sortCriteria, keyword, postType, pageNum }) => ({
    type: PROFILE_LIKE_PLANNER_LOAD_TYPE,
    accountId,
    itemCount,
    sortCriteria,
    keyword,
    postType,
    pageNum,
});
export const profileLikeSPOTLoadAction = ({ accountId, itemCount, sortCriteria, keyword, postType, pageNum }) => ({
    type: PROFILE_LIKE_SPOT_LOAD_TYPE,
    accountId,
    itemCount,
    sortCriteria,
    keyword,
    postType,
    pageNum,
});
export const resetLikeListAction = () => ({ type: RESET_LIKE_LIST_TYPE });

export const resetMyPlannerListAction = () => ({ type: RESET_MY_PLANNER_LIST_TYPE });

const profileLoad = createSaga(PROFILE_LOAD_TYPE, profileAPI.profileLoad);
const profileUpdate = createSaga(PROFILE_UPDATE_TYPE, profileAPI.profileUpdate);
const profileImageUpdate = createSaga(PROFILE_IMAGE_UPDATE_TYPE, profileAPI.profileImageUpdate);
const profileMyPlannerLoad = createSaga(PROFILE_MY_PLANNER_LOAD_TYPE, profileAPI.profileMyPlannerLoad);
const profileLikePlannerLoad = createSaga(PROFILE_LIKE_PLANNER_LOAD_TYPE, profileAPI.profileLikeListLoad);
const profileLikeSpotLoad = createSaga(PROFILE_LIKE_SPOT_LOAD_TYPE, profileAPI.profileLikeListLoad);

export function* profileSaga() {
    yield takeLatest(PROFILE_LOAD_TYPE, profileLoad);
    yield takeLatest(PROFILE_UPDATE_TYPE, profileUpdate);
    yield takeLatest(PROFILE_IMAGE_UPDATE_TYPE, profileImageUpdate);
    yield takeLatest(PROFILE_MY_PLANNER_LOAD_TYPE, profileMyPlannerLoad);
    yield takeLatest(PROFILE_LIKE_PLANNER_LOAD_TYPE, profileLikePlannerLoad);
    yield takeLatest(PROFILE_LIKE_SPOT_LOAD_TYPE, profileLikeSpotLoad);
}

const initialState = {
    profileField: {
        nickname: '',
        phone: '',
    },
    profile: null,
    plannerList: {
        myPlanners: null,
        likePlanners: null,
    },
    likeSpots: null,
    profileUpdate: false,
    profileError: null,
};

function profileReducer(state = initialState, action) {
    switch (action.type) {
        case INITIALIZE_TYPE: {
            return { ...initialState };
        }
        case INITIALIZE_ERROR_TYPE: {
            return { ...state, profileError: '' };
        }
        case CHANGE_FIELD_TYPE: {
            return { ...state, profileField: { ...state.profileField, [action.name]: action.value } };
        }
        case PROFILE_LOAD_SUCCESS_TYPE: {
            return {
                ...state,
                profile: action.payload.data,
                profileField: {
                    ...state.profileField,
                    nickname: action.payload.data.nickname,
                    phone: action.payload.data.phone || '',
                },
            };
        }
        case PROFILE_UPDATE_SUCCESS_TYPE: {
            return { ...state, profileUpdate: true };
        }
        case PROFILE_IMAGE_UPDATE_SUCCESS_TYPE: {
            return { ...state, profileUpdate: true };
        }
        case PROFILE_MY_PLANNER_LOAD_SUCCESS_TYPE: {
            return { ...state, plannerList: { ...state.plannerList, myPlanners: action.payload.data } };
        }
        case PROFILE_LIKE_PLANNER_LOAD_SUECCESS_TYPE: {
            return {
                ...state,
                plannerList: {
                    ...state.plannerList,
                    likePlanners: action.payload.data,
                },
            };
        }
        case PROFILE_LIKE_SPOT_LOAD_SUECCESS_TYPE: {
            return { ...state, likeSpots: action.payload.data };
        }
        case PROFILE_LOAD_FAILURE_TYPE: {
            return { ...state, profileError: action.payload.data };
        }
        case PROFILE_UPDATE_FAILURE_TYPE:
        case PROFILE_IMAGE_UPDATE_FAILURE_TYPE:
        case PROFILE_MY_PLANNER_LOAD_FAILURE_TYPE:
        case PROFILE_LIKE_PLANNER_LOAD_FAILURE_TYPE:
        case PROFILE_LIKE_SPOT_LOAD_FAILURE_TYPE: {
            return { ...state, profileUpdate: false, profileError: action.payload.message };
        }

        case RESET_LIKE_LIST_TYPE:
            return {
                ...state,
                likeList: null,
            };
        case RESET_MY_PLANNER_LIST_TYPE:
            return {
                ...state,
                myPlanners: null,
            };
        default: {
            return state;
        }
    }
}

export default profileReducer;
