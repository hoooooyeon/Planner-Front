import * as plannerAPI from '../lib/api/plannerAPI';
import { takeLatest, takeEvery } from 'redux-saga/effects';
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

const RESET_PLANNER_DATA_TYPE = 'planner/RESET_PLANNER_DATA';
const TOGGLE_PLANNER_INFO_MODAL_TYPE = 'planner/TOGGLE_PLANNER_INFO_MODAL_TYPE';

const DELETE_PLANNER_TYPE = 'planner/DELETE_PLANNER';
const DELETE_PLANNER_SUCCESS_TYPE = 'planner/DELETE_PLANNER_SUCCESS';
const DELETE_PLANNER_FAILURE_TYPE = 'planner/DELETE_PLANNER_FAILURE';

const TOGGLE_LIKE_PLANNER_TYPE = 'planner/TOGGLE_LIKE_PLANNER';
const TOGGLE_LIKE_PLANNER_SUCCESS_TYPE = 'planner/TOGGLE_LIKE_PLANNER_SUCCESS';
const TOGGLE_LIKE_PLANNER_FAILURE_TYPE = 'planner/TOGGLE_LIKE_PLANNER_FAILURE';

const CREATE_MEMO_TYPE = 'planner/CREATE_MEMO';
const CREATE_MEMO_SUCCESS_TYPE = 'planner/CREATE_MEMO_SUCCESS';
const CREATE_MEMO_FAILURE_TYPE = 'planner/CREATE_MEMO_FAILURE';

const UPDATE_MEMO_TYPE = 'planner/UPDATE_MEMO';
const UPDATE_MEMO_SUCCESS_TYPE = 'planner/UPDATE_MEMO_SUCCESS';
const UPDATE_MEMO_FAILURE_TYPE = 'planner/UPDATE_MEMO_FAILURE';

const DELETE_MEMO_TYPE = 'planner/DELETE_MEMO';
const DELETE_MEMO_SUCCESS_TYPE = 'planner/DELETE_MEMO_SUCCESS';
const DELETE_MEMO_FAILURE_TYPE = 'planner/DELETE_MEMO_FAILURE';

const TOGGLE_MEMO_MODAL_TYPE = 'planner/TOGGLE_MEMO_MODAL';

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

const TOGGLE_MEMBER_MODAL_TYPE = 'planner/TOGGLE_MEMBER_MODAL_TYPE';

const CREATE_LOCATION_TYPE = 'planner/CREATE_LOCATION';
const CREATE_LOCATION_SUCCESS_TYPE = 'planner/CREATE_LOCATION_SUCCESS';
const CREATE_LOCATION_FAILURE_TYPE = 'planner/CREATE_LOCATION_FAILURE';

const UPDATE_LOCATION_TYPE = 'planner/UPDATE_LOCATION';
const UPDATE_LOCATION_SUCCESS_TYPE = 'planner/UPDATE_LOCATION_SUCCESS';
const UPDATE_LOCATION_FAILURE_TYPE = 'planner/UPDATE_LOCATION_FAILURE';

const DELETE_LOCATION_TYPE = 'planner/DELETE_LOCATION';
const DELETE_LOCATION_SUCCESS_TYPE = 'planner/DELETE_LOCATION_SUCCESS';
const DELETE_LOCATION_FAILURE_TYPE = 'planner/DELETE_LOCATION_FAILURE';

const CHANGE_CUR_PLAN_ID_TYPE = 'planner/CHANGE_CUR_PLAN_ID';
const CHANGE_CUR_PLANNER_ID_TYPE = 'planner/CHANGE_CUR_PLANNER_ID';
const CHANGE_CUR_MEMO_ID_TYPE = 'planner/CHANGE_CUR_MEMO_ID';

const CHANGE_PAGE_NUM_TYPE = 'planner/CHANGE_PAGE_NUM';

const CHANGE_KEYWORD_TYPE = 'planner/CHANGE_KEYWORD';
const CHANGE_RESULT_KEYWORD_TYPE = 'planner/CHANGE_RESULT_KEYWORD';

const CHANGE_ALL_SCHEDULE_TYPE = 'planner/CHANGE_ALL_SCHEDULE';
const RESET_SHARE_PLANNER_LIST_TYPE = 'planner/RESET_SHARE_PLANNER_LIST';

const RESET_PLANNER_ERROR_TYPE = 'planner/RESET_PLANNER_ERROR';

export const createPlannerAction = ({
    accountId,
    creator,
    title,
    planDateStart,
    planDateEnd,
    planMembers,
    expense,
    memberCount,
    memberTypeId,
}) => ({
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
export const updatePlannerAction = ({
    plannerId,
    title,
    planDateStart,
    planDateEnd,
    expense,
    memberCount,
    memberTypeId,
}) => ({ type: UPDATE_PLANNER_TYPE, plannerId, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId });
export const loadSharePlannerListAction = ({ itemCount, sortCriteria, keyword, pageNum }) => ({
    type: LOAD_SHARE_PLANNER_LIST_TYPE,
    itemCount,
    sortCriteria,
    keyword,
    pageNum,
});
export const loadPlannerAction = (plannerId) => ({ type: LOAD_PLANNER_TYPE, plannerId });
export const resetPlannerDataAction = () => ({ type: RESET_PLANNER_DATA_TYPE });
export const deletePlannerAction = (plannerId) => ({ type: DELETE_PLANNER_TYPE, plannerId });
export const toggleLikePlannerAction = (plannerId) => ({ type: TOGGLE_LIKE_PLANNER_TYPE, plannerId });
export const createMemoAction = ({ plannerId, title, content }) => ({
    type: CREATE_MEMO_TYPE,
    plannerId,
    title,
    content,
});
export const updateMemoAction = ({ plannerId, memoId, title, content }) => ({
    type: UPDATE_MEMO_TYPE,
    plannerId,
    memoId,
    title,
    content,
});
export const deleteMemoAction = ({ plannerId, memoId }) => ({ type: DELETE_MEMO_TYPE, plannerId, memoId });
export const createPlanAction = ({ plannerId, planDate }) => ({ type: CREATE_PLAN_TYPE, plannerId, planDate });
export const updatePlanAction = ({ planId, plannerId, planDate, index }) => ({
    type: UPDATE_PLAN_TYPE,
    plannerId,
    planDate,
    planId,
    index,
});
export const deletePlanAction = ({ plannerId, planId }) => ({ type: DELETE_PLAN_TYPE, plannerId, planId });
export const inviteMemberAction = ({ plannerId, members }) => ({ type: INVITE_MEMBER_TYPE, plannerId, members });
export const deleteMemberAction = ({ plannerId, nickName }) => ({ type: DELETE_MEMBER_TYPE, plannerId, nickName });
export const toggleMemberModalAction = () => ({ type: TOGGLE_MEMBER_MODAL_TYPE });
export const togglePlannerInfoModalAction = () => ({ type: TOGGLE_PLANNER_INFO_MODAL_TYPE });
export const createLocationAction = ({
    plannerId,
    locationName,
    locationContentId,
    locationImage,
    locationAddr,
    locationMapx,
    locationMapy,
    locationTransportation,
    planId,
}) => ({
    type: CREATE_LOCATION_TYPE,
    plannerId,
    locationName,
    locationContentId,
    locationImage,
    locationAddr,
    locationMapx,
    locationMapy,
    locationTransportation,
    planId,
});
export const updateLocationAction = ({
    plannerId,
    locationId,
    locationName,
    locationContentId,
    locationImage,
    locationAddr,
    locationMapx,
    locationMapy,
    locationTransportation,
    planId,
    index,
}) => ({
    type: UPDATE_LOCATION_TYPE,
    plannerId,
    locationId,
    locationName,
    locationContentId,
    locationImage,
    locationAddr,
    locationMapx,
    locationMapy,
    locationTransportation,
    planId,
    index,
});
export const deleteLocationAction = ({ plannerId, locationId, planId }) => ({
    type: DELETE_LOCATION_TYPE,
    plannerId,
    locationId,
    planId,
});
export const changeCurPlanIdAction = (planId) => ({ type: CHANGE_CUR_PLAN_ID_TYPE, planId });
export const changeCurPlannerIdAction = (plannerId) => ({ type: CHANGE_CUR_PLANNER_ID_TYPE, plannerId });
export const changeCurMemoIdAction = (memoId) => ({ type: CHANGE_CUR_MEMO_ID_TYPE, memoId });
export const changePageNumAction = (pageNum) => ({ type: CHANGE_PAGE_NUM_TYPE, pageNum });
export const changeKeywordAction = (keyword) => ({ type: CHANGE_KEYWORD_TYPE, keyword });
export const changeResultKeywordAction = (keyword) => ({ type: CHANGE_RESULT_KEYWORD_TYPE, keyword });
export const changeAllScheduleAction = (bool) => ({ type: CHANGE_ALL_SCHEDULE_TYPE, bool });
export const resetSharePlannerListAction = () => ({ type: RESET_SHARE_PLANNER_LIST_TYPE });
export const resetPlannerErrorAction = () => ({ type: RESET_PLANNER_ERROR_TYPE });
export const toggleMemoModalAction = () => ({ type: TOGGLE_MEMO_MODAL_TYPE });

const createPlannerSaga = createSaga(CREATE_PLANNER_TYPE, plannerAPI.createPlanner);
const updatePlannerSaga = createSaga(UPDATE_PLANNER_TYPE, plannerAPI.updatePlanner);
const loadSharePlannerListSaga = createSaga(LOAD_SHARE_PLANNER_LIST_TYPE, plannerAPI.loadSharePlannerList);
const loadPlannerSaga = createSaga(LOAD_PLANNER_TYPE, plannerAPI.loadPlanner);
const deletePlannerSaga = createSaga(DELETE_PLANNER_TYPE, plannerAPI.deletePlanner);
const toggleLikePlannerSaga = createSaga(TOGGLE_LIKE_PLANNER_TYPE, plannerAPI.toggleLikePlanner);
const createMemoSaga = createSaga(CREATE_MEMO_TYPE, plannerAPI.createMemo);
const updateMemoSaga = createSaga(UPDATE_MEMO_TYPE, plannerAPI.updateMemo);
const deleteMemoSaga = createSaga(DELETE_MEMO_TYPE, plannerAPI.deleteMemo);
const createPlanSaga = createSaga(CREATE_PLAN_TYPE, plannerAPI.createPlan);
const updatePlanSaga = createSaga(UPDATE_PLAN_TYPE, plannerAPI.updatePlan);
const deletePlanSaga = createSaga(DELETE_PLAN_TYPE, plannerAPI.deletePlan);
const inviteMemberSaga = createSaga(INVITE_MEMBER_TYPE, plannerAPI.inviteMember);
const deleteMemberSaga = createSaga(DELETE_MEMBER_TYPE, plannerAPI.deleteMember);
const createLocationSaga = createSaga(CREATE_LOCATION_TYPE, plannerAPI.createLocation);
const updateLocationSaga = createSaga(UPDATE_LOCATION_TYPE, plannerAPI.updateLocation);
const deleteLocationSaga = createSaga(DELETE_LOCATION_TYPE, plannerAPI.deleteLocation);

export function* plannerSaga() {
    yield takeLatest(CREATE_PLANNER_TYPE, createPlannerSaga);
    yield takeLatest(UPDATE_PLANNER_TYPE, updatePlannerSaga);
    yield takeLatest(LOAD_SHARE_PLANNER_LIST_TYPE, loadSharePlannerListSaga);
    yield takeLatest(LOAD_PLANNER_TYPE, loadPlannerSaga);
    yield takeLatest(DELETE_PLANNER_TYPE, deletePlannerSaga);
    yield takeLatest(TOGGLE_LIKE_PLANNER_TYPE, toggleLikePlannerSaga);
    yield takeLatest(CREATE_MEMO_TYPE, createMemoSaga);
    yield takeLatest(UPDATE_MEMO_TYPE, updateMemoSaga);
    yield takeLatest(DELETE_MEMO_TYPE, deleteMemoSaga);
    yield takeLatest(CREATE_PLAN_TYPE, createPlanSaga);
    yield takeEvery(UPDATE_PLAN_TYPE, updatePlanSaga);
    yield takeLatest(DELETE_PLAN_TYPE, deletePlanSaga);
    yield takeLatest(INVITE_MEMBER_TYPE, inviteMemberSaga);
    yield takeLatest(DELETE_MEMBER_TYPE, deleteMemberSaga);
    yield takeLatest(CREATE_LOCATION_TYPE, createLocationSaga);
    yield takeLatest(UPDATE_LOCATION_TYPE, updateLocationSaga);
    yield takeLatest(DELETE_LOCATION_TYPE, deleteLocationSaga);
}

const initialState = {
    sharePlanners: {},
    planner: {},
    plannerError: null,
    isInvite: false,
    modal: {
        member: false,
        plannerInfo: false,
        memo: false,
    },
    plannerData: {
        plannerId: '',
        planId: '',
        memoId: '',
        pageNum: 1,
    },
    keyword: {
        curKeyword: '',
        resultKeyword: '',
    },
    pType: '',
    allSchedule: false,
};

function plannerReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SHARE_PLANNER_LIST_SUCCESS_TYPE:
            return {
                ...state,
                sharePlanners: action.payload.data,
            };
        case LOAD_PLANNER_FAILURE_TYPE:
            return {
                ...state,
                plannerError: action.payload.message,
                planner: false,
            };
        case INVITE_MEMBER_FAILURE_TYPE:
            return {
                ...state,
                plannerError: action.payload.message,
                isInvite: false,
            };
        case LOAD_SHARE_PLANNER_LIST_FAILURE_TYPE:
        case CREATE_PLANNER_FAILURE_TYPE:
        case UPDATE_PLANNER_FAILURE_TYPE:
        case DELETE_PLANNER_FAILURE_TYPE:
        case CREATE_MEMO_FAILURE_TYPE:
        case UPDATE_MEMO_FAILURE_TYPE:
        case DELETE_MEMO_FAILURE_TYPE:
        case CREATE_PLAN_FAILURE_TYPE:
        case UPDATE_PLAN_FAILURE_TYPE:
        case DELETE_PLAN_FAILURE_TYPE:
        case DELETE_MEMBER_FAILURE_TYPE:
        case CREATE_LOCATION_FAILURE_TYPE:
        case UPDATE_LOCATION_FAILURE_TYPE:
        case DELETE_LOCATION_FAILURE_TYPE:
        case TOGGLE_LIKE_PLANNER_FAILURE_TYPE:
            return {
                ...state,
                plannerError: action.payload.message,
            };
        case LOAD_PLANNER_SUCCESS_TYPE:
            return {
                ...state,
                planner: action.payload.data,
            };
        case CREATE_PLANNER_SUCCESS_TYPE:
            return {
                ...state,
                plannerData: {
                    ...state.plannerData,
                    plannerId: action.payload.data,
                },
                pType: 2,
            };
        case UPDATE_PLANNER_SUCCESS_TYPE:
            return {
                ...state,
                plannerData: {
                    ...state.plannerData,
                },
                modal: {
                    ...state.modal,
                    plannerInfo: false,
                },
            };
        case RESET_PLANNER_DATA_TYPE:
            return {
                ...state,
                plannerData: {
                    pageNum: 1,
                    plannerId: '',
                    planId: '',
                    memoId: '',
                },
                pType: '',
                planner: {},
            };
        case DELETE_PLANNER_SUCCESS_TYPE:
            return {
                ...state,
                plannerData: {
                    ...state.plannerData,
                },
            };
        case TOGGLE_LIKE_PLANNER_SUCCESS_TYPE:
            return {
                ...state,
                plannerData: {
                    ...state.plannerData,
                },
            };
        case CREATE_MEMO_SUCCESS_TYPE:
            return {
                ...state,
                plannerData: {
                    ...state.plannerData,
                    memoId: action.payload.data,
                },
                modal: {
                    ...state.modal,
                    memo: true,
                },
            };
        case UPDATE_MEMO_SUCCESS_TYPE:
            return {
                ...state,
                plannerData: {
                    ...state.plannerData,
                },
                modal: {
                    ...state.modal,
                    memo: false,
                },
            };
        case DELETE_MEMO_SUCCESS_TYPE:
            return {
                ...state,
                plannerData: {
                    ...state.plannerData,
                },
            };
        case CREATE_PLAN_SUCCESS_TYPE:
            return {
                ...state,
                plannerData: {
                    ...state.plannerData,
                    planId: action.payload.data,
                },
            };
        case UPDATE_PLAN_SUCCESS_TYPE:
            return {
                ...state,
                plannerData: {
                    ...state.plannerData,
                },
            };
        case DELETE_PLAN_SUCCESS_TYPE:
            return {
                ...state,
                plannerData: {
                    ...state.plannerData,
                },
            };

        case INVITE_MEMBER_SUCCESS_TYPE:
            return {
                ...state,
                plannerData: {
                    ...state.plannerData,
                },
                isInvite: true,
            };
        case DELETE_MEMBER_SUCCESS_TYPE:
            return {
                ...state,
                plannerData: {
                    ...state.plannerData,
                },
            };
        case TOGGLE_MEMBER_MODAL_TYPE:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    member: !state.modal.member,
                },
                isInvite: false,
            };
        case TOGGLE_PLANNER_INFO_MODAL_TYPE:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    plannerInfo: !state.modal.plannerInfo,
                },
            };
        case TOGGLE_MEMO_MODAL_TYPE:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    memo: !state.modal.memo,
                },
            };

        case CREATE_LOCATION_SUCCESS_TYPE:
            return {
                ...state,
                plannerData: {
                    ...state.plannerData,
                },
            };
        case UPDATE_LOCATION_SUCCESS_TYPE:
            return {
                ...state,
                plannerData: {
                    ...state.plannerData,
                },
            };
        case DELETE_LOCATION_SUCCESS_TYPE:
            return {
                ...state,
                plannerData: {
                    ...state.plannerData,
                },
            };
        case CHANGE_CUR_PLAN_ID_TYPE:
            return {
                ...state,
                plannerData: {
                    ...state.plannerData,
                    planId: action.planId,
                },
            };
        case CHANGE_CUR_PLANNER_ID_TYPE:
            return {
                ...state,
                plannerData: {
                    ...state.plannerData,
                    plannerId: action.plannerId,
                },
                pType: 1,
            };
        case CHANGE_CUR_MEMO_ID_TYPE:
            return {
                ...state,
                plannerData: {
                    ...state.plannerData,
                    memoId: action.memoId,
                },
            };
        case CHANGE_PAGE_NUM_TYPE:
            return {
                ...state,
                plannerData: {
                    ...state.plannerData,
                    pageNum: action.pageNum,
                },
            };
        case CHANGE_KEYWORD_TYPE:
            return {
                ...state,
                keyword: {
                    curKeyword: action.keyword,
                    resultKeyword: state.keyword.resultKeyword,
                },
            };
        case CHANGE_RESULT_KEYWORD_TYPE:
            return {
                ...state,
                keyword: {
                    curKeyword: state.keyword.curKeyword,
                    resultKeyword: action.keyword,
                },
            };
        case CHANGE_ALL_SCHEDULE_TYPE:
            return {
                ...state,
                allSchedule: action.bool,
            };
        case RESET_SHARE_PLANNER_LIST_TYPE:
            return {
                ...state,
                sharePlanners: {},
            };
        case RESET_PLANNER_ERROR_TYPE:
            return {
                ...state,
                plannerError: null,
            };
        default:
            return state;
    }
}

export default plannerReducer;
