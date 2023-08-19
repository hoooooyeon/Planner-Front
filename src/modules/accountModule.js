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
const ACCOUNT_MY_PLANNER_LIST_LOAD_TYPE = 'account/ACCOUNT_MY_PLANNER_LIST_LOAD';
const ACCOUNT_MY_PLANNER_LIST_LOAD_SUCCESS_TYPE = 'account/ACCOUNT_MY_PLANNER_LIST_LOAD_SUCCESS';
const ACCOUNT_MY_PLANNER_LIST_LOAD_FAILURE_TYPE = 'account/ACCOUNT_MY_PLANNER_LIST_LOAD_FAILURE';
const ACCOUNT_LIKE_PLANNER_LIST_LOAD_TYPE = 'account/ACCOUNT_LIKE_PLANNER_LIST_LOAD';
const ACCOUNT_LIKE_PLANNER_LIST_LOAD_SUECCESS_TYPE = 'account/ACCOUNT_LIKE_PLANNER_LIST_LOAD_SUCCESS';
const ACCOUNT_LIKE_PLANNER_LIST_LOAD_FAILURE_TYPE = 'account/ACCOUNT_LIKE_PLANNER_LIST_LOAD_FAILURE';
const ACCOUNT_LIKE_SPOT_LIST_LOAD_TYPE = 'account/ACCOUNT_LIKE_SPOT_LIST_LOAD';
const ACCOUNT_LIKE_SPOT_LIST_LOAD_SUECCESS_TYPE = 'account/ACCOUNT_LIKE_SPOT_LIST_LOAD_SUCCESS';
const ACCOUNT_LIKE_SPOT_LIST_LOAD_FAILURE_TYPE = 'account/ACCOUNT_LIKE_SPOT_LIST_LOAD_FAILURE';
const RESET_LIKE_SPOT_LIST_TYPE = 'account/RESET_LIKE_SPOT_LIST';
const RESET_MY_PLANNER_LIST_TYPE = 'account/RESET_MY_PLANNER_LIST';

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

export const accountLoadAction = (accountId) => ({
    type: ACCOUNT_LOAD_TYPE,
    accountId,
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

export const accountMyPlannerListLoadAction = ({ accountId, pageNum, itemCount, sortCriteria }) => ({
    type: ACCOUNT_MY_PLANNER_LIST_LOAD_TYPE,
    accountId,
    pageNum,
    itemCount,
    sortCriteria,
});

export const accountLikePlannerListLoadAction = ({
    accountId,
    itemCount,
    sortCriteria,
    keyword,
    postType,
    pageNum,
}) => ({
    type: ACCOUNT_LIKE_PLANNER_LIST_LOAD_TYPE,
    accountId,
    itemCount,
    sortCriteria,
    keyword,
    postType,
    pageNum,
});

export const accountLikeSpotListLoadAction = ({ accountId, itemCount, sortCriteria, keyword, postType, pageNum }) => ({
    type: ACCOUNT_LIKE_SPOT_LIST_LOAD_TYPE,
    accountId,
    itemCount,
    sortCriteria,
    keyword,
    postType,
    pageNum,
});

export const resetLikeSpotListAction = () => ({ type: RESET_LIKE_SPOT_LIST_TYPE });
export const resetMyPlannerListAction = () => ({ type: RESET_MY_PLANNER_LIST_TYPE });

const accountLoad = createSaga(ACCOUNT_LOAD_TYPE, accountAPI.accountLoad);
const accountUpdate = createSaga(ACCOUNT_UPDATE_TYPE, accountAPI.accountUpdate);
const accountImageUpdate = createSaga(ACCOUNT_IMAGE_UPDATE_TYPE, accountAPI.accountImageUpdate);
const accountMyPlannerListLoad = createSaga(ACCOUNT_MY_PLANNER_LIST_LOAD_TYPE, accountAPI.accountMyPlannerListLoad);
const accountLikePlannerListLoad = createSaga(ACCOUNT_LIKE_PLANNER_LIST_LOAD_TYPE, accountAPI.accountLikeListLoad);
const accountLikeSpotListLoad = createSaga(ACCOUNT_LIKE_SPOT_LIST_LOAD_TYPE, accountAPI.accountLikeListLoad);

export function* accountSaga() {
    yield takeLatest(ACCOUNT_LOAD_TYPE, accountLoad);
    yield takeLatest(ACCOUNT_UPDATE_TYPE, accountUpdate);
    yield takeLatest(ACCOUNT_IMAGE_UPDATE_TYPE, accountImageUpdate);
    yield takeLatest(ACCOUNT_MY_PLANNER_LIST_LOAD_TYPE, accountMyPlannerListLoad);
    yield takeLatest(ACCOUNT_LIKE_PLANNER_LIST_LOAD_TYPE, accountLikePlannerListLoad);
    yield takeLatest(ACCOUNT_LIKE_SPOT_LIST_LOAD_TYPE, accountLikeSpotListLoad);
}

const initialState = {
    accountField: {
        nickname: '',
        phone: '',
    },
    account: null,
    myPlanners: {},
    likeList: {
        likePlanners: {},
        likeSpots: {},
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
                accountField: {
                    ...state.accountField,
                    nickname: action.payload.data.nickname,
                    phone: action.payload.data.phone || '',
                },
            };
        }
        case ACCOUNT_UPDATE_SUCCESS_TYPE: {
            return { ...state, accountUpdate: true };
        }
        case ACCOUNT_IMAGE_UPDATE_SUCCESS_TYPE: {
            return { ...state, accountUpdate: true };
        }
        case ACCOUNT_MY_PLANNER_LIST_LOAD_SUCCESS_TYPE: {
            return { ...state, myPlanners: action.payload.data };
        }
        case ACCOUNT_LIKE_PLANNER_LIST_LOAD_SUECCESS_TYPE: {
            return { ...state, likeList: { ...state.likeList, likePlanners: action.payload.data } };
        }
        case ACCOUNT_LIKE_SPOT_LIST_LOAD_SUECCESS_TYPE: {
            return { ...state, likeList: { ...state.likeList, likeSpots: action.payload.data } };
        }
        case ACCOUNT_LOAD_FAILURE_TYPE: {
            return { ...state, accountError: action.payload.data };
        }
        case ACCOUNT_UPDATE_FAILURE_TYPE:
        case ACCOUNT_IMAGE_UPDATE_FAILURE_TYPE:
        case ACCOUNT_MY_PLANNER_LIST_LOAD_FAILURE_TYPE:
        case ACCOUNT_LIKE_PLANNER_LIST_LOAD_FAILURE_TYPE:
        case ACCOUNT_LIKE_SPOT_LIST_LOAD_FAILURE_TYPE: {
            return { ...state, accountUpdate: false, accountError: action.payload.message };
        }
        case RESET_LIKE_SPOT_LIST_TYPE:
            return {
                ...state,
                likeList: {
                    ...state.likeList,
                    likeSpots: {},
                },
            };
        case RESET_MY_PLANNER_LIST_TYPE:
            return {
                ...state,
                myPlanners: {},
            };
        default: {
            return state;
        }
    }
}

export default accountReducer;
