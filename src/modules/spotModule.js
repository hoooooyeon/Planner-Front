import createRequestSaga from '../lib/createRequestSaga';
import * as spotAPI from '../lib/api/spotAPI';
import { takeLatest } from 'redux-saga/effects';

const LOAD_AREAS = 'spot/LOAD_AREAS';
const LOAD_AREAS_SUCCESS = 'spot/LOAD_AREAS_SUCCESS';
const LOAD_AREAS_FAILURE = 'spot/LOAD_AREAS_FAILURE';

const LOAD_SPOTS = 'spot/LOAD_SPOTS';
const LOAD_SPOTS_SUCCESS = 'spot/LOAD_SPOTS_SUCCESS';
const LOAD_SPOTS_FAILURE = 'spot/LOAD_SPOTS_FAILURE';

const UPDATE_AREA_NUM = 'spot/UPDATE_AREA_NUM';

const UPDATE_PAGE_NUM = 'spot/UPDATE_PAGE_NUM';

const UPDATE_BLOCK_NUM = 'spot/UPDATE_BLOCK_NUM';

const UPDATE_TOTAL_COUNT = 'spot/UPDATE_TOTAL_COUNT';

const LOAD_DETAIL_SPOT = 'spot/LOAD_DETAIL_SPOT';
const LOAD_DETAIL_SPOT_SUCCESS = 'spot/LOAD_DETAIL_SPOT_SUCCESS';
const LOAD_DETAIL_SPOT_FAILURE = 'spot/LOAD_DETAIL_SPOT_FAILURE';
const UNLOAD_DETAIL_SPOT = 'spot/UNLOAD_DETAIL_SPOT';

export const loadAreas = () => ({ type: LOAD_AREAS });
export const loadSpots = (areaCode, page) => ({ type: LOAD_SPOTS, areaCode, page });
export const updateAreaNum = (num) => ({ type: UPDATE_AREA_NUM, num });
export const updatePageNum = (num) => ({ type: UPDATE_PAGE_NUM, num });
export const updateBlockNum = (num) => ({ type: UPDATE_BLOCK_NUM, num });
export const updateTotalCount = (num) => ({ type: UPDATE_TOTAL_COUNT, num });
export const loadDetailSpot = (id) => ({ type: LOAD_DETAIL_SPOT, id });
export const unloadDetailSpot = () => ({ type: UNLOAD_DETAIL_SPOT });

const loadAreasSaga = createRequestSaga(LOAD_AREAS, spotAPI.loadAreas);
const loadSpotsSaga = createRequestSaga(LOAD_SPOTS, spotAPI.loadSpots);
const loadDetailSpotSaga = createRequestSaga(LOAD_DETAIL_SPOT, spotAPI.loadDetailSpot);
export function* spotSaga() {
    yield takeLatest(LOAD_AREAS, loadAreasSaga);
    yield takeLatest(LOAD_SPOTS, loadSpotsSaga);
    yield takeLatest(LOAD_DETAIL_SPOT, loadDetailSpotSaga);
}

const initialState = {
    areas: null,
    spots: undefined,
    detail: null,
    spotError: null,
    currentInfo: {
        areaNum: null,
        pageNum: 1,
        blockNum: 0,
        totalCount: null,
    },
};

function spotReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_AREAS_SUCCESS:
            return {
                ...state,
                areas: action.payload.data.item,
            };
        case LOAD_AREAS_FAILURE:
            return {
                ...state,
                spotError: action.payload.error,
            };
        case LOAD_SPOTS_SUCCESS:
            return {
                ...state,
                spots: {
                    list: action.payload.data.item.map((item) => {
                        return {
                            info: item,
                            favorites: false,
                        };
                    }),
                    totalCount: action.payload.data.totalCount,
                },
            };
        case LOAD_SPOTS_FAILURE:
            return {
                ...state,
                spotError: action.payload.error,
            };
        case UPDATE_TOTAL_COUNT:
            return {
                ...state,
                currentInfo: {
                    ...state.currentInfo,
                    totalCount: action.num,
                },
            };
        case UPDATE_AREA_NUM:
            return {
                ...state,
                currentInfo: {
                    ...state.currentInfo,
                    areaNum: action.num,
                },
            };
        case UPDATE_PAGE_NUM:
            return {
                ...state,
                currentInfo: {
                    ...state.currentInfo,
                    pageNum: action.num,
                },
            };
        case UPDATE_BLOCK_NUM:
            return {
                ...state,
                currentInfo: {
                    ...state.currentInfo,
                    blockNum: action.num,
                },
            };

        case LOAD_DETAIL_SPOT_SUCCESS:
            return {
                ...state,
                detail: action.payload.data.item,
            };
        case LOAD_DETAIL_SPOT_FAILURE:
            return {
                ...state,
                spotError: action.payload.error,
            };
        case UNLOAD_DETAIL_SPOT:
            return {
                ...state,
                detail: null,
            };

        default:
            return state;
    }
}

export default spotReducer;
