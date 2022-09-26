import createRequestSaga from '../lib/createRequestSaga';
import * as spotAPI from '../lib/api/spotAPI';
import { takeLatest } from 'redux-saga/effects';

const GET_AREAS = 'spot/GET_AREAS';
const GET_AREAS_SUCCESS = 'spot/GET_AREAS_SUCCESS';
const GET_AREAS_FAILURE = 'spot/GET_AREAS_FAILURE';

const LIST_SPOTS = 'spot/LIST_SPOTS';
const LIST_SPOTS_SUCCESS = 'spot/LIST_SPOTS_SUCCESS';
const LIST_SPOTS_FAILURE = 'spot/LIST_SPOTS_FAILURE';

const DETAIL_SPOT = 'spot/DETAIL_SPOT';
const DETAIL_SPOT_SUCCESS = 'spot/DETAIL_SPOT_SUCCESS';
const DETAIL_SPOT_FAILURE = 'spot/DETAIL_SPOT_FAILURE';
const UNLOAD_DETAIL_SPOT = 'spot/UNLOAD_DETAIL_SPOT';

const ADD_FAVORITES_SPOT = 'spot/ADD_FAVORITES_SPOT';
const ADD_FAVORITES_SPOT_SUCCESS = 'spot/ADD_FAVORITES_SPOT_SUCCESS';
const ADD_FAVORITES_SPOT_FAILURE = 'spot/ADD_FAVORITES_SPOT_FAILURE';

const DELETE_FAVORITES_SPOT = 'spot/DELETE_FAVORITES_SPOT';
const DELETE_FAVORITES_SPOT_SUCCESS = 'spot/DELETE_FAVORITES_SPOT_SUCCESS';
const DELETE_FAVORITES_SPOT_FAILURE = 'spot/DELETE_FAVORITES_SPOT_FAILURE';

export const getAreas = () => ({ type: GET_AREAS });
export const listSpots = (areaCode, page) => ({ type: LIST_SPOTS, areaCode, page });
export const detailSpot = (id) => ({ type: DETAIL_SPOT, id });
export const unloadDetailSpot = () => ({ type: UNLOAD_DETAIL_SPOT });
export const addFavoritesSpot = (spotId) => ({ type: ADD_FAVORITES_SPOT, spotId });
export const deleteFavoritesSpot = (spotId) => ({ type: DELETE_FAVORITES_SPOT, spotId });

const getAreasSaga = createRequestSaga(GET_AREAS, spotAPI.getAreas);
const listSpotsSaga = createRequestSaga(LIST_SPOTS, spotAPI.listSpots);
const detailSpotSaga = createRequestSaga(DETAIL_SPOT, spotAPI.detailSpot);
const addFavoritesSpotSaga = createRequestSaga(ADD_FAVORITES_SPOT, spotAPI.addFavoritesSpot);
const deleteFavoritesSpotSaga = createRequestSaga(DELETE_FAVORITES_SPOT, spotAPI.deleteFavoritesSpot);
export function* spotSaga() {
    yield takeLatest(GET_AREAS, getAreasSaga);
    yield takeLatest(LIST_SPOTS, listSpotsSaga);
    yield takeLatest(DETAIL_SPOT, detailSpotSaga);
    yield takeLatest(ADD_FAVORITES_SPOT, addFavoritesSpotSaga);
    yield takeLatest(DELETE_FAVORITES_SPOT, deleteFavoritesSpotSaga);
}

const initialState = {
    areas: null,
    spots: null,
    detail: null,
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
                spots: action.payload.data,
            };
        case LIST_SPOTS_FAILURE:
            return {
                ...state,
                spotError: action.payload.error,
            };
        case DETAIL_SPOT_SUCCESS:
            return {
                ...state,
                detail: action.payload.data.item,
            };
        case DETAIL_SPOT_FAILURE:
            return {
                ...state,
                spotError: action.payload.error,
            };
        case UNLOAD_DETAIL_SPOT:
            return {
                ...state,
                detail: null,
            };
        case ADD_FAVORITES_SPOT_SUCCESS:
            return {
                ...state,
            };
        case ADD_FAVORITES_SPOT_FAILURE:
            return {
                ...state,
                spotError: action.payload.error,
            };
        case DELETE_FAVORITES_SPOT_SUCCESS:
            return {
                ...state,
            };
        case DELETE_FAVORITES_SPOT_FAILURE:
            return {
                ...state,
                spotError: action.payload.error,
            };
        default:
            return state;
    }
}

export default spotReducer;
