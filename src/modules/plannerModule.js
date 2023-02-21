import * as plannerAPI from '../lib/api/plannerAPI';
import { takeLatest } from 'redux-saga/effects';
import createSaga from '../lib/createSaga';

const LOAD_SHARE_PLANNER_TYPE = 'planner/LOAD_SHARE_PLANNER';
const LOAD_SHARE_PLANNER_SUCCESS_TYPE = 'planner/LOAD_SHARE_PLANNER_SUCCESS';
const LOAD_SHARE_PLANNER_FAILURE_TYPE = 'planner/LOAD_SHARE_PLANNER_FAILURE';

const CREATE_PLANNER_TYPE = 'planner/CREATE_PLANNER';
const CREATE_PLANNER_SUCCESS_TYPE = 'planner/CREATE_PLANNER_SUCCESS';
const CREATE_PLANNER_FAILURE_TYPE = 'planner/CREATE_PLANNER_FAILURE';

export const createPlannerAction = () => ({ type: CREATE_PLANNER_TYPE });
export const loadSharePlannerAction = () => ({ type: LOAD_SHARE_PLANNER_TYPE });

const createPlannerSaga = createSaga(CREATE_PLANNER_TYPE, plannerAPI.createPlanner);
const loadSharePlannerSaga = createSaga(LOAD_SHARE_PLANNER_TYPE, plannerAPI.loadSharePlanner);
export function* plannerSaga() {
    yield takeLatest(CREATE_PLANNER_TYPE, createPlannerSaga);
    yield takeLatest(LOAD_SHARE_PLANNER_TYPE, loadSharePlannerSaga);
}

const initialState = {
    planners: null,
    plannerError: null,
};

function plannerReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_PLANNER_SUCCESS_TYPE:
            return {
                ...state,
            };
        case CREATE_PLANNER_FAILURE_TYPE:
            return {
                ...state,
                plannerError: action.payload.error,
            };
        case LOAD_SHARE_PLANNER_SUCCESS_TYPE:
            return {
                ...state,
                planners: action.payload.data,
            };
        case LOAD_SHARE_PLANNER_FAILURE_TYPE:
            return {
                ...state,
                plannerError: action.payload.error,
            };
        default:
            return state;
    }
}

export default plannerReducer;
