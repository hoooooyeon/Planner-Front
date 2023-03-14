import createSaga from '../lib/createSaga';
import { takeLatest } from 'redux-saga/effects';
import * as reviewAPI from '../lib/api/reviewAPI';

// 액션 타입
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

// 액션
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

export const writeReviewAction = ({ plannerId, title, content, writer }) => ({
    type: writeReviewType,
    plannerId,
    title,
    content,
    writer
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

// saga
const loadReviewListSaga = createSaga(loadReviewListType, reviewAPI.loadReviewList);
const loadReviewSaga = createSaga(loadReviewType, reviewAPI.loadReview);
const writeReviewSaga = createSaga(writeReviewType, reviewAPI.writeReview);
const updateReviewSaga = createSaga(updateReviewType, reviewAPI.updateReview);
const deleteReviewSaga = createSaga(deleteReviewType, reviewAPI.deleteReview);

export function* reviewSaga() {
    yield takeLatest(loadReviewListType, loadReviewListSaga);
    yield takeLatest(loadReviewType, loadReviewSaga);
    yield takeLatest(writeReviewType, writeReviewSaga);
    yield takeLatest(updateReviewType, updateReviewSaga);
    yield takeLatest(deleteReviewType, deleteReviewSaga);
};

const initialState = {
    reviewList: [],
    review: {},
    status: {
        state: null,
        message: ''
    }
};

function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case loadReviewListSuccessType: {
            return { ...state, reviewList: action.payload.data };
        }
        case loadReviewSuccessType: {
            return { ...state, review: action.payload.data };
        }
        case changeContentType: {
            return { ...state, review: { ...state.review, [action.key]: action.value } };
        }
        case writeReviewSuccessType:
        case updateReviewSuccessType:
        case deleteReviewSuccessType:
        case loadReviewListFailureType:
        case loadReviewFailureType:
        case writeReviewFailureType:
        case updateReivewFailureType:
        case deleteReviewFailureType: {
            return { ...state, status: { state: action.payload.state, message: action.payload.message } };
        }
        default: {
            return state;
        }
    }
};

export default reviewReducer;