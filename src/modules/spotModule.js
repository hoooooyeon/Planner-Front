import * as spotAPI from '../lib/api/spotAPI';
import { takeLatest } from 'redux-saga/effects';
import createSaga from '../lib/createSaga';

export const LOAD_AREAS_TYPE = 'spot/LOAD_AREAS';
const LOAD_AREAS_SUCCESS_TYPE = 'spot/LOAD_AREAS_SUCCESS';
const LOAD_AREAS_FAILURE_TYPE = 'spot/LOAD_AREAS_FAILURE';

export const LOAD_SPOTS_TYPE = 'spot/LOAD_SPOTS';
const LOAD_SPOTS_SUCCESS_TYPE = 'spot/LOAD_SPOTS_SUCCESS';
const LOAD_SPOTS_FAILURE_TYPE = 'spot/LOAD_SPOTS_FAILURE';

export const LOAD_DETAIL_SPOT_TYPE = 'spot/LOAD_DETAIL_SPOT';
const LOAD_DETAIL_SPOT_SUCCESS_TYPE = 'spot/LOAD_DETAIL_SPOT_SUCCESS';
const LOAD_DETAIL_SPOT_FAILURE_TYPE = 'spot/LOAD_DETAIL_SPOT_FAILURE';

const CHANGE_DETAIL_SPOT_TYPE = 'spot/CHANGE_DETAIL_SPOT';

export const ADD_SPOT_LIKE_TYPE = 'spot/ADD_SPOT_LIKE';
const ADD_SPOT_LIKE_SUCCESS_TYPE = 'spot/ADD_SPOT_LIKE_SUCCESS';
const ADD_SPOT_LIKE_FAILURE_TYPE = 'spot/ADD_SPOT_LIKE_FAILURE';

export const REMOVE_SPOT_LIKE_TYPE = 'spot/REMOVE_SPOT_LIKE';
const REMOVE_SPOT_LIKE_SUCCESS_TYPE = 'spot/REMOVE_SPOT_LIKE_SUCCESS';
const REMOVE_SPOT_LIKE_FAILURE_TYPE = 'spot/REMOVE_SPOT_LIKE_FAILURE';

export const SEARCH_SPOT_TYPE = 'spot/SEARCH_SPOT';
const SEARCH_SPOT_SUCCESS_TYPE = 'spot/SEARCH_SPOT_SUCCESS';
const SEARCH_SPOT_FAILURE_TYPE = 'spot/SEARCH_SPOT_FAILURE';

const SPOT_INITIALIZE_TYPE = 'spot/SPOT_INITIALIZE';
const SPOT_INITIALIZE_FORM_TYPE = 'spots/SPOT_INITIALIZE_FORM';

const CHANGE_SPOT_DATA_TYPE = 'spot/CHANGE_SPOT_DATA_TYPE';

export const loadAreasAction = () => ({ type: LOAD_AREAS_TYPE });
export const loadSpotsAction = ({ areaCode, contentTypeId, pageNo, numOfRows }) => ({
    type: LOAD_SPOTS_TYPE,
    areaCode,
    contentTypeId,
    pageNo,
    numOfRows,
});
export const loadDetailSpotAction = ({ contentId }) => ({ type: LOAD_DETAIL_SPOT_TYPE, contentId });
export const changeDetailSpotAction = (spotInfo) => ({ type: CHANGE_DETAIL_SPOT_TYPE, spotInfo });
export const addSpotLikeAction = ({ contentId, title, image }) => ({
    type: ADD_SPOT_LIKE_TYPE,
    contentId,
    title,
    image,
});
export const removeSpotLikeAction = ({ contentId }) => ({ type: REMOVE_SPOT_LIKE_TYPE, contentId });
export const searchSpotAction = ({ areaCode, contentTypeId, keyword, numOfRows, pageNo }) => ({
    type: SEARCH_SPOT_TYPE,
    areaCode,
    contentTypeId,
    keyword,
    pageNo,
    numOfRows,
});
export const spotInitializeAction = () => ({
    type: SPOT_INITIALIZE_TYPE,
});

export const spotInitializeFormAction = (form) => ({
    type: SPOT_INITIALIZE_FORM_TYPE,
    form,
});

export const changeSpotDataAction = ({ property, value }) => ({
    type: CHANGE_SPOT_DATA_TYPE,
    property,
    value,
});

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
    areas: [],
    spots: {},
    detail: {},
    spotError: null,
    spotData: {
        areaCode: 1,
        pageNo: 1,
        contentTypeId: 12,
        contentId: '',
    },
    isLike: { state: '' },
    contentTypeList: [
        { name: '관광지', code: 12 },
        { name: '문화시설', code: 14 },
        { name: '행사', code: 15 },
        { name: '레포츠', code: 28 },
        { name: '숙박', code: 32 },
        { name: '쇼핑', code: 38 },
        { name: '음식점', code: 39 },
    ],
};

function spotReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_AREAS_SUCCESS_TYPE:
            const areaList = action.payload.data.items;
            areaList.unshift({ rnum: '0', code: '0', name: '전체' });
            return {
                ...state,
                areas: areaList,
            };
        case LOAD_DETAIL_SPOT_FAILURE_TYPE:
            return {
                ...state,
                spotError: { detailError: action.payload.message },
            };
        case LOAD_AREAS_FAILURE_TYPE:
        case LOAD_SPOTS_FAILURE_TYPE:
        case ADD_SPOT_LIKE_FAILURE_TYPE:
        case REMOVE_SPOT_LIKE_FAILURE_TYPE:
        case SEARCH_SPOT_FAILURE_TYPE:
            return {
                ...state,
                spotError: action.payload.message,
            };
        case LOAD_SPOTS_SUCCESS_TYPE:
            return {
                ...state,
                spots: {
                    list: action.payload.data.items,
                    totalCount: action.payload.data.totalCount,
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
                    image: action.spotInfo.firstImage || action.spotInfo.image || '',
                    contentId: action.spotInfo.contentId,
                },
            };
        case ADD_SPOT_LIKE_SUCCESS_TYPE:
            const addUpdatedList = state.spots.list.map((spot) => {
                if (spot.contentId == state.spotData.contentId) {
                    return {
                        ...spot,
                        likeState: !spot.likeState,
                        likeCount: spot.likeCount + 1,
                    };
                }
                return spot;
            });

            return {
                ...state,
                isLike: { state: action.payload.state },
                spots: {
                    ...state.spots,
                    list: addUpdatedList,
                },
            };
        case REMOVE_SPOT_LIKE_SUCCESS_TYPE:
            const removeUpdatedList = state.spots.list.map((spot) => {
                if (spot.contentId == state.spotData.contentId) {
                    return {
                        ...spot,
                        likeState: !spot.likeState,
                        likeCount: spot.likeCount + 1,
                    };
                }
                return spot;
            });
            return {
                ...state,
                isLike: { state: action.payload.state },
                spots: {
                    ...state.spots,
                    list: removeUpdatedList,
                },
            };

        case SEARCH_SPOT_SUCCESS_TYPE:
            return {
                ...state,
                spots: {
                    list: action.payload.data.items,
                    totalCount: action.payload.data.totalCount,
                },
            };
        case SPOT_INITIALIZE_TYPE: {
            return {
                ...initialState,
                areas: [...state.areas],
            };
        }
        case SPOT_INITIALIZE_FORM_TYPE: {
            return { ...state, [action.form]: initialState[action.form] };
        }
        case CHANGE_SPOT_DATA_TYPE: {
            return {
                ...state,
                spotData: {
                    ...state.spotData,
                    [action.property]: action.value,
                },
            };
        }
        default:
            return state;
    }
}

export default spotReducer;
