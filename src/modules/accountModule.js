import createSaga from '../lib/createSaga';
import { takeLatest } from 'redux-saga/effects';
import * as accountAPI from '../lib/api/accountAPI';

// 액션 타입
const INITIALIZE_TYPE = 'account/INITIALIZE';
const INITIALIZE_FORM_TYPE = 'auth/INITIALIZE_FORM';
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
const RESET_ACCOUNT_ERROR_TYPE = 'account/RESET_ACCOUNT_ERROR';
const ACCOUNT_ID_FIND_TYPE = 'account/ACCOUNT_ID_FIND';
const ACCOUNT_ID_FIND_SUCCESS_TYPE = 'account/ACCOUNT_ID_FIND_SUCCESS';
const ACCOUNT_ID_FIND_FAILURE_TYPE = 'account/ACCOUNT_ID_FIND_FAILURE';
const ACCOUNT_PASSWORD_FIND_TYPE = 'account/ACCOUNT_PASSWORD_FIND';
const ACCOUNT_PASSWORD_FIND_SUCCESS_TYPE = 'account/ACCOUNT_PASSWORD_FIND_SUCCESS';
const ACCOUNT_PASSWORD_FIND_FAILURE_TYPE = 'account/ACCOUNT_PASSWORD_FIND_FAILURE';
const ACCOUNT_PASSWORD_CHANGE_TYPE = 'account/ACCOUNT_PASSWORD_CHANGE';
const ACCOUNT_PASSWORD_CHANGE_SUCCESS_TYPE = 'account/ACCOUNT_PASSWORD_CHANGE_SUCCESS';
const ACCOUNT_PASSWORD_CHANGE_FAILURE_TYPE = 'account/ACCOUNT_PASSWORD_CHANGE_FAILURE';
const VALIDATE_TYPE = 'auth/VALIDATE';

// 액션 함수
export const initializeAction = () => ({
    type: INITIALIZE_TYPE,
});

export const initializeFormAction = (form) => ({
    type: INITIALIZE_FORM_TYPE,
    form,
});

export const initializeErrorAction = () => ({
    type: INITIALIZE_ERROR_TYPE,
});

export const changeFieldAction = ({ form, name, value }) => ({
    type: CHANGE_FIELD_TYPE,
    form,
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
export const resetAccountErrorAction = () => ({ type: RESET_ACCOUNT_ERROR_TYPE });

export const accountIdFindAction = ({ phone, code }) => ({
    type: ACCOUNT_ID_FIND_TYPE,
    phone,
    code,
});

export const accountPasswordFindAction = ({ email }) => ({ type: ACCOUNT_PASSWORD_FIND_TYPE, email });

export const accountPasswordChangeAction = ({ password, passwordConfirm, key }) => ({
    type: ACCOUNT_PASSWORD_CHANGE_TYPE,
    password,
    passwordConfirm,
    key,
});

export const validateFieldAction = (validState) => ({
    type: VALIDATE_TYPE,
    validState,
});

const accountLoad = createSaga(ACCOUNT_LOAD_TYPE, accountAPI.accountLoad);
const accountUpdate = createSaga(ACCOUNT_UPDATE_TYPE, accountAPI.accountUpdate);
const accountImageUpdate = createSaga(ACCOUNT_IMAGE_UPDATE_TYPE, accountAPI.accountImageUpdate);
const accountMyPlannerListLoad = createSaga(ACCOUNT_MY_PLANNER_LIST_LOAD_TYPE, accountAPI.accountMyPlannerListLoad);
const accountLikePlannerListLoad = createSaga(ACCOUNT_LIKE_PLANNER_LIST_LOAD_TYPE, accountAPI.accountLikeListLoad);
const accountLikeSpotListLoad = createSaga(ACCOUNT_LIKE_SPOT_LIST_LOAD_TYPE, accountAPI.accountLikeListLoad);
const accountIdFind = createSaga(ACCOUNT_ID_FIND_TYPE, accountAPI.accountIdFind);
const accountPasswordFind = createSaga(ACCOUNT_PASSWORD_FIND_TYPE, accountAPI.accountPasswordFind);
const accountPasswordChange = createSaga(ACCOUNT_PASSWORD_CHANGE_TYPE, accountAPI.accountPasswordChange);

export function* accountSaga() {
    yield takeLatest(ACCOUNT_LOAD_TYPE, accountLoad);
    yield takeLatest(ACCOUNT_UPDATE_TYPE, accountUpdate);
    yield takeLatest(ACCOUNT_IMAGE_UPDATE_TYPE, accountImageUpdate);
    yield takeLatest(ACCOUNT_MY_PLANNER_LIST_LOAD_TYPE, accountMyPlannerListLoad);
    yield takeLatest(ACCOUNT_LIKE_PLANNER_LIST_LOAD_TYPE, accountLikePlannerListLoad);
    yield takeLatest(ACCOUNT_LIKE_SPOT_LIST_LOAD_TYPE, accountLikeSpotListLoad);
    yield takeLatest(ACCOUNT_ID_FIND_TYPE, accountIdFind);
    yield takeLatest(ACCOUNT_PASSWORD_FIND_TYPE, accountPasswordFind);
    yield takeLatest(ACCOUNT_PASSWORD_CHANGE_TYPE, accountPasswordChange);
}

const initialState = {
    accountField: {
        nickname: '',
        phone: '',
    },
    findPw: {
        email: '',
    },
    changePw: {
        password: '',
        passwordConfirm: '',
        key: '',
    },
    pwFinding: false,
    pwChanging: false,
    account: null,
    myPlannerList: {},
    likeList: {
        likePlannerList: {},
        likeSpotList: {},
    },
    accountUpdate: false,
    accountError: null,
};

function accountReducer(state = initialState, action) {
    switch (action.type) {
        case INITIALIZE_TYPE: {
            return { ...initialState };
        }
        case INITIALIZE_FORM_TYPE: {
            return { ...state, [action.form]: initialState[action.form] };
        }
        case INITIALIZE_ERROR_TYPE: {
            return { ...state, accountError: '' };
        }
        case CHANGE_FIELD_TYPE: {
            return { ...state, [action.form]: { ...state[action.form], [action.name]: action.value } };
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
            return { ...state, myPlannerList: action.payload.data };
        }
        case ACCOUNT_LIKE_PLANNER_LIST_LOAD_SUECCESS_TYPE: {
            return { ...state, likeList: { ...state.likeList, likePlannerList: action.payload.data } };
        }
        case ACCOUNT_LIKE_SPOT_LIST_LOAD_SUECCESS_TYPE: {
            return { ...state, likeList: { ...state.likeList, likeSpotList: action.payload.data } };
        }
        case ACCOUNT_LOAD_FAILURE_TYPE: {
            return { ...state, accountError: action.payload.data };
        }
        case ACCOUNT_UPDATE_FAILURE_TYPE:
        case ACCOUNT_IMAGE_UPDATE_FAILURE_TYPE:
        case ACCOUNT_MY_PLANNER_LIST_LOAD_FAILURE_TYPE:
        case ACCOUNT_LIKE_PLANNER_LIST_LOAD_FAILURE_TYPE:
        case ACCOUNT_ID_FIND_FAILURE_TYPE:
        case ACCOUNT_PASSWORD_FIND_FAILURE_TYPE:
        case ACCOUNT_PASSWORD_CHANGE_FAILURE_TYPE:
        case ACCOUNT_LIKE_SPOT_LIST_LOAD_FAILURE_TYPE: {
            return { ...state, accountUpdate: false, accountError: action.payload.message };
        }
        case RESET_LIKE_SPOT_LIST_TYPE:
            return {
                ...state,
                likeList: {
                    ...state.likeList,
                    likeSpotList: {},
                },
            };
        case RESET_MY_PLANNER_LIST_TYPE:
            return {
                ...state,
                myPlannerList: {},
            };
        case RESET_ACCOUNT_ERROR_TYPE:
            return {
                ...state,
                accountError: null,
            };
        case ACCOUNT_ID_FIND_SUCCESS_TYPE:
            return {
                ...state,
            };
        case ACCOUNT_PASSWORD_FIND_SUCCESS_TYPE:
            return {
                ...state,
                findPw: {
                    ...state.findPw,
                },
                pwFinding: true,
            };
        case ACCOUNT_PASSWORD_CHANGE_SUCCESS_TYPE:
            return {
                ...state,
                changePw: {
                    ...state.changePw,
                },
                pwChanging: true,
            };
        case VALIDATE_TYPE: {
            return { ...state, accountError: { ...action.validState } };
        }
        default: {
            return state;
        }
    }
}

export default accountReducer;
