import * as plannerAPI from '../lib/api/plannerAPI';
import { takeLatest } from 'redux-saga/effects';
import createSaga from '../lib/createSaga';

// 공유 플래너 리스트 가져오기
const LOAD_SHARE_PLANNER_LIST_TYPE = 'planner/LOAD_SHARE_PLANNER_LIST';
const LOAD_SHARE_PLANNER_LIST_SUCCESS_TYPE = 'planner/LOAD_SHARE_PLANNER_LIST_SUCCESS';
const LOAD_SHARE_PLANNER_LIST_FAILURE_TYPE = 'planner/LOAD_SHARE_PLANNER_LIST_FAILURE';

// 플래너 정보 가져오기
const LOAD_PLANNER_TYPE = 'planner/LOAD_PLANNER';
const LOAD_PLANNER_SUCCESS_TYPE = 'planner/LOAD_PLANNER_SUCCESS';
const LOAD_PLANNER_FAILURE_TYPE = 'planner/LOAD_PLANNER_FAILURE';

// 플래너 생성하기
const CREATE_PLANNER_TYPE = 'planner/CREATE_PLANNER';
const CREATE_PLANNER_SUCCESS_TYPE = 'planner/CREATE_PLANNER_SUCCESS';
const CREATE_PLANNER_FAILURE_TYPE = 'planner/CREATE_PLANNER_FAILURE';

// 플래너 정보폼 변경하기
const UPDATE_PLANNER_TITLE_TYPE = 'planner/UPDATE_PLANNER_TITLE';
const UPDATE_PLANNER_DATE_START_TYPE = 'planner/UPDATE_PLANNER_DATE_START';
const UPDATE_PLANNER_DATE_END_TYPE = 'planner/UPDATE_PLANNER_DATE_END';
const UPDATE_PLANNER_ACCOUNT_TYPE = 'planner/UPDATE_PLANNER_ACCOUNTE';

// 플래너 정보폼 초기화(planner 초기화)
const RESET_PLANNER_INFO_FORM_TYPE = 'planner/RESET_PLANNER_INFO_FORM';

export const createPlannerAction = ({ accountId, creator, title, planDateStart, planDateEnd, planMembers }) => ({ type: CREATE_PLANNER_TYPE, accountId, creator, title, planDateStart, planDateEnd, planMembers });
export const loadSharePlannerListAction = () => ({ type: LOAD_SHARE_PLANNER_LIST_TYPE });
export const loadPlannerAction = (plannerId) => ({ type: LOAD_PLANNER_TYPE, plannerId });
export const updatePlannerTitleAction = (title) => ({ type: UPDATE_PLANNER_TITLE_TYPE, title });
export const updatePlannerDateStartAction = (date) => ({ type: UPDATE_PLANNER_DATE_START_TYPE, date });
export const updatePlannerDateEndAction = (date) => ({ type: UPDATE_PLANNER_DATE_END_TYPE, date });
export const updatePlannerAccountAction = (accountId, nickname) => ({ type: UPDATE_PLANNER_ACCOUNT_TYPE, accountId, nickname });
export const resetPlannerInfoFormAction = () => ({ type: RESET_PLANNER_INFO_FORM_TYPE });

const createPlannerSaga = createSaga(CREATE_PLANNER_TYPE, plannerAPI.createPlanner);
const loadSharePlannerListSaga = createSaga(LOAD_SHARE_PLANNER_LIST_TYPE, plannerAPI.loadSharePlannerList);
const loadPlannerSaga = createSaga(LOAD_PLANNER_TYPE, plannerAPI.loadPlanner);
export function* plannerSaga() {
    yield takeLatest(CREATE_PLANNER_TYPE, createPlannerSaga);
    yield takeLatest(LOAD_SHARE_PLANNER_LIST_TYPE, loadSharePlannerListSaga);
    yield takeLatest(LOAD_PLANNER_TYPE, loadPlannerSaga);
}

const initialState = {
    myPlanners: null,
    sharePlanners: null,
    planner: null,
    plannerError: null,
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
        case UPDATE_PLANNER_TITLE_TYPE:
            return {
                ...state,
                planner: {
                    ...state.planner,
                    title: action.title,
                },
            };
        case UPDATE_PLANNER_DATE_START_TYPE:
            return {
                ...state,
                planner: {
                    ...state.planner,
                    planDateStart: action.date,
                },
            };
        case UPDATE_PLANNER_DATE_END_TYPE:
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

        default:
            return state;
    }
}

export default plannerReducer;
