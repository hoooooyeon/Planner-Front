import * as spotAPI from '../lib/api/spotAPI';
import { takeLatest } from 'redux-saga/effects';
import createSaga from '../lib/createSaga';

export const LOAD_AREAS_TYPE = 'spot/LOAD_AREAS';
const LOAD_AREAS_SUCCESS_TYPE = 'spot/LOAD_AREAS_SUCCESS';
const LOAD_AREAS_FAILURE_TYPE = 'spot/LOAD_AREAS_FAILURE';

export const LOAD_SPOTS_TYPE = 'spot/LOAD_SPOTS';
const LOAD_SPOTS_SUCCESS_TYPE = 'spot/LOAD_SPOTS_SUCCESS';
const LOAD_SPOTS_FAILURE_TYPE = 'spot/LOAD_SPOTS_FAILURE';

const CHANGE_AREA_INDEX_TYPE = 'spot/CHANGE_AREA_INDEX';
const CHANGE_PAGE_INDEX_TYPE = 'spot/CHANGE_PAGE_INDEX';
const CHANGE_CONTENT_ID_TYPE = 'spot/CHANGE_CONTENT_ID';

export const LOAD_DETAIL_SPOT_TYPE = 'spot/LOAD_DETAIL_SPOT';
const LOAD_DETAIL_SPOT_SUCCESS_TYPE = 'spot/LOAD_DETAIL_SPOT_SUCCESS';
const LOAD_DETAIL_SPOT_FAILURE_TYPE = 'spot/LOAD_DETAIL_SPOT_FAILURE';

const RESET_DETAIL_SPOT_TYPE = 'spot/RESET_DETAIL_SPOT';
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

const CHANGE_CONTENT_TYPE_ID_TYPE = 'spot/CHANGE_CONTENT_TYPE_ID';

const RESET_SPOT_ERROR_TYPE = 'spot/RESET_SPOT_ERROR';
const SPOT_INITIALIZE_TYPE = 'spot/SPOT_INITIALIZE';
const SPOT_INITIALIZE_FORM_TYPE = 'spots/SPOT_INITIALIZE_FORM';

export const loadAreasAction = () => ({ type: LOAD_AREAS_TYPE });
export const loadSpotsAction = ({ areaCode, contentTypeId, pageNo, numOfRows }) => ({
    type: LOAD_SPOTS_TYPE,
    areaCode,
    contentTypeId,
    pageNo,
    numOfRows,
});
export const changeAreaIndexAction = (index) => ({ type: CHANGE_AREA_INDEX_TYPE, index });
export const changePageIndexAction = (index) => ({ type: CHANGE_PAGE_INDEX_TYPE, index });
export const changeContentIdAction = (id) => ({ type: CHANGE_CONTENT_ID_TYPE, id });
export const loadDetailSpotAction = ({ contentId }) => ({ type: LOAD_DETAIL_SPOT_TYPE, contentId });
export const resetDetailSpotAction = () => ({ type: RESET_DETAIL_SPOT_TYPE });
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
export const changeContentTypeIdAction = (contentTypeId) => ({ type: CHANGE_CONTENT_TYPE_ID_TYPE, contentTypeId });
export const resetSpotErrorAction = () => ({ type: RESET_SPOT_ERROR_TYPE });
export const spotInitializeAction = () => ({
    type: SPOT_INITIALIZE_TYPE,
});

export const spotInitializeFormAction = (form) => ({
    type: SPOT_INITIALIZE_FORM_TYPE,
    form,
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
    spotModal: false,
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

        case CHANGE_AREA_INDEX_TYPE:
            return {
                ...state,
                spotData: {
                    ...state.spotData,
                    areaCode: action.index,
                    pageNo: 1,
                },
            };
        case CHANGE_PAGE_INDEX_TYPE:
            return {
                ...state,
                spotData: {
                    ...state.spotData,
                    pageNo: action.index,
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
                    image: action.spotInfo.firstImage || action.spotInfo.image || '',
                    contentId: action.spotInfo.contentId,
                },
            };
        case RESET_DETAIL_SPOT_TYPE:
            return {
                ...state,
                detail: {},
                spotData: {
                    ...state.spotData,
                    contentId: '',
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
                    pageNo: 1,
                },
            };
        case RESET_SPOT_ERROR_TYPE:
            return {
                ...state,
                spotError: null,
            };
        case SPOT_INITIALIZE_TYPE: {
            return { ...initialState };
        }
        case SPOT_INITIALIZE_FORM_TYPE: {
            return { ...state, [action.form]: initialState[action.form] };
        }
        default:
            return state;
    }
}

export default spotReducer;
