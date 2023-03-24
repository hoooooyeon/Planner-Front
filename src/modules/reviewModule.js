import createSaga from '../lib/createSaga';
import { takeLatest } from 'redux-saga/effects';
import * as reviewAPI from '../lib/api/reviewAPI';

// 액션 타입
const initializeReviewType = 'review/INITAILIZE'
const loadReviewListType = 'review/LOAD_REVIEWLIST';
const loadReviewListSuccessType = 'review/LOAD_REVIEWLIST_SUCCESS';
const loadReviewListFailureType = 'review/LOAD_REVIEWLIST_FAILURE';
const loadReviewType = 'review/LOAD_REVIEW';
const loadReviewSuccessType = 'review/LOAD_REVIEW_SUCCESS';
const loadReviewFailureType = 'review/LOAD_REVIEW_FAILURE';
const changeContentType = 'review/CHANGE_CONTENT';
const writeReviewType = 'review/WRITE_REVIEW';
const writeReviewSuccessType = 'review/WRITE_REVIEW_SUCCESS';
const writeReviewFailureType = 'review/WRITE_REVIEW_FAILURE';
const updateReviewType = 'review/UPDATE_REVIEW';
const updateReviewSuccessType = 'review/UPDATE_REVIEW_SUCCESS';
const updateReivewFailureType = 'review/UPDATE_REVIEW_FAILURE';
const deleteReviewType = 'review/DELETE_REVIEW';
const deleteReviewSuccessType = 'review/DELETE_REVIEW_SUCCESS';
const deleteReviewFailureType = 'review/DELETE_REVIEW_FAILURE';
const fileUploadType = 'review/FILE_UPLOAD';
const fileUploadSuccessType = 'review/FILE_UPLOAD_SUCCESS';
const fileUploadFailureType = 'review/FILE_UPLOAD_FAILURE';

// 액션
export const initializeReviewAction = ({ property, value }) => ({
    type: initializeReviewType,
    property,
    value
});

export const loadReviewListAction = () => ({
    type: loadReviewListType
});

export const loadReviewAction = (reviewId) => ({
    type: loadReviewType,
    reviewId
});

export const changeContentAction = ({ key, value }) => ({
    type: changeContentType,
    key,
    value
});

export const writeReviewAction = (review, plannerId, nickName) => ({
    type: writeReviewType,
    ...review,
    writer: nickName
});

export const updateReviewAction = ({ reviewId, title, content }) => ({
    type: updateReviewType,
    reviewId,
    title,
    content
});

export const deleteReviewAction = (reviewId) => ({
    type: deleteReviewType,
    reviewId
});

export const fileUploadAction = ({ property, formData }) => ({
    type: fileUploadType,
    property,
    formData
});

// saga
const loadReviewListSaga = createSaga(loadReviewListType, reviewAPI.loadReviewList);
const loadReviewSaga = createSaga(loadReviewType, reviewAPI.loadReview);
const writeReviewSaga = createSaga(writeReviewType, reviewAPI.writeReview);
const updateReviewSaga = createSaga(updateReviewType, reviewAPI.updateReview);
const deleteReviewSaga = createSaga(deleteReviewType, reviewAPI.deleteReview);
const fileUploadSaga = createSaga(fileUploadType, reviewAPI.fileUpload);

export function* reviewSaga() {
    yield takeLatest(loadReviewListType, loadReviewListSaga);
    yield takeLatest(loadReviewType, loadReviewSaga);
    yield takeLatest(writeReviewType, writeReviewSaga);
    yield takeLatest(updateReviewType, updateReviewSaga);
    yield takeLatest(deleteReviewType, deleteReviewSaga);
    yield takeLatest(fileUploadType, fileUploadSaga);
};

const initialState = {
    reviewList: [],
    review: {},
    fileList: [],
    newReviewId: null,
    status: {
        state: null,
        message: ''
    }
};

function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case initializeReviewType: {
            return { ...initialState };
            //return { ...state, [action.property]: action.value || initialState[action.property] };
        }
        case loadReviewListSuccessType: {
            return { ...state, reviewList: action.payload.data };
        }
        case loadReviewSuccessType: {
            return { ...state, review: action.payload.data };
        }
        case changeContentType: {
            return { ...state, review: { ...state.review, [action.key]: action.value } };
        }
        case writeReviewSuccessType: {
            return { ...state, newReviewId: action.payload.data };
        }
        case updateReviewSuccessType: {
            return { ...state, status: { state: action.payload.state, message: action.payload.message } };
        }
        case deleteReviewSuccessType: return;
        case fileUploadSuccessType: {
            return { ...state, fileList: action.payload.data };
        }
        case loadReviewListFailureType:
        case loadReviewFailureType:
        case writeReviewFailureType:
        case updateReivewFailureType:
        case deleteReviewFailureType:
        case fileUploadFailureType: {
            return { ...state, status: { state: action.payload.state, message: action.payload.message } };
        }
        default: {
            return state;
        }
    }
};

export default reviewReducer;