import createSaga from '../lib/createSaga';
import { takeLatest } from 'redux-saga/effects';
import * as reviewAPI from '../lib/api/reviewAPI';

// 액션 타입
const INITIALIZE_REVIEW_TYPE = 'review/INITAILIZE'
const INITIALIZE_PROPERTY_TYPE = 'review/INITIALIZE_PORPERTY';
const CHANGE_UISTATE_TYPE = 'review/CHANGE_STATE';
const LOAD_REVIEW_LIST_TYPE = 'review/LOAD_REVIEWLIST';
const LOAD_REVIEW_LIST_SUCCESS_TYPE = 'review/LOAD_REVIEWLIST_SUCCESS';
const LOAD_REVIEW_LIST_FAILURE_TYPE = 'review/LOAD_REVIEWLIST_FAILURE';
const REVIEW_PAGE_CHANGE_TYPE = 'review/REVIEW_PAGE_CHANGE';
const LOAD_REVIEW_TYPE = 'review/LOAD_REVIEW';
const LOAD_REVIEW_SUCCESS_TYPE = 'review/LOAD_REVIEW_SUCCESS';
const LOAD_REVIEW_FAILURE_TYPE = 'review/LOAD_REVIEW_FAILURE';
const CHANGE_CONTENT_TYPE = 'review/CHANGE_CONTENT';
const WRITE_REVIEW_TYPE = 'review/WRITE_REVIEW';
const WRITE_REVIEW_SUCCESS_TYPE = 'review/WRITE_REVIEW_SUCCESS';
const WRITE_REVIEW_FAILURE_TYPE = 'review/WRITE_REVIEW_FAILURE';
const UPDATE_REVIEW_TYPE = 'review/UPDATE_REVIEW';
const UPDATE_REVIEW_SUCCESS_TYPE = 'review/UPDATE_REVIEW_SUCCESS';
const UPDATE_REVIEW_FAILURE_TYPE = 'review/UPDATE_REVIEW_FAILURE';
const DELETE_REVIEW_TYPE = 'review/DELETE_REVIEW';
const DELETE_REVIEW_SUCCESS_TYPE = 'review/DELETE_REVIEW_SUCCESS';
const DELETE_REVIEW_FAILURE_TYPE = 'review/DELETE_REVIEW_FAILURE';
const FILE_UPLOAD_TYPE = 'review/FILE_UPLOAD';
const FILE_UPLOAD_SUCCESS_TYPE = 'review/FILE_UPLOAD_SUCCESS';
const FILE_UPLOAD_FAILURE_TYPE = 'review/FILE_UPLOAD_FAILURE';
const CHANGE_PLANNER_INFO_TYPE = 'review/CHANGE_PLANNER_INFO';

const WRITE_COMMENT_TYPE = 'reivew/WRITE_COMMENT';
const WRITE_COMMENT_SUCCESS_TYPE = 'reivew/WRITE_COMMENT_SUCCESS';
const WRITE_COMMENT_FAILURE_TYPE = 'reivew/WRITE_COMMENT_FAILURE';
const UPDATE_COMMENT_TYPE = 'reivew/UPDATE_COMMENT';
const UPDATE_COMMENT_SUCCESS_TYPE = 'reivew/UPDATE_COMMENT_SUCCESS';
const UPDATE_COMMENT_FAILURE_TYPE = 'reivew/UPDATE_COMMENT_FAILURE';
const DELETE_COMMENT_TYPE = 'reivew/DELETE_COMMENT';
const DELETE_COMMENT_SUCCESS_TYPE = 'reivew/DELETE_COMMENT_SUCCESS';
const DELETE_COMMENT_FAILURE_TYPE = 'reivew/DELETE_COMMENT_FAILURE';

const RECOMMEND_REVIEW_TYPE = 'review/RECOMMEND_REVIEW';
const RECOMMEND_REVIEW_SUCCESS_TYPE = 'review/RECOMMEND_REVIEW_SUCCESS';
const RECOMMEND_REVIEW_FAILURE_TYPE = 'review/RECOMMEND_REVIEW_FAILURE';
const UNRECOMMEND_REVIEW_TYPE = 'review/UNRECOMMEND_REVIEW';
const UNRECOMMEND_REVIEW_SUCCESS_TYPE = 'review/UNRECOMMEND_REVIEW_SUCCESS';
const UNRECOMMEND_REVIEW_FAILURE_TYPE = 'review/UNRECOMMEND_REVIEW_FAILURE';


// 액션
export const initializeReviewAction = () => ({
    type: INITIALIZE_REVIEW_TYPE,
});

export const initializePropertyAction = ({ property, value }) => ({
    type: INITIALIZE_PROPERTY_TYPE,
    property,
    value
});

export function changeUIStateAction({ property, value }) {
    return ({
        type: CHANGE_UISTATE_TYPE,
        property,
        value
    });
}

export const loadReviewListAction = ({ itemCount, sortCriteria, keyword, pageNum }) => ({
    type: LOAD_REVIEW_LIST_TYPE,
    itemCount,
    sortCriteria,
    keyword,
    pageNum
});

export const loadReviewAction = (reviewId) => ({
    type: LOAD_REVIEW_TYPE,
    reviewId
});

export const changeContentAction = ({ key, value }) => ({
    type: CHANGE_CONTENT_TYPE,
    key,
    value
});

export const changePageAction = (page) => ({
    type: REVIEW_PAGE_CHANGE_TYPE,
    page
});

export const writeReviewAction = (review) => ({
    type: WRITE_REVIEW_TYPE,
    ...review,
});

export const updateReviewAction = ({ reviewId, title, content }) => ({
    type: UPDATE_REVIEW_TYPE,
    reviewId,
    title,
    content
});

export const deleteReviewAction = (reviewId) => ({
    type: DELETE_REVIEW_TYPE,
    reviewId
});

export const changePlannerInfoAction = (selectPlanner) => ({
    type: CHANGE_PLANNER_INFO_TYPE,
    selectPlanner
})

export const fileUploadAction = ({ property, formData }) => ({
    type: FILE_UPLOAD_TYPE,
    property,
    formData
});

export const writeCommentAction = ({ reviewId, writerId, writer, content, parentId }) => ({
    type: WRITE_COMMENT_TYPE,
    reviewId,
    writerId,
    writer,
    content,
    parentId
})

export const updateCommentAction = ({ reviewId, commentId, content }) => ({
    type: UPDATE_COMMENT_TYPE,
    commentId,
    reviewId,
    content
})

export const deleteCommentAction = ({ reviewId, commentId }) => ({
    type: DELETE_COMMENT_TYPE,
    reviewId,
    commentId
})

// export const recommendReviewAction = () => ({
//     type: RECOMMEND_REVIEW_TYPE
// })

// export const unrecommendReviewAction = () => ({
//     type: UNRECOMMEND_REVIEW_TYPE
// })

// saga
const loadReviewListSaga = createSaga(LOAD_REVIEW_LIST_TYPE, reviewAPI.loadReviewList);
const loadReviewSaga = createSaga(LOAD_REVIEW_TYPE, reviewAPI.loadReview);
const writeReviewSaga = createSaga(WRITE_REVIEW_TYPE, reviewAPI.writeReview);
const updateReviewSaga = createSaga(UPDATE_REVIEW_TYPE, reviewAPI.updateReview);
const deleteReviewSaga = createSaga(DELETE_REVIEW_TYPE, reviewAPI.deleteReview);
const fileUploadSaga = createSaga(FILE_UPLOAD_TYPE, reviewAPI.fileUpload);
const writeCommentSaga = createSaga(WRITE_COMMENT_TYPE, reviewAPI.writeComment);
const updateCommentSaga = createSaga(UPDATE_COMMENT_TYPE, reviewAPI.updateComment);
const deleteCommentSaga = createSaga(DELETE_COMMENT_TYPE, reviewAPI.deleteComment);
// const recommendReviewSaga = createSaga(RECOMMEND_REVIEW_TYPE, reviewAPI.recommendReview);
// const unrecommendReviewSaga = createSaga(UNRECOMMEND_REVIEW_TYPE, reviewAPI.unrecommendReview);

export function* reviewSaga() {
    yield takeLatest(LOAD_REVIEW_LIST_TYPE, loadReviewListSaga);
    yield takeLatest(LOAD_REVIEW_TYPE, loadReviewSaga);
    yield takeLatest(WRITE_REVIEW_TYPE, writeReviewSaga);
    yield takeLatest(UPDATE_REVIEW_TYPE, updateReviewSaga);
    yield takeLatest(DELETE_REVIEW_TYPE, deleteReviewSaga);
    yield takeLatest(FILE_UPLOAD_TYPE, fileUploadSaga);
    yield takeLatest(WRITE_COMMENT_TYPE, writeCommentSaga);
    yield takeLatest(UPDATE_COMMENT_TYPE, updateCommentSaga);
    yield takeLatest(DELETE_COMMENT_TYPE, deleteCommentSaga);
    // yield takeLatest(RECOMMEND_REVIEW_TYPE, recommendReviewSaga);
    // yield takeLatest(UNRECOMMEND_REVIEW_TYPE, unrecommendReviewSaga);
};

const initialState = {
    reviewList: null,
    review: null,
    uiState: {
        areaCode: 1,
        itemCount: 10,
        sortCriteria: 2,
        keyword: '',
        pageNum: 1,
    },
    selectPlanner: null,
    newFileList: [],
    newReviewId: null,
    newCommentId: null,
    commentUpdate: false,
    status: {
        state: null,
        message: ''
    }
};

function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case INITIALIZE_REVIEW_TYPE: {
            return { ...initialState };
        }
        case INITIALIZE_PROPERTY_TYPE: {
            return { ...state, [action.property]: action.value };
        }
        case CHANGE_UISTATE_TYPE: {
            return { ...state, uiState: { ...state.uiState, [action.property]: action.value } }
        }
        case LOAD_REVIEW_LIST_SUCCESS_TYPE: {
            return { ...state, reviewList: action.payload.data };
        }
        case LOAD_REVIEW_SUCCESS_TYPE: {
            return { ...state, review: action.payload.data };
        }
        case CHANGE_CONTENT_TYPE: {
            return { ...state, review: { ...state.review, [action.key]: action.value } };
        }
        case REVIEW_PAGE_CHANGE_TYPE: {
            return { ...state, page: action.page };
        }
        case WRITE_REVIEW_SUCCESS_TYPE: {
            return { ...state, newReviewId: action.payload.data };
        }
        case UPDATE_REVIEW_SUCCESS_TYPE: {
            return { ...state, status: { state: action.payload.state, message: action.payload.message } };
        }
        case DELETE_REVIEW_SUCCESS_TYPE: return state;
        case FILE_UPLOAD_SUCCESS_TYPE: {
            return { ...state, newFileList: action.payload.data };
        }
        case CHANGE_PLANNER_INFO_TYPE: {
            return { ...state, selectPlanner: action.selectPlanner }
        }
        case WRITE_COMMENT_SUCCESS_TYPE: {
            return { ...state, newCommentId: action.payload.data };
        }
        case UPDATE_COMMENT_SUCCESS_TYPE: {
            return { ...state, commentUpdate: action.payload.state };
        }
        case DELETE_COMMENT_SUCCESS_TYPE: return state;
        case LOAD_REVIEW_LIST_FAILURE_TYPE:
        case LOAD_REVIEW_FAILURE_TYPE:
        case WRITE_REVIEW_FAILURE_TYPE:
        case UPDATE_REVIEW_FAILURE_TYPE:
        case DELETE_REVIEW_FAILURE_TYPE:
        case FILE_UPLOAD_FAILURE_TYPE:
        case WRITE_COMMENT_FAILURE_TYPE:
        case DELETE_COMMENT_FAILURE_TYPE: {
            return { ...state, status: { state: action.payload.state, message: action.payload.message } };
        }
        default: {
            return state;
        }
    }
};

export default reviewReducer;