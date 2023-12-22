import createSaga from '../lib/createSaga';
import { takeLatest } from 'redux-saga/effects';
import * as accountAPI from '../lib/api/accountAPI';

// 액션 타입
const INITIALIZE_TYPE = 'account/INITIALIZE';
const INITIALIZE_FORM_TYPE = 'account/INITIALIZE_FORM';
const INITIALIZE_ERROR_TYPE = 'account/INITIALIZERROR';
const CHANGE_FIELD_TYPE = 'account/CHANGE_FIELD';
const VALIDATE_TYPE = 'account/VALIDATE';
const CODE_TIMER_END_TYPE = 'account/CODE_TIMER_END';

export const ACCOUNT_LOAD_TYPE = 'account/ACCOUNT_LOAD';
const ACCOUNT_LOAD_SUCCESS_TYPE = 'account/ACCOUNT_LOAD_SUCCESS';
const ACCOUNT_LOAD_FAILURE_TYPE = 'account/ACCOUNT_LOAD_FAILURE';

export const ACCOUNT_UPDATE_TYPE = 'account/ACCOUNT_UPDATE';
const ACCOUNT_UPDATE_SUCCESS_TYPE = 'account/ACCOUNT_UPDATE_SUCCESS';
const ACCOUNT_UPDATE_FAILURE_TYPE = 'account/ACCOUNT_UPDATE_FAILURE';

export const ACCOUNT_IMAGE_UPDATE_TYPE = 'account/ACCOUNT_IMAGE_UPDATE';
const ACCOUNT_IMAGE_UPDATE_SUCCESS_TYPE = 'account/ACCOUNT_IMAGE_UPDATE_SUCCESS';
const ACCOUNT_IMAGE_UPDATE_FAILURE_TYPE = 'account/ACCOUNT_IMAGE_UPDATE_FAILURE';

export const ACCOUNT_MY_PLANNER_LIST_LOAD_TYPE = 'account/ACCOUNT_MY_PLANNER_LIST_LOAD';
const ACCOUNT_MY_PLANNER_LIST_LOAD_SUCCESS_TYPE = 'account/ACCOUNT_MY_PLANNER_LIST_LOAD_SUCCESS';
const ACCOUNT_MY_PLANNER_LIST_LOAD_FAILURE_TYPE = 'account/ACCOUNT_MY_PLANNER_LIST_LOAD_FAILURE';

export const ACCOUNT_LIKE_PLANNER_LIST_LOAD_TYPE = 'account/ACCOUNT_LIKE_PLANNER_LIST_LOAD';
const ACCOUNT_LIKE_PLANNER_LIST_LOAD_SUECCESS_TYPE = 'account/ACCOUNT_LIKE_PLANNER_LIST_LOAD_SUCCESS';
const ACCOUNT_LIKE_PLANNER_LIST_LOAD_FAILURE_TYPE = 'account/ACCOUNT_LIKE_PLANNER_LIST_LOAD_FAILURE';

export const ACCOUNT_LIKE_SPOT_LIST_LOAD_TYPE = 'account/ACCOUNT_LIKE_SPOT_LIST_LOAD';
const ACCOUNT_LIKE_SPOT_LIST_LOAD_SUECCESS_TYPE = 'account/ACCOUNT_LIKE_SPOT_LIST_LOAD_SUCCESS';
const ACCOUNT_LIKE_SPOT_LIST_LOAD_FAILURE_TYPE = 'account/ACCOUNT_LIKE_SPOT_LIST_LOAD_FAILURE';

export const ACCOUNT_NOTIFICATION_LOAD_TYPE = 'account/ACCOUNT_NOTIFICATION_LOAD';
const ACCOUNT_NOTIFICATION_LOAD_SUECCESS_TYPE = 'account/ACCOUNT_NOTIFICATION_LOAD_SUCCESS';
const ACCOUNT_NOTIFICATION_LOAD_FAILURE_TYPE = 'account/ACCOUNT_NOTIFICATION_LOAD_FAILURE';

const INITIALIZE_ID_FIND_REQUEST_TYPE = 'account/INITIALIZE_ID_FIND_REQUEST';

export const ACCOUNT_ID_FIND_CODE_REQUEST_TYPE = 'account/ACCOUNT_ID_FIND_CODE_REQUEST';
const ACCOUNT_ID_FIND_CODE_REQUEST_SUCCESS_TYPE = 'account/ACCOUNT_ID_FIND_CODE_REQUEST_SUCCESS';
const ACCOUNT_ID_FIND_CODE_REQUEST_FAILURE_TYPE = 'account/ACCOUNT_ID_FIND_CODE_REQUEST_FAILURE';

export const ACCOUNT_ID_FIND_TYPE = 'account/ACCOUNT_ID_FIND';
const ACCOUNT_ID_FIND_SUCCESS_TYPE = 'account/ACCOUNT_ID_FIND_SUCCESS';
const ACCOUNT_ID_FIND_FAILURE_TYPE = 'account/ACCOUNT_ID_FIND_FAILURE';

const INITIALIZE_PASSWORD_FIND_REQUEST_TYPE = 'account/INITIALIZE_PASSWORD_FIND_REQUEST';

export const ACCOUNT_PASSWORD_FIND_TYPE = 'account/ACCOUNT_PASSWORD_FIND';
const ACCOUNT_PASSWORD_FIND_SUCCESS_TYPE = 'account/ACCOUNT_PASSWORD_FIND_SUCCESS';
const ACCOUNT_PASSWORD_FIND_FAILURE_TYPE = 'account/ACCOUNT_PASSWORD_FIND_FAILURE';

const INITIALIZE_PASSWORD_UPDATE_REQUEST_TYPE = 'account/INITIALIZE_PASSWORD_UPDATE_REQUEST';

export const ACCOUNT_PASSWORD_CHANGE_TYPE = 'account/ACCOUNT_PASSWORD_CHANGE';
const ACCOUNT_PASSWORD_CHANGE_SUCCESS_TYPE = 'account/ACCOUNT_PASSWORD_CHANGE_SUCCESS';
const ACCOUNT_PASSWORD_CHANGE_FAILURE_TYPE = 'account/ACCOUNT_PASSWORD_CHANGE_FAILURE';

const CHANGE_MY_PLANNER_LIST_PAGE_INDEX_TYPE = 'account/CHANGE_MY_PLANNER_LIST_PAGE_INDEX';
const CHANGE_LIKE_LIST_PAGE_INDEX_TYPE = 'account/CHANGE_LIKE_LIST_PAGE_INDEX';

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

export const validateFieldAction = (validState) => ({
    type: VALIDATE_TYPE,
    validState,
});

export const codeTimerEndAction = (error) => ({
    type: CODE_TIMER_END_TYPE,
    error,
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

export const accountMyPlannerListLoadAction = ({ accountId, pageNum, itemCount, sortCriteria, areaCode, keyword }) => ({
    type: ACCOUNT_MY_PLANNER_LIST_LOAD_TYPE,
    accountId,
    pageNum,
    itemCount,
    sortCriteria,
    areaCode,
    keyword,
});

export const accountLikePlannerListLoadAction = ({
    accountId,
    itemCount,
    sortCriteria,
    keyword,
    postType,
    pageNum,
    areaCode,
}) => ({
    type: ACCOUNT_LIKE_PLANNER_LIST_LOAD_TYPE,
    accountId,
    itemCount,
    sortCriteria,
    keyword,
    postType,
    pageNum,
    areaCode,
});

export const accountLikeSpotListLoadAction = ({
    accountId,
    itemCount,
    sortCriteria,
    keyword,
    postType,
    pageNum,
    areaCode,
}) => ({
    type: ACCOUNT_LIKE_SPOT_LIST_LOAD_TYPE,
    accountId,
    itemCount,
    sortCriteria,
    keyword,
    postType,
    pageNum,
    areaCode,
});

export const accountNotificationLoadAction = (accountId) => ({
    type: ACCOUNT_NOTIFICATION_LOAD_TYPE,
    accountId,
});

export const initializeIdFindRequestAction = () => ({
    type: INITIALIZE_ID_FIND_REQUEST_TYPE,
});

export const accountIdFindCodeRequestAction = ({ username, phone }) => ({
    type: ACCOUNT_ID_FIND_CODE_REQUEST_TYPE,
    username,
    phone,
});

export const accountIdFindAction = ({ username, phone, code }) => ({
    type: ACCOUNT_ID_FIND_TYPE,
    username,
    phone,
    code,
});

export const initializePasswordFindRequestAction = () => ({
    type: INITIALIZE_PASSWORD_FIND_REQUEST_TYPE,
});

export const accountPasswordFindAction = ({ email }) => ({ type: ACCOUNT_PASSWORD_FIND_TYPE, email });

export const initializePasswordUpdateRequestAction = () => ({
    type: INITIALIZE_PASSWORD_UPDATE_REQUEST_TYPE,
});

export const accountPasswordChangeAction = ({ password, passwordConfirm, key }) => ({
    type: ACCOUNT_PASSWORD_CHANGE_TYPE,
    password,
    passwordConfirm,
    key,
});

export const changeMyPlannerListPageIndexAction = ({ index }) => ({
    type: CHANGE_MY_PLANNER_LIST_PAGE_INDEX_TYPE,
    index,
});
export const changeLikeLIstPageIndexAction = ({ form, index }) => ({
    type: CHANGE_LIKE_LIST_PAGE_INDEX_TYPE,
    form,
    index,
});

const accountLoad = createSaga(ACCOUNT_LOAD_TYPE, accountAPI.accountLoad);
const accountUpdate = createSaga(ACCOUNT_UPDATE_TYPE, accountAPI.accountUpdate);
const accountImageUpdate = createSaga(ACCOUNT_IMAGE_UPDATE_TYPE, accountAPI.accountImageUpdate);
const accountMyPlannerListLoad = createSaga(ACCOUNT_MY_PLANNER_LIST_LOAD_TYPE, accountAPI.accountMyPlannerListLoad);
const accountLikePlannerListLoad = createSaga(ACCOUNT_LIKE_PLANNER_LIST_LOAD_TYPE, accountAPI.accountLikeListLoad);
const accountLikeSpotListLoad = createSaga(ACCOUNT_LIKE_SPOT_LIST_LOAD_TYPE, accountAPI.accountLikeListLoad);
const accountNotificationLoad = createSaga(ACCOUNT_NOTIFICATION_LOAD_TYPE, accountAPI.accountNotificationLoad);
const accountIdFindCodeRequest = createSaga(ACCOUNT_ID_FIND_CODE_REQUEST_TYPE, accountAPI.accountIdFind);
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
    yield takeLatest(ACCOUNT_NOTIFICATION_LOAD_TYPE, accountNotificationLoad);
    yield takeLatest(ACCOUNT_ID_FIND_CODE_REQUEST_TYPE, accountIdFindCodeRequest);
    yield takeLatest(ACCOUNT_ID_FIND_TYPE, accountIdFind);
    yield takeLatest(ACCOUNT_PASSWORD_FIND_TYPE, accountPasswordFind);
    yield takeLatest(ACCOUNT_PASSWORD_CHANGE_TYPE, accountPasswordChange);
}

const initialState = {
    accountField: {
        nickname: '',
        phone: '',
    },
    idFindForm: {
        username: '',
        phone: '',
        code: '',
    },
    idFindList: null,
    codeRequest: false,
    idFindRequest: false,
    passwordFindForm: {
        email: '',
    },
    passwordFindRequest: false,
    passwordChangeForm: {
        password: '',
        passwordConfirm: '',
    },
    passwordChangeRequest: false,
    account: null,
    myPlannerList: {},
    likeList: {
        areaCode: '',
        likePlannerList: {},
        likeSpotList: {},
    },
    notifications: [],
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
            return { ...state, accountError: null };
        }
        case CHANGE_FIELD_TYPE: {
            return { ...state, [action.form]: { ...state[action.form], [action.name]: action.value } };
        }
        case VALIDATE_TYPE: {
            return { ...state, accountError: { ...action.validState } };
        }
        case CODE_TIMER_END_TYPE: {
            return { ...state, codeRequest: false, accountError: action.error };
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
        case ACCOUNT_NOTIFICATION_LOAD_SUECCESS_TYPE: {
            return { ...state, notifications: action.payload.data };
        }
        case INITIALIZE_ID_FIND_REQUEST_TYPE: {
            return { ...state, codeRequest: false, idFindRequest: false };
        }
        case ACCOUNT_ID_FIND_CODE_REQUEST_SUCCESS_TYPE: {
            return { ...state, codeRequest: true };
        }
        case ACCOUNT_ID_FIND_SUCCESS_TYPE: {
            return { ...state, idFindRequest: true, idFindList: action.payload.data };
        }
        case INITIALIZE_PASSWORD_FIND_REQUEST_TYPE: {
            return { ...state, passwordFindRequest: false };
        }
        case ACCOUNT_PASSWORD_FIND_SUCCESS_TYPE: {
            return { ...state, passwordFindRequest: true };
        }
        case INITIALIZE_PASSWORD_UPDATE_REQUEST_TYPE: {
            return { ...state, passwordChangeRequest: false };
        }
        case ACCOUNT_PASSWORD_CHANGE_SUCCESS_TYPE: {
            return { ...state, passwordChangeRequest: true };
        }
        case ACCOUNT_LOAD_FAILURE_TYPE: {
            return { ...state, accountError: action.payload.data };
        }
        case CHANGE_MY_PLANNER_LIST_PAGE_INDEX_TYPE: {
            return {
                ...state,
                myPlannerList: {
                    ...state.myPlannerList,
                    pageIndex: action.index,
                },
            };
        }
        case CHANGE_LIKE_LIST_PAGE_INDEX_TYPE: {
            return {
                ...state,
                likeList: {
                    ...state.likeList,
                    [action.form]: {
                        ...state.likeList[action.form],
                        pageIndex: action.index,
                    },
                },
            };
        }
        case ACCOUNT_UPDATE_FAILURE_TYPE:
        case ACCOUNT_IMAGE_UPDATE_FAILURE_TYPE:
        case ACCOUNT_MY_PLANNER_LIST_LOAD_FAILURE_TYPE:
        case ACCOUNT_LIKE_PLANNER_LIST_LOAD_FAILURE_TYPE:
        case ACCOUNT_ID_FIND_CODE_REQUEST_FAILURE_TYPE:
        case ACCOUNT_ID_FIND_FAILURE_TYPE:
        case ACCOUNT_PASSWORD_FIND_FAILURE_TYPE:
        case ACCOUNT_PASSWORD_CHANGE_FAILURE_TYPE:
        case ACCOUNT_LIKE_SPOT_LIST_LOAD_FAILURE_TYPE:
        case ACCOUNT_NOTIFICATION_LOAD_FAILURE_TYPE: {
            return { ...state, accountUpdate: false, accountError: action.payload.message };
        }
        default: {
            return state;
        }
    }
}

export default accountReducer;
