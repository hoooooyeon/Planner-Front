import * as plannerAPI from '../lib/api/plannerAPI';
import { takeLatest, takeEvery } from 'redux-saga/effects';
import createSaga from '../lib/createSaga';

export const LOAD_SHARE_PLANNER_LIST_TYPE = 'planner/LOAD_SHARE_PLANNER_LIST';
const LOAD_SHARE_PLANNER_LIST_SUCCESS_TYPE = 'planner/LOAD_SHARE_PLANNER_LIST_SUCCESS';
const LOAD_SHARE_PLANNER_LIST_FAILURE_TYPE = 'planner/LOAD_SHARE_PLANNER_LIST_FAILURE';

export const LOAD_PLANNER_TYPE = 'planner/LOAD_PLANNER';
const LOAD_PLANNER_SUCCESS_TYPE = 'planner/LOAD_PLANNER_SUCCESS';
const LOAD_PLANNER_FAILURE_TYPE = 'planner/LOAD_PLANNER_FAILURE';

export const CREATE_PLANNER_TYPE = 'planner/CREATE_PLANNER';
const CREATE_PLANNER_SUCCESS_TYPE = 'planner/CREATE_PLANNER_SUCCESS';
const CREATE_PLANNER_FAILURE_TYPE = 'planner/CREATE_PLANNER_FAILURE';

export const UPDATE_PLANNER_TYPE = 'planner/UPDATE_PLANNER';
const UPDATE_PLANNER_SUCCESS_TYPE = 'planner/UPDATE_PLANNER_SUCCESS';
const UPDATE_PLANNER_FAILURE_TYPE = 'planner/UPDATE_PLANNER_FAILURE';

export const DELETE_PLANNER_TYPE = 'planner/DELETE_PLANNER';
const DELETE_PLANNER_SUCCESS_TYPE = 'planner/DELETE_PLANNER_SUCCESS';
const DELETE_PLANNER_FAILURE_TYPE = 'planner/DELETE_PLANNER_FAILURE';

export const TOGGLE_LIKE_PLANNER_TYPE = 'planner/TOGGLE_LIKE_PLANNER';
const TOGGLE_LIKE_PLANNER_SUCCESS_TYPE = 'planner/TOGGLE_LIKE_PLANNER_SUCCESS';
const TOGGLE_LIKE_PLANNER_FAILURE_TYPE = 'planner/TOGGLE_LIKE_PLANNER_FAILURE';

export const CREATE_MEMO_TYPE = 'planner/CREATE_MEMO';
const CREATE_MEMO_SUCCESS_TYPE = 'planner/CREATE_MEMO_SUCCESS';
const CREATE_MEMO_FAILURE_TYPE = 'planner/CREATE_MEMO_FAILURE';

export const UPDATE_MEMO_TYPE = 'planner/UPDATE_MEMO';
const UPDATE_MEMO_SUCCESS_TYPE = 'planner/UPDATE_MEMO_SUCCESS';
const UPDATE_MEMO_FAILURE_TYPE = 'planner/UPDATE_MEMO_FAILURE';

export const DELETE_MEMO_TYPE = 'planner/DELETE_MEMO';
const DELETE_MEMO_SUCCESS_TYPE = 'planner/DELETE_MEMO_SUCCESS';
const DELETE_MEMO_FAILURE_TYPE = 'planner/DELETE_MEMO_FAILURE';

export const CREATE_PLAN_TYPE = 'planner/CREATE_PLAN';
const CREATE_PLAN_SUCCESS_TYPE = 'planner/CREATE_PLAN_SUCCESS';
const CREATE_PLAN_FAILURE_TYPE = 'planner/CREATE_PLAN_FAILURE';

export const UPDATE_PLAN_TYPE = 'planner/UPDATE_PLAN';
const UPDATE_PLAN_SUCCESS_TYPE = 'planner/UPDATE_PLAN_SUCCESS';
const UPDATE_PLAN_FAILURE_TYPE = 'planner/UPDATE_PLAN_FAILURE';

export const DELETE_PLAN_TYPE = 'planner/DELETE_PLAN';
const DELETE_PLAN_SUCCESS_TYPE = 'planner/DELETE_PLAN_SUCCESS';
const DELETE_PLAN_FAILURE_TYPE = 'planner/DELETE_PLAN_FAILURE';

export const INVITE_MEMBER_TYPE = 'planner/INVITE_MEMBER';
const INVITE_MEMBER_SUCCESS_TYPE = 'planner/INVITE_MEMBER_SUCCESS';
const INVITE_MEMBER_FAILURE_TYPE = 'planner/INVITE_MEMBER_FAILURE';

export const DELETE_MEMBER_TYPE = 'planner/DELETE_MEMBER';
const DELETE_MEMBER_SUCCESS_TYPE = 'planner/DELETE_MEMBER_SUCCESS';
const DELETE_MEMBER_FAILURE_TYPE = 'planner/DELETE_MEMBER_FAILURE';

export const CREATE_LOCATION_TYPE = 'planner/CREATE_LOCATION';
const CREATE_LOCATION_SUCCESS_TYPE = 'planner/CREATE_LOCATION_SUCCESS';
const CREATE_LOCATION_FAILURE_TYPE = 'planner/CREATE_LOCATION_FAILURE';

export const UPDATE_LOCATION_TYPE = 'planner/UPDATE_LOCATION';
const UPDATE_LOCATION_SUCCESS_TYPE = 'planner/UPDATE_LOCATION_SUCCESS';
const UPDATE_LOCATION_FAILURE_TYPE = 'planner/UPDATE_LOCATION_FAILURE';

export const DELETE_LOCATION_TYPE = 'planner/DELETE_LOCATION';
const DELETE_LOCATION_SUCCESS_TYPE = 'planner/DELETE_LOCATION_SUCCESS';
const DELETE_LOCATION_FAILURE_TYPE = 'planner/DELETE_LOCATION_FAILURE';

const PLANNER_INITIALIZE_TYPE = 'planner/PLANNER_INITIALIZE';
const PLANNER_INITIALIZE_PROPERTY_TYPE = 'planner/PLANNER_INITIALIZE_PROPERTY';

const CHANGE_MAP_DATA_TYPE = 'planner/CHANGE_MAP_DATA_TYPE';
const CHANGE_PLANNER_DATA_TYPE = 'planner/CHANGE_PLANNER_DATA_TYPE';
const CHANGE_MODAL_DATA_TYPE = 'planner/CHANGE_MODAL_DATA_TYPE';
const CHANGE_PLANNER_FIELD_TYPE = 'planner/CHANGE_PLANNER_FIELD';
const PLANNER_VALIDATE_TYPE = 'planner/PLANNER_VALIDATE';

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
    areaCode,
}) => ({
    type: UPDATE_PLANNER_TYPE,
    plannerId,
    title,
    planDateStart,
    planDateEnd,
    expense,
    memberCount,
    memberTypeId,
    areaCode,
});
export const loadSharePlannerListAction = ({ itemCount, areaCode, sortCriteria, keyword, pageNum }) => ({
    type: LOAD_SHARE_PLANNER_LIST_TYPE,
    itemCount,
    sortCriteria,
    keyword,
    pageNum,
    areaCode,
});
export const loadPlannerAction = (plannerId) => ({ type: LOAD_PLANNER_TYPE, plannerId });
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

export const changeMapDataAction = ({ property, value }) => ({ type: CHANGE_MAP_DATA_TYPE, property, value });
export const plannerInitializeAction = () => ({
    type: PLANNER_INITIALIZE_TYPE,
});
export const plannerInitializePropertyAction = (property) => ({
    type: PLANNER_INITIALIZE_PROPERTY_TYPE,
    property,
});
export const changePlannerDataAction = ({ property, value }) => ({
    type: CHANGE_PLANNER_DATA_TYPE,
    property,
    value,
});
export const changeModalDataAction = ({ property, value }) => ({
    type: CHANGE_MODAL_DATA_TYPE,
    property,
    value,
});
export const changePlannerFieldAction = ({ form, name, value }) => ({
    type: CHANGE_PLANNER_FIELD_TYPE,
    form,
    name,
    value,
});

export const plannerValidateFieldAction = (validState) => ({
    type: PLANNER_VALIDATE_TYPE,
    validState,
});

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
        pType: '',
    },
    keywordData: {
        curKeyword: '',
        resultKeyword: '',
    },
    mapData: {
        allSchedule: false,
        navRoute: true,
        navList: true,
        tutorial: false,
        isView: true,
    },
    plannerInfoForm: {
        title: '',
        expense: '',
        memberCount: '',
        memberTypeId: 1,
        areaCode: 0,
    },
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
                    pType: 2,
                },
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

        case DELETE_PLANNER_SUCCESS_TYPE:
            return {
                ...state,
                plannerData: {
                    ...state.plannerData,
                    plannerId: '',
                },
                planner: false,
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
        case CHANGE_MAP_DATA_TYPE:
            return {
                ...state,
                mapData: {
                    ...state.mapData,
                    [action.property]: action.value,
                },
            };
        case PLANNER_INITIALIZE_TYPE:
            return { ...initialState };
        case PLANNER_INITIALIZE_PROPERTY_TYPE: {
            return { ...state, [action.property]: initialState[action.property] };
        }
        case CHANGE_PLANNER_DATA_TYPE:
            return {
                ...state,
                plannerData: {
                    ...state.plannerData,
                    [action.property]: action.value,
                },
            };
        case CHANGE_MODAL_DATA_TYPE:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    [action.property]: action.value,
                },
            };
        case CHANGE_PLANNER_FIELD_TYPE: {
            return { ...state, [action.form]: { ...state[action.form], [action.name]: action.value } };
        }
        case PLANNER_VALIDATE_TYPE: {
            return { ...state, plannerError: { ...action.validState } };
        }
        default:
            return state;
    }
}

export default plannerReducer;
