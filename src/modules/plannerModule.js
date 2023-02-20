import * as plannerAPI from '../lib/api/plannerAPI';
import { takeLatest } from 'redux-saga/effects';
import createSaga from '../lib/createSaga';

const CREATE_PLANNER_TYPE = 'planner/CREATE_PLANNER';
const CREATE_PLANNER_SUCCESS_TYPE = 'planner/CREATE_PLANNER_SUCCESS';
const CREATE_PLANNER_FAILURE_TYPE = 'planner/CREATE_PLANNER_FAILURE';

export const createPlannerAction = () => ({ type: CREATE_PLANNER_TYPE });

const createPlannerSaga = createSaga(CREATE_PLANNER_TYPE, plannerAPI.createPlanner);
export function* plannerSaga() {
    yield takeLatest(CREATE_PLANNER_TYPE, createPlannerSaga);
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
        default:
            return state;
    }
}

export default plannerReducer;
