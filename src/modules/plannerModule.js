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

const UPDATE_PLANNER_TYPE = 'planner/UPDATE_PLANNER';
const UPDATE_PLANNER_SUCCESS_TYPE = 'planner/UPDATE_PLANNER_SUCCESS';
const UPDATE_PLANNER_FAILURE_TYPE = 'planner/UPDATE_PLANNER_FAILURE';

const CHANGE_PLANNER_TITLE_TYPE = 'planner/CHANGE_PLANNER_TITLE';
const CHANGE_PLANNER_DATE_START_TYPE = 'planner/CHANGE_PLANNER_DATE_START';
const CHANGE_PLANNER_DATE_END_TYPE = 'planner/CHANGE_PLANNER_DATE_END';
const CHANGE_PLANNER_ACCOUNT_TYPE = 'planner/CHANGE_PLANNER_ACCOUNT';
const CHANGE_PLANNER_EXPENSE_TYPE = 'planner/CHANGE_PLANNER_EXPENSE';
const CHANGE_PLANNER_MEMBER_COUNT_TYPE = 'planner/CHANGE_PLANNER_MEMBER_COUNT';
const CHANGE_PLANNER_MEMBER_CATEGORY_TYPE = 'planner/CHANGE_PLANNER_MEMBER_CATEGORY';

const RESET_PLANNER_INFO_FORM_TYPE = 'planner/RESET_PLANNER_INFO_FORM';
const TOGGLE_PLANNER_INFO_MODAL_TYPE = 'planner/TOGGLE_PLANNER_INFO_MODAL_TYPE';

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

const LOAD_MEMO_TYPE = 'planner/LOAD_MEMO';
const RESET_MEMO_TYPE = 'planner/RESET_MEMO';
const CHANGE_MEMO_TITLE_TYPE = 'planner/CHANGE_MEMO_TITLE';
const CHANGE_MEMO_CONTENT_TYPE = 'planner/CHANGE_CONTENT_TITLE';

const CREATE_PLAN_TYPE = 'planner/CREATE_PLAN';
const CREATE_PLAN_SUCCESS_TYPE = 'planner/CREATE_PLAN_SUCCESS';
const CREATE_PLAN_FAILURE_TYPE = 'planner/CREATE_PLAN_FAILURE';

const UPDATE_PLAN_TYPE = 'planner/UPDATE_PLAN';
const UPDATE_PLAN_SUCCESS_TYPE = 'planner/UPDATE_PLAN_SUCCESS';
const UPDATE_PLAN_FAILURE_TYPE = 'planner/UPDATE_PLAN_FAILURE';

const DELETE_PLAN_TYPE = 'planner/DELETE_PLAN';
const DELETE_PLAN_SUCCESS_TYPE = 'planner/DELETE_PLAN_SUCCESS';
const DELETE_PLAN_FAILURE_TYPE = 'planner/DELETE_PLAN_FAILURE';

const INVITE_MEMBER_TYPE = 'planner/INVITE_MEMBER';
const INVITE_MEMBER_SUCCESS_TYPE = 'planner/INVITE_MEMBER_SUCCESS';
const INVITE_MEMBER_FAILURE_TYPE = 'planner/INVITE_MEMBER_FAILURE';

const DELETE_MEMBER_TYPE = 'planner/DELETE_MEMBER';
const DELETE_MEMBER_SUCCESS_TYPE = 'planner/DELETE_MEMBER_SUCCESS';
const DELETE_MEMBER_FAILURE_TYPE = 'planner/DELETE_MEMBER_FAILURE';

const CHANGE_MEMBER_TYPE = 'planner/CHANGE_MEMBER';
const RESET_MEMBER_TYPE = 'planner/RESET_MEMBER';
const TOGGLE_MEMBER_MODAL_TYPE = 'planner/TOGGLE_MEMBER_MODAL_TYPE';

export const createPlannerAction = ({ accountId, creator, title, planDateStart, planDateEnd, planMembers, expense, memberCount, memberTypeId }) => ({
    type: CREATE_PLANNER_TYPE,
    accountId,
    creator,
    title,
    planDateStart,
    planDateEnd,
    planMembers,
    expense,
    memberCount,
    memberTypeId,
});
export const updatePlannerAction = ({ plannerId, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId }) => ({ type: UPDATE_PLANNER_TYPE, plannerId, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId });
export const loadSharePlannerListAction = () => ({ type: LOAD_SHARE_PLANNER_LIST_TYPE });
export const loadPlannerAction = (plannerId) => ({ type: LOAD_PLANNER_TYPE, plannerId });
export const changePlannerTitleAction = (title) => ({ type: CHANGE_PLANNER_TITLE_TYPE, title });
export const changePlannerDateStartAction = (date) => ({ type: CHANGE_PLANNER_DATE_START_TYPE, date });
export const changePlannerDateEndAction = (date) => ({ type: CHANGE_PLANNER_DATE_END_TYPE, date });
export const changePlannerAccountAction = (accountId, nickname) => ({ type: CHANGE_PLANNER_ACCOUNT_TYPE, accountId, nickname });
export const changePlannerExpenseAction = (expense) => ({ type: CHANGE_PLANNER_EXPENSE_TYPE, expense });
export const changePlannerMemberCountAction = (count) => ({ type: CHANGE_PLANNER_MEMBER_COUNT_TYPE, count });
export const changePlannerMemberCategoryAction = (memberTypeId) => ({ type: CHANGE_PLANNER_MEMBER_CATEGORY_TYPE, memberTypeId });
export const resetPlannerInfoFormAction = () => ({ type: RESET_PLANNER_INFO_FORM_TYPE });
export const deletePlannerAction = (plannerId) => ({ type: DELETE_PLANNER_TYPE, plannerId });
export const createMemoAction = ({ plannerId, title, content }) => ({ type: CREATE_MEMO_TYPE, plannerId, title, content });
export const updateMemoAction = ({ plannerId, memoId, title, content }) => ({ type: UPDATE_MEMO_TYPE, plannerId, memoId, title, content });
export const deleteMemoAction = ({ plannerId, memoId }) => ({ type: DELETE_MEMO_TYPE, plannerId, memoId });
export const loadMemoAction = (memo) => ({ type: LOAD_MEMO_TYPE, memo });
export const resetMemoAction = () => ({ type: RESET_MEMO_TYPE });
export const changeMemoTitleAction = (title) => ({ type: CHANGE_MEMO_TITLE_TYPE, title });
export const changeMemoContentAction = (content) => ({ type: CHANGE_MEMO_CONTENT_TYPE, content });
export const createPlanAction = ({ plannerId, planDate, planLocations }) => ({ type: CREATE_PLAN_TYPE, plannerId, planDate, planLocations });
export const updatePlanAction = ({ planId, plannerId, planDate, planLocations }) => ({ type: UPDATE_PLAN_TYPE, plannerId, planDate, planLocations, planId });
export const deletePlanAction = ({ plannerId, planId }) => ({ type: DELETE_PLAN_TYPE, plannerId, planId });
export const inviteMemberAction = ({ plannerId, members }) => ({ type: INVITE_MEMBER_TYPE, plannerId, members });
export const deleteMemberAction = ({ plannerId, nickName }) => ({ type: DELETE_MEMBER_TYPE, plannerId, nickName });
export const changeMemberAction = (members) => ({ type: CHANGE_MEMBER_TYPE, members });
export const resetMemberAction = () => ({ type: RESET_MEMBER_TYPE });
export const toggleMemberModalAction = () => ({ type: TOGGLE_MEMBER_MODAL_TYPE });
export const togglePlannerInfoModalAction = () => ({ type: TOGGLE_PLANNER_INFO_MODAL_TYPE });

const createPlannerSaga = createSaga(CREATE_PLANNER_TYPE, plannerAPI.createPlanner);
const updatePlannerSaga = createSaga(UPDATE_PLANNER_TYPE, plannerAPI.updatePlanner);
const loadSharePlannerListSaga = createSaga(LOAD_SHARE_PLANNER_LIST_TYPE, plannerAPI.loadSharePlannerList);
const loadPlannerSaga = createSaga(LOAD_PLANNER_TYPE, plannerAPI.loadPlanner);
const deletePlannerSaga = createSaga(DELETE_PLANNER_TYPE, plannerAPI.deletePlanner);
const createMemoSaga = createSaga(CREATE_MEMO_TYPE, plannerAPI.createMemo);
const updateMemoSaga = createSaga(UPDATE_MEMO_TYPE, plannerAPI.updateMemo);
const deleteMemoSaga = createSaga(DELETE_MEMO_TYPE, plannerAPI.deleteMemo);
const createPlanSaga = createSaga(CREATE_PLAN_TYPE, plannerAPI.createPlan);
const updatePlanSaga = createSaga(UPDATE_PLAN_TYPE, plannerAPI.updatePlan);
const deletePlanSaga = createSaga(DELETE_PLAN_TYPE, plannerAPI.deletePlan);
const inviteMemberSaga = createSaga(INVITE_MEMBER_TYPE, plannerAPI.inviteMember);
const deleteMemberSaga = createSaga(DELETE_MEMBER_TYPE, plannerAPI.deleteMember);

export function* plannerSaga() {
    yield takeLatest(CREATE_PLANNER_TYPE, createPlannerSaga);
    yield takeLatest(UPDATE_PLANNER_TYPE, updatePlannerSaga);
    yield takeLatest(LOAD_SHARE_PLANNER_LIST_TYPE, loadSharePlannerListSaga);
    yield takeLatest(LOAD_PLANNER_TYPE, loadPlannerSaga);
    yield takeLatest(DELETE_PLANNER_TYPE, deletePlannerSaga);
    yield takeLatest(CREATE_MEMO_TYPE, createMemoSaga);
    yield takeLatest(UPDATE_MEMO_TYPE, updateMemoSaga);
    yield takeLatest(DELETE_MEMO_TYPE, deleteMemoSaga);
    yield takeLatest(CREATE_PLAN_TYPE, createPlanSaga);
    yield takeLatest(UPDATE_PLAN_TYPE, updatePlanSaga);
    yield takeLatest(DELETE_PLAN_TYPE, deletePlanSaga);
    yield takeLatest(INVITE_MEMBER_TYPE, inviteMemberSaga);
    yield takeLatest(DELETE_MEMBER_TYPE, deleteMemberSaga);
}

const initialState = {
    myPlanners: null,
    sharePlanners: null,
    planner: null,
    plannerError: null,
    plan: null,
    curMemo: {
        title: '',
        content: '',
    },
    members: [],
    modal: {
        member: false,
        plannerInfo: false,
    },
    spots: [
        {
            title: '가회동성당',
            contentid: '2733967',
            contenttypeid: '12',
            firstimage: 'http://tong.visitkorea.or.kr/cms/resource/61/2780561_image2_1.png',
            firstimage2: 'http://tong.visitkorea.or.kr/cms/resource/61/2780561_image2_1.png',
            mapx: '126.9846616856',
            mapy: '37.5820858828',
        },
        {
            title: '간데메공원',
            contentid: '2763807',
            contenttypeid: '12',
            firstimage: '',
            firstimage2: '',
            mapx: '127.0490977427',
            mapy: '37.5728520032',
        },
        {
            title: '갈산근린공원',
            contentid: '1116925',
            contenttypeid: '12',
            firstimage: 'http://tong.visitkorea.or.kr/cms/resource/62/2612062_image2_1.bmp',
            firstimage2: 'http://tong.visitkorea.or.kr/cms/resource/62/2612062_image2_1.bmp',
            mapx: '126.8684105358',
            mapy: '37.5061176314',
        },
    ],
};
const letsFormat = (d) => {
    const date = new Date(d);
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
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
        case UPDATE_PLANNER_SUCCESS_TYPE:
            return {
                ...state,
            };
        case UPDATE_PLANNER_FAILURE_TYPE:
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
                    planDateStart: letsFormat(action.date),
                },
            };
        case CHANGE_PLANNER_DATE_END_TYPE:
            return {
                ...state,
                planner: {
                    ...state.planner,
                    planDateEnd: letsFormat(action.date),
                },
            };
        case CHANGE_PLANNER_EXPENSE_TYPE:
            return {
                ...state,
                planner: {
                    ...state.planner,
                    expense: action.expense,
                },
            };
        case CHANGE_PLANNER_MEMBER_COUNT_TYPE:
            return {
                ...state,
                planner: {
                    ...state.planner,
                    memberCount: action.count,
                },
            };
        case CHANGE_PLANNER_MEMBER_CATEGORY_TYPE:
            return {
                ...state,
                planner: {
                    ...state.planner,
                    memberTypeId: action.memberTypeId,
                },
            };
        case CHANGE_PLANNER_ACCOUNT_TYPE:
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
                    title: '',
                    planDateStart: letsFormat(new Date()),
                    planDateEnd: letsFormat(new Date()),
                    planMembers: [],
                    expense: 0,
                    memberCount: 1,
                    memberTypeId: 1,
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
        case LOAD_MEMO_TYPE:
            return {
                ...state,
                curMemo: {
                    memoId: action.memo.memoId,
                    title: action.memo.title,
                    content: action.memo.content,
                },
            };
        case RESET_MEMO_TYPE:
            return {
                ...state,
                curMemo: {
                    title: '',
                    content: '',
                },
            };
        case CHANGE_MEMO_TITLE_TYPE:
            return {
                ...state,
                curMemo: {
                    ...state.curMemo,
                    title: action.title,
                },
            };
        case CHANGE_MEMO_CONTENT_TYPE:
            return {
                ...state,
                curMemo: {
                    ...state.curMemo,
                    content: action.content,
                },
            };
        case CREATE_PLAN_SUCCESS_TYPE:
            return {
                ...state,
            };
        case CREATE_PLAN_FAILURE_TYPE:
            return {
                ...state,
                plannerError: action.payload.error,
            };
        case UPDATE_PLAN_SUCCESS_TYPE:
            return {
                ...state,
            };
        case UPDATE_PLAN_FAILURE_TYPE:
            return {
                ...state,
                plannerError: action.payload.error,
            };
        case DELETE_PLAN_SUCCESS_TYPE:
            return {
                ...state,
            };
        case DELETE_PLAN_FAILURE_TYPE:
            return {
                ...state,
                plannerError: action.payload.error,
            };
        case INVITE_MEMBER_SUCCESS_TYPE:
            return {
                ...state,
            };
        case INVITE_MEMBER_FAILURE_TYPE:
            return {
                ...state,
                plannerError: action.payload.error,
            };
        case DELETE_MEMBER_SUCCESS_TYPE:
            return {
                ...state,
            };
        case DELETE_MEMBER_FAILURE_TYPE:
            console.log(action.nickName);
            return {
                ...state,
                plannerError: action.payload.error,
            };
        case CHANGE_MEMBER_TYPE:
            return {
                ...state,
                members: [action.members],
            };
        case RESET_MEMBER_TYPE:
            return {
                ...state,
                members: [],
            };
        case TOGGLE_MEMBER_MODAL_TYPE:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    member: !state.modal.member,
                },
            };
        case TOGGLE_PLANNER_INFO_MODAL_TYPE:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    plannerInfo: !state.modal.plannerInfo,
                },
            };
        default:
            return state;
    }
}

export default plannerReducer;
