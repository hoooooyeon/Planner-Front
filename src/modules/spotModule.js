import createRequestSaga from '../lib/createRequestSaga';
import * as spotAPI from '../lib/api/spotAPI';
import { takeLatest } from 'redux-saga/effects';

const GET_AREAS = 'spot/GET_AREAS';
const GET_AREAS_SUCCESS = 'spot/GET_AREAS_SUCCESS';
const GET_AREAS_FAILURE = 'spot/GET_AREAS_FAILURE';

const LIST_SPOTS = 'spot/LIST_SPOTS';
const LIST_SPOTS_SUCCESS = 'spot/LIST_SPOTS_SUCCESS';
const LIST_SPOTS_FAILURE = 'spot/LIST_SPOTS_FAILURE';

export const getAreas = () => ({ type: GET_AREAS });
export const listSpots = () => ({ type: LIST_SPOTS });

const getAreasSaga = createRequestSaga(GET_AREAS, spotAPI.getAreas);
const listSpotsSaga = createRequestSaga(LIST_SPOTS, spotAPI.listSpots);
export function* spotSaga() {
  yield takeLatest(GET_AREAS, getAreasSaga);
  yield takeLatest(LIST_SPOTS, listSpotsSaga);
}

const initialState = {
  areas: null,
  spots: null,
  spotError: null,
};

function spotReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AREAS_SUCCESS:
      return {
        ...state,
        areas: action.payload.data.item,
      };
    case GET_AREAS_FAILURE:
      return {
        ...state,
        spotError: action.payload.error,
      };
    case LIST_SPOTS_SUCCESS:
      return {
        ...state,
        spots: action.payload.data.item,
      };
    case LIST_SPOTS_FAILURE:
      return {
        ...state,
        spotError: action.payload.error,
      };
    default:
      return state;
  }
}

export default spotReducer;
