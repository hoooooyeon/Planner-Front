import * as plannerAPI from '../lib/api/plannerAPI';
import { takeLatest } from 'redux-saga/effects';
import createSaga from '../lib/createSaga';

const LOAD_SHARE_PLANNER_LIST_TYPE = 'planner/LOAD_SHARE_PLANNER_LIST';
const LOAD_SHARE_PLANNER_LIST_SUCCESS_TYPE = 'planner/LOAD_SHARE_PLANNER_LIST_SUCCESS';
const LOAD_SHARE_PLANNER_LIST_FAILURE_TYPE = 'planner/LOAD_SHARE_PLANNER_LIST_FAILURE';

const LOAD_PLANNER_TYPE = 'planner/LOAD_PLANNER';
const LOAD_PLANNER_SUCCESS_TYPE = 'planner/LOAD_PLANNER_SUCCESS';
const LOAD_PLANNER_FAILURE_TYPE = 'planner/LOAD_PLANNER_FAILURE';

const CREATE_PLANNER_TYPE = 'planner/CREATE_PLANNER';
const CREATE_PLANNER_SUCCESS_TYPE = 'planner/CREATE_PLANNER_SUCCESS';
const CREATE_PLANNER_FAILURE_TYPE = 'planner/CREATE_PLANNER_FAILURE';

const CHANGE_PLANNER_TITLE_TYPE = 'planner/CHANGE_PLANNER_TITLE';
const CHANGE_PLANNER_DATE_START_TYPE = 'planner/CHANGE_PLANNER_DATE_START';
const CHANGE_PLANNER_DATE_END_TYPE = 'planner/CHANGE_PLANNER_DATE_END';

const UPDATE_PLANNER_ACCOUNT_TYPE = 'planner/UPDATE_PLANNER_ACCOUNTE';

const RESET_PLANNER_INFO_FORM_TYPE = 'planner/RESET_PLANNER_INFO_FORM';

const DELETE_PLANNER_TYPE = 'planner/DELETE_PLANNER';
const DELETE_PLANNER_SUCCESS_TYPE = 'planner/DELETE_PLANNER_SUCCESS';
const DELETE_PLANNER_FAILURE_TYPE = 'planner/DELETE_PLANNER_FAILURE';

const CREATE_MEMO_TYPE = 'planner/CREATE_MEMO';
const CREATE_MEMO_SUCCESS_TYPE = 'planner/CREATE_MEMO_SUCCESS';
const CREATE_MEMO_FAILURE_TYPE = 'planner/CREATE_MEMO_FAILURE';

const UPDATE_MEMO_TYPE = 'planner/UPDATE_MEMO';
const UPDATE_MEMO_SUCCESS_TYPE = 'planner/UPDATE_MEMO_SUCCESS';
const UPDATE_MEMO_FAILURE_TYPE = 'planner/UPDATE_MEMO_FAILURE';

const DELETE_MEMO_TYPE = 'planner/DELETE_MEMO';
const DELETE_MEMO_SUCCESS_TYPE = 'planner/DELETE_MEMO_SUCCESS';
const DELETE_MEMO_FAILURE_TYPE = 'planner/DELETE_MEMO_FAILURE';

const CHANGE_MEMO_TITLE_TYPE = 'planner/CHANGE_MEMO_TITLE';
const CHANGE_MEMO_CONTENT_TYPE = 'planner/CHANGE_CONTENT_TITLE';

export const createPlannerAction = ({ accountId, creator, title, planDateStart, planDateEnd, planMembers }) => ({ type: CREATE_PLANNER_TYPE, accountId, creator, title, planDateStart, planDateEnd, planMembers });
export const loadSharePlannerListAction = () => ({ type: LOAD_SHARE_PLANNER_LIST_TYPE });
export const loadPlannerAction = (plannerId) => ({ type: LOAD_PLANNER_TYPE, plannerId });
export const changePlannerTitleAction = (title) => ({ type: CHANGE_PLANNER_TITLE_TYPE, title });
export const changePlannerDateStartAction = (date) => ({ type: CHANGE_PLANNER_DATE_START_TYPE, date });
export const changePlannerDateEndAction = (date) => ({ type: CHANGE_PLANNER_DATE_END_TYPE, date });
export const updatePlannerAccountAction = (accountId, nickname) => ({ type: UPDATE_PLANNER_ACCOUNT_TYPE, accountId, nickname });
export const resetPlannerInfoFormAction = () => ({ type: RESET_PLANNER_INFO_FORM_TYPE });
export const deletePlannerAction = (plannerId) => ({ type: DELETE_PLANNER_TYPE, plannerId });
export const createMemoAction = ({ plannerId, title, content }) => ({ type: CREATE_MEMO_TYPE, plannerId, title, content });
export const updateMemoAction = ({ plannerId, memoId, title, content }) => ({ type: UPDATE_MEMO_TYPE, plannerId, memoId, title, content });
export const deleteMemoAction = ({ plannerId, memoId }) => ({ type: DELETE_MEMO_TYPE, plannerId, memoId });
export const changeMemoTitleAction = (title) => ({ type: CHANGE_MEMO_TITLE_TYPE, title });
export const changeMemoContentAction = (content) => ({ type: CHANGE_MEMO_CONTENT_TYPE, content });

const createPlannerSaga = createSaga(CREATE_PLANNER_TYPE, plannerAPI.createPlanner);
const loadSharePlannerListSaga = createSaga(LOAD_SHARE_PLANNER_LIST_TYPE, plannerAPI.loadSharePlannerList);
const loadPlannerSaga = createSaga(LOAD_PLANNER_TYPE, plannerAPI.loadPlanner);
const deletePlannerSaga = createSaga(DELETE_PLANNER_TYPE, plannerAPI.deletePlanner);
const createMemoSaga = createSaga(CREATE_MEMO_TYPE, plannerAPI.createMemo);
const updateMemoSaga = createSaga(UPDATE_MEMO_TYPE, plannerAPI.updateMemo);
const deleteMemoSaga = createSaga(DELETE_MEMO_TYPE, plannerAPI.deleteMemo);

export function* plannerSaga() {
    yield takeLatest(CREATE_PLANNER_TYPE, createPlannerSaga);
    yield takeLatest(LOAD_SHARE_PLANNER_LIST_TYPE, loadSharePlannerListSaga);
    yield takeLatest(LOAD_PLANNER_TYPE, loadPlannerSaga);
    yield takeLatest(DELETE_PLANNER_TYPE, deletePlannerSaga);
    yield takeLatest(CREATE_MEMO_TYPE, createMemoSaga);
    yield takeLatest(UPDATE_MEMO_TYPE, updateMemoSaga);
    yield takeLatest(DELETE_MEMO_TYPE, deleteMemoSaga);
}

const initialState = {
    myPlanners: null,
    sharePlanners: null,
    planner: null,
    plannerError: null,
    memos: null,
    memo: null,
};

function plannerReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SHARE_PLANNER_LIST_SUCCESS_TYPE:
            return {
                ...state,
                sharePlanners: action.payload.data,
            };
        case LOAD_SHARE_PLANNER_LIST_FAILURE_TYPE:
            return {
                ...state,
                plannerError: action.payload.error,
            };
        case LOAD_PLANNER_SUCCESS_TYPE:
            return {
                ...state,
                planner: action.payload.data,
            };
        case LOAD_PLANNER_FAILURE_TYPE:
            return {
                ...state,
                planner: action.payload.error,
            };
        case CREATE_PLANNER_SUCCESS_TYPE:
            return {
                ...state,
            };
        case CREATE_PLANNER_FAILURE_TYPE:
            return {
                ...state,
                plannerError: action.payload.error,
            };
        case CHANGE_PLANNER_TITLE_TYPE:
            return {
                ...state,
                planner: {
                    ...state.planner,
                    title: action.title,
                },
            };
        case CHANGE_PLANNER_DATE_START_TYPE:
            return {
                ...state,
                planner: {
                    ...state.planner,
                    planDateStart: action.date,
                },
            };
        case CHANGE_PLANNER_DATE_END_TYPE:
            return {
                ...state,
                planner: {
                    ...state.planner,
                    planDateEnd: action.date,
                },
            };
        case UPDATE_PLANNER_ACCOUNT_TYPE:
            return {
                ...state,
                planner: {
                    accountId: action.accountId,
                    creator: action.nickname,
                },
            };
        case RESET_PLANNER_INFO_FORM_TYPE:
            return {
                ...state,
                planner: {
                    accountId: state.planner.accountId,
                    creator: state.planner.creator,
                    title: null,
                    planDateStart: null,
                    planDateEnd: null,
                    planMembers: [],
                },
            };
        case DELETE_PLANNER_SUCCESS_TYPE:
            return {
                ...state,
            };
        case DELETE_PLANNER_FAILURE_TYPE:
            return {
                ...state,
                plannerError: action.payload.error,
            };
        case CREATE_MEMO_SUCCESS_TYPE:
            return {
                ...state,
            };
        case CREATE_MEMO_FAILURE_TYPE:
            return {
                ...state,
                plannerError: action.payload.error,
            };
        case UPDATE_MEMO_SUCCESS_TYPE:
            return {
                ...state,
            };
        case UPDATE_MEMO_FAILURE_TYPE:
            return {
                ...state,
                plannerError: action.payload.error,
            };
        case DELETE_MEMO_SUCCESS_TYPE:
            return {
                ...state,
            };
        case DELETE_MEMO_FAILURE_TYPE:
            return {
                ...state,
                plannerError: action.payload.error,
            };
        case CHANGE_MEMO_TITLE_TYPE:
            return {
                ...state,
                memo: {
                    ...state.memo,
                    title: action.title,
                },
            };
        case CHANGE_MEMO_CONTENT_TYPE:
            return {
                ...state,
                memo: {
                    ...state.memo,
                    content: action.content,
                },
            };
        default:
            return state;
    }
}

export default plannerReducer;
