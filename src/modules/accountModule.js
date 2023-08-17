import createSaga from '../lib/createSaga';
import { takeLatest } from 'redux-saga/effects';
import * as accountAPI from '../lib/api/accountAPI';

// 액션 타입
const INITIALIZE_TYPE = 'account/INITIALIZE';
const INITIALIZE_ERROR_TYPE = 'account/INITIALIZERROR';
const CHANGE_FIELD_TYPE = 'account/CHANGE_FIELD';
const ACCOUNT_LOAD_TYPE = 'account/ACCOUNT_LOAD';
const ACCOUNT_LOAD_SUCCESS_TYPE = 'account/ACCOUNT_LOAD_SUCCESS';
const ACCOUNT_LOAD_FAILURE_TYPE = 'account/ACCOUNT_LOAD_FAILURE';
const ACCOUNT_UPDATE_TYPE = 'account/ACCOUNT_UPDATE';
const ACCOUNT_UPDATE_SUCCESS_TYPE = 'account/ACCOUNT_UPDATE_SUCCESS';
const ACCOUNT_UPDATE_FAILURE_TYPE = 'account/ACCOUNT_UPDATE_FAILURE';
const ACCOUNT_IMAGE_UPDATE_TYPE = 'account/ACCOUNT_IMAGE_UPDATE';
const ACCOUNT_IMAGE_UPDATE_SUCCESS_TYPE = 'account/ACCOUNT_IMAGE_UPDATE_SUCCESS';
const ACCOUNT_IMAGE_UPDATE_FAILURE_TYPE = 'account/ACCOUNT_IMAGE_UPDATE_FAILURE';
const ACCOUNT_MY_PLANNER_LOAD_TYPE = 'account/ACCOUNT_MY_PLANNER_LOAD';
const ACCOUNT_MY_PLANNER_LOAD_SUCCESS_TYPE = 'account/ACCOUNT_MY_PLANNER_LOAD_SUCCESS';
const ACCOUNT_MY_PLANNER_LOAD_FAILURE_TYPE = 'account/ACCOUNT_MY_PLANNER_LOAD_FAILURE';
const ACCOUNT_LIKE_PLANNER_LOAD_TYPE = 'account/ACCOUNT_LIKE_PLANNER_LOAD';
const ACCOUNT_LIKE_PLANNER_LOAD_SUECCESS_TYPE = 'account/ACCOUNT_LIKE_PLANNER_LOAD_SUCCESS';
const ACCOUNT_LIKE_PLANNER_LOAD_FAILURE_TYPE = 'account/ACCOUNT_LIKE_PLANNER_LOAD_FAILURE';
const ACCOUNT_LIKE_SPOT_LOAD_TYPE = 'account/ACCOUNT_LIKE_SPOT_LOAD';
const ACCOUNT_LIKE_SPOT_LOAD_SUECCESS_TYPE = 'account/ACCOUNT_LIKE_SPOT_LOAD_SUCCESS';
const ACCOUNT_LIKE_SPOT_LOAD_FAILURE_TYPE = 'account/ACCOUNT_LIKE_SPOT_LOAD_FAILURE';


// 액션 함수
export const initializeAction = () => ({
    type: INITIALIZE_TYPE
});

export const initializeErrorAction = () => ({
    type: INITIALIZE_ERROR_TYPE
})

export const changeFieldAction = ({ name, value }) => ({
    type: CHANGE_FIELD_TYPE,
    name,
    value,
});

export const accountLoadAction = (accountId) => ({
    type: ACCOUNT_LOAD_TYPE,
    accountId
});

export const accountUpdateAction = ({ accountId, nickname, phone }) => ({
    type: ACCOUNT_UPDATE_TYPE,
    accountId,
    nickname,
    phone,
});

export const accountImageUpdateAction = ({ accountId, formData }) => ({
    type: ACCOUNT_IMAGE_UPDATE_TYPE,
    accountId,
    formData,
});

export const accountMyPlannerLoadAction = (accountId) => ({
    type: ACCOUNT_MY_PLANNER_LOAD_TYPE,
    accountId
});

export const accountLikePlannerLoadAction = ({ accountId, itemCount, sortCriteria, keyword, postType, pageNum }) => ({
    type: ACCOUNT_LIKE_PLANNER_LOAD_TYPE,
    accountId,
    itemCount,
    sortCriteria,
    keyword,
    postType,
    pageNum
});

export const accountLikeSpotLoadAction = ({ accountId, itemCount, sortCriteria, keyword, postType, pageNum }) => ({
    type: ACCOUNT_LIKE_SPOT_LOAD_TYPE,
    accountId,
    itemCount,
    sortCriteria,
    keyword,
    postType,
    pageNum
});

const accountLoad = createSaga(ACCOUNT_LOAD_TYPE, accountAPI.accountLoad);
const accountUpdate = createSaga(ACCOUNT_UPDATE_TYPE, accountAPI.accountUpdate);
const accountImageUpdate = createSaga(ACCOUNT_IMAGE_UPDATE_TYPE, accountAPI.accountImageUpdate);
const accountMyPlannerLoad = createSaga(ACCOUNT_MY_PLANNER_LOAD_TYPE, accountAPI.accountMyPlannerLoad);
const accountLikePlannerLoad = createSaga(ACCOUNT_LIKE_PLANNER_LOAD_TYPE, accountAPI.accountLikeListLoad);
const accountLikeSpotLoad = createSaga(ACCOUNT_LIKE_SPOT_LOAD_TYPE, accountAPI.accountLikeListLoad);

export function* accountSaga() {
    yield takeLatest(ACCOUNT_LOAD_TYPE, accountLoad);
    yield takeLatest(ACCOUNT_UPDATE_TYPE, accountUpdate);
    yield takeLatest(ACCOUNT_IMAGE_UPDATE_TYPE, accountImageUpdate)
    yield takeLatest(ACCOUNT_MY_PLANNER_LOAD_TYPE, accountMyPlannerLoad);
    yield takeLatest(ACCOUNT_LIKE_PLANNER_LOAD_TYPE, accountLikePlannerLoad);
    yield takeLatest(ACCOUNT_LIKE_SPOT_LOAD_TYPE, accountLikeSpotLoad);
};

const initialState = {
    accountField: {
        nickname: '',
        phone: '',
    },
    account: null,
    myPlanner: {},
    likeList: {
        likePlanner: {},
        likeSpot: {}
    },
    accountUpdate: false,
    accountError: null,
};

function accountReducer(state = initialState, action) {
    switch (action.type) {
        case INITIALIZE_TYPE: {
            return { ...initialState };
        }
        case INITIALIZE_ERROR_TYPE: {
            return { ...state, accountError: '' };
        }
        case CHANGE_FIELD_TYPE: {
            return { ...state, accountField: { ...state.accountField, [action.name]: action.value } };
        }
        case ACCOUNT_LOAD_SUCCESS_TYPE: {
            return {
                ...state,
                account: action.payload.data,
                accountField: { ...state.accountField, nickname: action.payload.data.nickname, phone: action.payload.data.phone || '' },
            };
        }
        case ACCOUNT_UPDATE_SUCCESS_TYPE: {
            return { ...state, accountUpdate: true };
        }
        case ACCOUNT_IMAGE_UPDATE_SUCCESS_TYPE: {
            return { ...state, accountUpdate: true };
        }
        case ACCOUNT_MY_PLANNER_LOAD_SUCCESS_TYPE: {
            return { ...state, myPlanner: action.payload.data };
        }
        case ACCOUNT_LIKE_PLANNER_LOAD_SUECCESS_TYPE: {
            return { ...state, likeList: { ...state.likeList, likePlanner: action.payload.data } };
        }
        case ACCOUNT_LIKE_SPOT_LOAD_SUECCESS_TYPE: {
            return { ...state, likeList: { ...state.likeList, likeSpot: action.payload.data } };
        }
        case ACCOUNT_LOAD_FAILURE_TYPE: {
            return { ...state, accountError: action.payload.data };
        }
        case ACCOUNT_UPDATE_FAILURE_TYPE:
        case ACCOUNT_IMAGE_UPDATE_FAILURE_TYPE:
        case ACCOUNT_MY_PLANNER_LOAD_FAILURE_TYPE:
        case ACCOUNT_LIKE_PLANNER_LOAD_FAILURE_TYPE:
        case ACCOUNT_LIKE_SPOT_LOAD_FAILURE_TYPE: {
            return { ...state, accountUpdate: false, accountError: action.payload.message };
        }

        default: {
            return state;
        }
    }
}

export default accountReducer;
