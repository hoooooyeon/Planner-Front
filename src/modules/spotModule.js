import * as spotAPI from '../lib/api/spotAPI';
import { takeLatest } from 'redux-saga/effects';
import createSaga from '../lib/createSaga';

const LOAD_AREAS = 'spot/LOAD_AREAS';
const LOAD_AREAS_SUCCESS = 'spot/LOAD_AREAS_SUCCESS';
const LOAD_AREAS_FAILURE = 'spot/LOAD_AREAS_FAILURE';

const LOAD_SPOTS = 'spot/LOAD_SPOTS';
const LOAD_SPOTS_SUCCESS = 'spot/LOAD_SPOTS_SUCCESS';
const LOAD_SPOTS_FAILURE = 'spot/LOAD_SPOTS_FAILURE';

const UPDATE_AREA_NUM = 'spot/UPDATE_AREA_NUM';
const UPDATE_PAGE_NUM = 'spot/UPDATE_PAGE_NUM';
const UPDATE_BLOCK_NUM = 'spot/UPDATE_BLOCK_NUM';
const UPDATE_TOTAL_PAGE = 'spot/UPDATE_TOTAL_PAGE';
const UPDATE_PAGINATION = 'spot/UPDATE_PAGINATION';

const LOAD_DETAIL_SPOT = 'spot/LOAD_DETAIL_SPOT';
const LOAD_DETAIL_SPOT_SUCCESS = 'spot/LOAD_DETAIL_SPOT_SUCCESS';
const LOAD_DETAIL_SPOT_FAILURE = 'spot/LOAD_DETAIL_SPOT_FAILURE';
const UNLOAD_DETAIL_SPOT = 'spot/UNLOAD_DETAIL_SPOT';

const ADD_LIKE_SPOT = 'spot/ADD_LIKE_SPOT';
const ADD_LIKE_SPOT_SUCCESS = 'spot/ADD_LIKE_SPOT_SUCCESS';
const ADD_LIKE_SPOT_FAILURE = 'spot/ADD_LIKE_SPOT_FAILURE';

const REMOVE_LIKE_SPOT = 'spot/REMOVE_LIKE_SPOT';
const REMOVE_LIKE_SPOT_SUCCESS = 'spot/REMOVE_LIKE_SPOT_SUCCESS';
const REMOVE_LIKE_SPOT_FAILURE = 'spot/REMOVE_LIKE_SPOT_FAILURE';

const UPDATE_SPOTS_LIKE = 'spot/UPDATE_SPOTS_LIKE';
const UPDATE_DETAIL_LIKE = 'spot/UPDATE_DETAIL_LIKE';

export const loadAreas = () => ({ type: LOAD_AREAS });
export const loadSpots = (areaCode, page) => ({ type: LOAD_SPOTS, areaCode, page });
export const updateAreaNum = (num) => ({ type: UPDATE_AREA_NUM, num });
export const updatePageNum = (num) => ({ type: UPDATE_PAGE_NUM, num });
export const updateBlockNum = (num) => ({ type: UPDATE_BLOCK_NUM, num });
export const updateTotalPage = (num) => ({ type: UPDATE_TOTAL_PAGE, num });
export const updatePagination = (num) => ({ type: UPDATE_PAGINATION, num });
export const loadDetailSpot = (id) => ({ type: LOAD_DETAIL_SPOT, id });
export const unloadDetailSpot = () => ({ type: UNLOAD_DETAIL_SPOT });
export const addLikeSpot = (accountId, spotId) => ({ type: ADD_LIKE_SPOT, accountId, spotId });
export const removeLikeSpot = (accountId, spotId) => ({ type: REMOVE_LIKE_SPOT, accountId, spotId });
export const updateSpotsLike = (likes) => ({ type: UPDATE_SPOTS_LIKE, likes });
export const updateDetailLike = (like) => ({ type: UPDATE_DETAIL_LIKE, like });

const loadAreasSaga = createSaga(LOAD_AREAS, spotAPI.loadAreas);
const loadSpotsSaga = createSaga(LOAD_SPOTS, spotAPI.loadSpots);
const loadDetailSpotSaga = createSaga(LOAD_DETAIL_SPOT, spotAPI.loadDetailSpot);
const addLikeSpotSaga = createSaga(ADD_LIKE_SPOT, spotAPI.addlikeSpot);
const removeLikeSpotSaga = createSaga(REMOVE_LIKE_SPOT, spotAPI.removeLikeSpot);
export function* spotSaga() {
    yield takeLatest(LOAD_AREAS, loadAreasSaga);
    yield takeLatest(LOAD_SPOTS, loadSpotsSaga);
    yield takeLatest(LOAD_DETAIL_SPOT, loadDetailSpotSaga);
    yield takeLatest(ADD_LIKE_SPOT, addLikeSpotSaga);
    yield takeLatest(REMOVE_LIKE_SPOT, removeLikeSpotSaga);
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
                            like: false,
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
        case UPDATE_TOTAL_PAGE:
            return {
                ...state,
                currentInfo: {
                    ...state.currentInfo,
                    totalPage: action.num,
                },
            };
        case UPDATE_PAGINATION:
            return {
                ...state,
                currentInfo: {
                    ...state.currentInfo,
                    pagination: action.num,
                },
            };
        case LOAD_DETAIL_SPOT_SUCCESS:
            return {
                ...state,
                detail: {
                    info: action.payload.data.item[0],
                    like: false,
                },
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
        case ADD_LIKE_SPOT_SUCCESS:
            return {
                ...state,
            };
        case ADD_LIKE_SPOT_FAILURE:
            return {
                ...state,
                spotError: action.payload.error,
            };
        case REMOVE_LIKE_SPOT_SUCCESS:
            return {
                ...state,
            };
        case REMOVE_LIKE_SPOT_FAILURE:
            return {
                ...state,
                spotError: action.payload.error,
            };
        case UPDATE_SPOTS_LIKE:
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

        case UPDATE_DETAIL_LIKE:
            return {
                ...state,
                detail: {
                    info: state.detail.info,
                    like: action.like,
                },
            };
        default:
            return state;
    }
}

export default spotReducer;
