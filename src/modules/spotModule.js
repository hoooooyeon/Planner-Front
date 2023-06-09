import * as spotAPI from '../lib/api/spotAPI';
import { takeLatest } from 'redux-saga/effects';
import createSaga from '../lib/createSaga';

const LOAD_AREAS_TYPE = 'spot/LOAD_AREAS';
const LOAD_AREAS_SUCCESS_TYPE = 'spot/LOAD_AREAS_SUCCESS';
const LOAD_AREAS_FAILURE_TYPE = 'spot/LOAD_AREAS_FAILURE';

const LOAD_SPOTS_TYPE = 'spot/LOAD_SPOTS';
const LOAD_SPOTS_SUCCESS_TYPE = 'spot/LOAD_SPOTS_SUCCESS';
const LOAD_SPOTS_FAILURE_TYPE = 'spot/LOAD_SPOTS_FAILURE';

const CHANGE_AREA_INDEX_TYPE = 'spot/CHANGE_AREA_INDEX';
const CHANGE_PAGE_INDEX_TYPE = 'spot/CHANGE_PAGE_INDEX';
const CHANGE_BLOCK_INDEX_TYPE = 'spot/CHANGE_BLOCK_INDEX';
const CHANGE_CONTENT_ID_TYPE = 'spot/CHANGE_CONTENT_ID';

const LOAD_DETAIL_SPOT_TYPE = 'spot/LOAD_DETAIL_SPOT';
const LOAD_DETAIL_SPOT_SUCCESS_TYPE = 'spot/LOAD_DETAIL_SPOT_SUCCESS';
const LOAD_DETAIL_SPOT_FAILURE_TYPE = 'spot/LOAD_DETAIL_SPOT_FAILURE';
const UNLOAD_DETAIL_SPOT_TYPE = 'spot/UNLOAD_DETAIL_SPOT';

const CHANGE_DETAIL_SPOT_TYPE = 'spot/CHANGE_DETAIL_SPOT';

const ADD_SPOT_LIKE_TYPE = 'spot/ADD_SPOT_LIKE';
const ADD_SPOT_LIKE_SUCCESS_TYPE = 'spot/ADD_SPOT_LIKE_SUCCESS';
const ADD_SPOT_LIKE_FAILURE_TYPE = 'spot/ADD_SPOT_LIKE_FAILURE';

const REMOVE_SPOT_LIKE_TYPE = 'spot/REMOVE_SPOT_LIKE';
const REMOVE_SPOT_LIKE_SUCCESS_TYPE = 'spot/REMOVE_SPOT_LIKE_SUCCESS';
const REMOVE_SPOT_LIKE_FAILURE_TYPE = 'spot/REMOVE_SPOT_LIKE_FAILURE';

const CHANGE_SPOTS_LIKE_TYPE = 'spot/CHANGE_SPOTS_LIKE';
const TOGGLE_DETAIL_LIKE_TYPE = 'spot/TOGGLE_DETAIL_LIKE';

const RESET_SPOTS_TYPE = 'spot/RESET_SPOTS';
const RESET_LIKE_LIST_TYPE = 'spot/RESET_LIKE_LIST';
const RESET_SPOT_DATA_TYPE = 'spot/RESET_SPOT_DATA';

const CHANGE_KEYWORD_TYPE = 'spot/CHANGE_KEYWORD';
const RESET_KEYWORD_TYPE = 'spot/RESET_KEYWORD';
const SEARCH_SPOT_TYPE = 'spot/SEARCH_SPOT';
const SEARCH_SPOT_SUCCESS_TYPE = 'spot/SEARCH_SPOT_SUCCESS';
const SEARCH_SPOT_FAILURE_TYPE = 'spot/SEARCH_SPOT_FAILURE';

const CHANGE_CONTENT_TYPE_ID_TYPE = 'spot/CHANGE_CONTENT_TYPE_ID';

export const loadAreasAction = () => ({ type: LOAD_AREAS_TYPE });
export const loadSpotsAction = ({ areaIndex, contentTypeId, pageIndex }) => ({ type: LOAD_SPOTS_TYPE, areaIndex, contentTypeId, pageIndex });
export const changeAreaIndexAction = (index) => ({ type: CHANGE_AREA_INDEX_TYPE, index });
export const changePageIndexAction = (index) => ({ type: CHANGE_PAGE_INDEX_TYPE, index });
export const changeBlockIndexAction = (index) => ({ type: CHANGE_BLOCK_INDEX_TYPE, index });
export const changeContentIdAction = (id) => ({ type: CHANGE_CONTENT_ID_TYPE, id });
export const loadDetailSpotAction = (id) => ({ type: LOAD_DETAIL_SPOT_TYPE, id });
export const unloadDetailSpotAction = () => ({ type: UNLOAD_DETAIL_SPOT_TYPE });
export const changeDetailSpotAction = (spotInfo) => ({ type: CHANGE_DETAIL_SPOT_TYPE, spotInfo });
export const addSpotLikeAction = ({ contentId }) => ({ type: ADD_SPOT_LIKE_TYPE, contentId });
export const removeSpotLikeAction = ({ contentId }) => ({ type: REMOVE_SPOT_LIKE_TYPE, contentId });
export const changeSpotsLikeAction = (likes) => ({ type: CHANGE_SPOTS_LIKE_TYPE, likes });
export const toggleDetailLikeAction = () => ({ type: TOGGLE_DETAIL_LIKE_TYPE });
export const resetSpotsAction = () => ({ type: RESET_SPOTS_TYPE });
export const resetLikeListAction = () => ({ type: RESET_LIKE_LIST_TYPE });
export const resetSpotDataAction = () => ({ type: RESET_SPOT_DATA_TYPE });
export const changeKeywordAction = (keyword) => ({ type: CHANGE_KEYWORD_TYPE, keyword });
export const resetKeywordAction = () => ({ type: RESET_KEYWORD_TYPE });
export const searchSpotAction = ({ areaIndex, contentTypeId, keyword, pageIndex }) => ({ type: SEARCH_SPOT_TYPE, areaIndex, contentTypeId, keyword, pageIndex });
export const changeContentTypeIdAction = (contentTypeId) => ({ type: CHANGE_CONTENT_TYPE_ID_TYPE, contentTypeId });

const loadAreasSaga = createSaga(LOAD_AREAS_TYPE, spotAPI.loadAreas);
const loadSpotsSaga = createSaga(LOAD_SPOTS_TYPE, spotAPI.loadSpots);
const loadDetailSpotSaga = createSaga(LOAD_DETAIL_SPOT_TYPE, spotAPI.loadDetailSpot);
const addSpotLikeSaga = createSaga(ADD_SPOT_LIKE_TYPE, spotAPI.addSpotLike);
const removeSpotLikeSaga = createSaga(REMOVE_SPOT_LIKE_TYPE, spotAPI.removeSpotLike);
const searchSpotSaga = createSaga(SEARCH_SPOT_TYPE, spotAPI.searchSpot);

export function* spotSaga() {
    yield takeLatest(LOAD_AREAS_TYPE, loadAreasSaga);
    yield takeLatest(LOAD_SPOTS_TYPE, loadSpotsSaga);
    yield takeLatest(LOAD_DETAIL_SPOT_TYPE, loadDetailSpotSaga);
    yield takeLatest(ADD_SPOT_LIKE_TYPE, addSpotLikeSaga);
    yield takeLatest(REMOVE_SPOT_LIKE_TYPE, removeSpotLikeSaga);
    yield takeLatest(SEARCH_SPOT_TYPE, searchSpotSaga);
}

const initialState = {
    areas: null,
    sliderSpots: null,
    spots: null,
    detail: null,
    spotError: null,
    spotData: {
        areaIndex: 1,
        pageIndex: 1,
        contentTypeId: 12,
        contentId: null,
    },
    keyword: '',
    contentTypeList: [
        { label: '관광지', id: 12 },
        { label: '문화시설', id: 14 },
        { label: '행사', id: 15 },
        { label: '레포츠', id: 28 },
        { label: '숙박', id: 32 },
        { label: '쇼핑', id: 38 },
        { label: '음식점', id: 39 },
    ],
};

function spotReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_AREAS_SUCCESS_TYPE:
            return {
                ...state,
                areas: action.payload.data.items,
            };
        case LOAD_AREAS_FAILURE_TYPE:
        case LOAD_SPOTS_FAILURE_TYPE:
        case LOAD_DETAIL_SPOT_FAILURE_TYPE:
        case ADD_SPOT_LIKE_FAILURE_TYPE:
        case REMOVE_SPOT_LIKE_FAILURE_TYPE:
        case SEARCH_SPOT_FAILURE_TYPE:
            return {
                ...state,
                spotError: action.payload.error,
            };
        case LOAD_SPOTS_SUCCESS_TYPE:
            return {
                ...state,
                spots: {
                    list: action.payload.data.items,
                    totalCount: action.payload.data.totalCount,
                },
            };

        case CHANGE_AREA_INDEX_TYPE:
            return {
                ...state,
                spotData: {
                    ...state.spotData,
                    areaIndex: action.index,
                    pageIndex: 1,
                },
            };
        case CHANGE_PAGE_INDEX_TYPE:
            return {
                ...state,
                spotData: {
                    ...state.spotData,
                    pageIndex: action.index,
                },
            };
        case CHANGE_BLOCK_INDEX_TYPE:
            return {
                ...state,
                spotData: {
                    ...state.spotData,
                    blockNum: action.num,
                },
            };

        case CHANGE_CONTENT_ID_TYPE:
            return {
                ...state,
                spotData: {
                    ...state.spotData,
                    contentId: action.id,
                },
            };
        case LOAD_DETAIL_SPOT_SUCCESS_TYPE:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    ...action.payload.data,
                },
            };

        case CHANGE_DETAIL_SPOT_TYPE:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    title: action.spotInfo.title,
                    contentid: action.spotInfo.contentid,
                    firstimage: action.spotInfo.firstimage,
                },
            };
        case UNLOAD_DETAIL_SPOT_TYPE:
            return {
                ...state,
                detail: null,
                spotData: {
                    ...state.spotData,
                    contentId: null,
                },
            };
        case ADD_SPOT_LIKE_SUCCESS_TYPE:
            return {
                ...state,
                spotData: {
                    ...state.spotData,
                },
            };
        case REMOVE_SPOT_LIKE_SUCCESS_TYPE:
            return {
                ...state,
                spotData: {
                    ...state.spotData,
                },
            };
        case CHANGE_SPOTS_LIKE_TYPE:
            return {
                ...state,
                spots: {
                    list: action.likes.map((like, i) => {
                        return {
                            info: {
                                ...state.spots.list[i].info,
                                like: String(like.contentId) === state.spots.list[i].info.contentid ? like.state : false,
                            },
                        };
                    }),
                    totalCount: state.spots.totalCount,
                },
            };

        case TOGGLE_DETAIL_LIKE_TYPE:
            return {
                ...state,
                // detail: {
                //     info: {
                //         ...state.detail.info,
                //         like: !state.detail.info.like,
                //     },
                // },
            };
        case RESET_SPOTS_TYPE:
            return { ...state, spots: null };

        case RESET_LIKE_LIST_TYPE:
            return { ...state, likeList: null };

        case RESET_SPOT_DATA_TYPE:
            return {
                ...state,
                spotData: {
                    areaIndex: 1,
                    pageIndex: 1,
                    contentTypeId: 12,
                    contentId: null,
                },
            };

        case CHANGE_KEYWORD_TYPE:
            return {
                ...state,
                keyword: action.keyword,
            };
        case RESET_KEYWORD_TYPE:
            return {
                ...state,
                keyword: '',
            };

        case SEARCH_SPOT_SUCCESS_TYPE:
            return {
                ...state,
                spots: {
                    list: action.payload.data.items,
                    totalCount: action.payload.data.totalCount,
                },
            };
        case CHANGE_CONTENT_TYPE_ID_TYPE:
            return {
                ...state,
                spotData: {
                    ...state.spotData,
                    contentTypeId: action.contentTypeId,
                    pageIndex: 1,
                },
            };

        default:
            return state;
    }
}

export default spotReducer;
