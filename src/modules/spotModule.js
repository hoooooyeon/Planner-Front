import * as spotAPI from '../lib/api/spotAPI';
import { takeLatest } from 'redux-saga/effects';
import createSaga from '../lib/createSaga';

const LOAD_AREAS_TYPE = 'spot/LOAD_AREAS';
const LOAD_AREAS_SUCCESS_TYPE = 'spot/LOAD_AREAS_SUCCESS';
const LOAD_AREAS_FAILURE_TYPE = 'spot/LOAD_AREAS_FAILURE';

const LOAD_SPOTS_TYPE = 'spot/LOAD_SPOTS';
const LOAD_SPOTS_SUCCESS_TYPE = 'spot/LOAD_SPOTS_SUCCESS';
const LOAD_SPOTS_FAILURE_TYPE = 'spot/LOAD_SPOTS_FAILURE';

const UPDATE_AREA_NUM_TYPE = 'spot/UPDATE_AREA_NUM';
const UPDATE_PAGE_NUM_TYPE = 'spot/UPDATE_PAGE_NUM';
const UPDATE_BLOCK_NUM_TYPE = 'spot/UPDATE_BLOCK_NUM';
const UPDATE_TOTAL_PAGE_TYPE = 'spot/UPDATE_TOTAL_PAGE';
const UPDATE_PAGINATION_TYPE = 'spot/UPDATE_PAGINATION';

const LOAD_DETAIL_SPOT_TYPE = 'spot/LOAD_DETAIL_SPOT';
const LOAD_DETAIL_SPOT_SUCCESS_TYPE = 'spot/LOAD_DETAIL_SPOT_SUCCESS';
const LOAD_DETAIL_SPOT_FAILURE_TYPE = 'spot/LOAD_DETAIL_SPOT_FAILURE';
const UNLOAD_DETAIL_SPOT_TYPE = 'spot/UNLOAD_DETAIL_SPOT';

const ADD_LIKE_SPOT_TYPE = 'spot/ADD_LIKE_SPOT';
const ADD_LIKE_SPOT_SUCCESS_TYPE = 'spot/ADD_LIKE_SPOT_SUCCESS';
const ADD_LIKE_SPOT_FAILURE_TYPE = 'spot/ADD_LIKE_SPOT_FAILURE';

const REMOVE_LIKE_SPOT_TYPE = 'spot/REMOVE_LIKE_SPOT';
const REMOVE_LIKE_SPOT_SUCCESS_TYPE = 'spot/REMOVE_LIKE_SPOT_SUCCESS';
const REMOVE_LIKE_SPOT_FAILURE_TYPE = 'spot/REMOVE_LIKE_SPOT_FAILURE';

const UPDATE_SPOTS_LIKE_TYPE = 'spot/UPDATE_SPOTS_LIKE';
const UPDATE_DETAIL_LIKE_TYPE = 'spot/UPDATE_DETAIL_LIKE';

const CHECK_LIKE_SPOT_ID_TYPE = 'spot/CHECK_LIKE_SPOT_ID';
const CHECK_LIKE_SPOT_ID_SUCCESS_TYPE = 'spot/CHECK_LIKE_SPOT_ID_SUCCESS';
const CHECK_LIKE_SPOT_ID_FAILURE_TYPE = 'spot/CHECK_LIKE_SPOT_ID_FAILURE';
const CLEAN_LIKE_SPOT_ID_TYPE = 'spot/CLEAN_LIKE_SPOT_ID';

export const loadAreasAction = () => ({ type: LOAD_AREAS_TYPE });
export const loadSpotsAction = (areaCode, page) => ({ type: LOAD_SPOTS_TYPE, areaCode, page });
export const updateAreaNumAction = (num) => ({ type: UPDATE_AREA_NUM_TYPE, num });
export const updatePageNumAction = (num) => ({ type: UPDATE_PAGE_NUM_TYPE, num });
export const updateBlockNumAction = (num) => ({ type: UPDATE_BLOCK_NUM_TYPE, num });
export const updateTotalPageAction = (num) => ({ type: UPDATE_TOTAL_PAGE_TYPE, num });
export const updatePaginationAction = (num) => ({ type: UPDATE_PAGINATION_TYPE, num });
export const loadDetailSpotAction = (id) => ({ type: LOAD_DETAIL_SPOT_TYPE, id });
export const unloadDetailSpotAction = () => ({ type: UNLOAD_DETAIL_SPOT_TYPE });
export const addLikeSpotAction = (accountId, spotId) => ({ type: ADD_LIKE_SPOT_TYPE, accountId, spotId });
export const removeLikeSpotAction = (accountId, spotId) => ({ type: REMOVE_LIKE_SPOT_TYPE, accountId, spotId });
export const updateSpotsLikeAction = (likes) => ({ type: UPDATE_SPOTS_LIKE_TYPE, likes });
export const updateDetailLikeAction = (like) => ({ type: UPDATE_DETAIL_LIKE_TYPE, like });
export const checkLikeSpotIdAction = (accountId, spotId) => ({ type: CHECK_LIKE_SPOT_ID_TYPE, accountId, spotId });
export const cleanLikeSpotIdAction = () => ({ type: CLEAN_LIKE_SPOT_ID_TYPE });

const loadAreasSaga = createSaga(LOAD_AREAS_TYPE, spotAPI.loadAreas);
const loadSpotsSaga = createSaga(LOAD_SPOTS_TYPE, spotAPI.loadSpots);
const loadDetailSpotSaga = createSaga(LOAD_DETAIL_SPOT_TYPE, spotAPI.loadDetailSpot);
const addLikeSpotSaga = createSaga(ADD_LIKE_SPOT_TYPE, spotAPI.addlikeSpot);
const removeLikeSpotSaga = createSaga(REMOVE_LIKE_SPOT_TYPE, spotAPI.removeLikeSpot);
const checkLikeSpotIdSaga = createSaga(CHECK_LIKE_SPOT_ID_TYPE, spotAPI.checkLikeSpotId);

export function* spotSaga() {
    yield takeLatest(LOAD_AREAS_TYPE, loadAreasSaga);
    yield takeLatest(LOAD_SPOTS_TYPE, loadSpotsSaga);
    yield takeLatest(LOAD_DETAIL_SPOT_TYPE, loadDetailSpotSaga);
    yield takeLatest(ADD_LIKE_SPOT_TYPE, addLikeSpotSaga);
    yield takeLatest(REMOVE_LIKE_SPOT_TYPE, removeLikeSpotSaga);
    yield takeLatest(CHECK_LIKE_SPOT_ID_TYPE, checkLikeSpotIdSaga);
}

const initialState = {
    areas: null,
    spots: null,
    detail: null,
    spotError: null,
    currentInfo: {
        areaNum: null,
        pageNum: 1,
        blockNum: 0,
        totalPage: null,
        pagination: null,
    },
    likeSpotId: null,
};

function spotReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_AREAS_SUCCESS_TYPE:
            return {
                ...state,
                areas: action.payload.data.item,
            };
        case LOAD_AREAS_FAILURE_TYPE:
            return {
                ...state,
                spotError: action.payload.error,
            };
        case LOAD_SPOTS_SUCCESS_TYPE:
            return {
                ...state,
                spots: {
                    list: action.payload.data.item.map((item) => {
                        return {
                            info: item,
                            like: false,
                        };
                    }),
                    totalCount: action.payload.data.totalCount,
                },
            };
        case LOAD_SPOTS_FAILURE_TYPE:
            return {
                ...state,
                spotError: action.payload.error,
            };
        case UPDATE_AREA_NUM_TYPE:
            return {
                ...state,
                currentInfo: {
                    ...state.currentInfo,
                    areaNum: action.num,
                },
            };
        case UPDATE_PAGE_NUM_TYPE:
            return {
                ...state,
                currentInfo: {
                    ...state.currentInfo,
                    pageNum: action.num,
                },
            };
        case UPDATE_BLOCK_NUM_TYPE:
            return {
                ...state,
                currentInfo: {
                    ...state.currentInfo,
                    blockNum: action.num,
                },
            };
        case UPDATE_TOTAL_PAGE_TYPE:
            return {
                ...state,
                currentInfo: {
                    ...state.currentInfo,
                    totalPage: action.num,
                },
            };
        case UPDATE_PAGINATION_TYPE:
            return {
                ...state,
                currentInfo: {
                    ...state.currentInfo,
                    pagination: action.num,
                },
            };
        case LOAD_DETAIL_SPOT_SUCCESS_TYPE:
            return {
                ...state,
                detail: {
                    info: action.payload.data.item[0],
                    like: false,
                },
            };
        case LOAD_DETAIL_SPOT_FAILURE_TYPE:
            return {
                ...state,
                spotError: action.payload.error,
            };
        case UNLOAD_DETAIL_SPOT_TYPE:
            return {
                ...state,
                detail: null,
            };
        case ADD_LIKE_SPOT_SUCCESS_TYPE:
            return {
                ...state,
            };
        case ADD_LIKE_SPOT_FAILURE_TYPE:
            return {
                ...state,
                spotError: action.payload.error,
            };
        case REMOVE_LIKE_SPOT_SUCCESS_TYPE:
            return {
                ...state,
            };
        case REMOVE_LIKE_SPOT_FAILURE_TYPE:
            return {
                ...state,
                spotError: action.payload.error,
            };
        case UPDATE_SPOTS_LIKE_TYPE:
            return {
                ...state,
                spots: {
                    list: action.likes.map((like, i) => {
                        return {
                            info: state.spots.list[i].info,
                            like: String(like.contentId) === state.spots.list[i].info.contentid ? like.state : false,
                        };
                    }),
                    totalCount: state.spots.totalCount,
                },
            };
        case UPDATE_DETAIL_LIKE_TYPE:
            return {
                ...state,
                detail: {
                    info: state.detail.info,
                    like: action.like,
                },
            };
        case CHECK_LIKE_SPOT_ID_SUCCESS_TYPE: {
            return { ...state, likeSpotId: action.payload.data };
        }
        case CHECK_LIKE_SPOT_ID_FAILURE_TYPE: {
            return { ...state, spotError: action.payload.error };
        }
        case CLEAN_LIKE_SPOT_ID_TYPE: {
            return { ...state, likeSpotId: null };
        }
        default:
            return state;
    }
}

export default spotReducer;
