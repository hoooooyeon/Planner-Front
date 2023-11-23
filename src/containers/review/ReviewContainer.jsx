import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import Review from '../../components/review/Review';
import {
    DELETE_REVIEW_TYPE,
    LOAD_REVIEW_TYPE,
    UPDATE_REVIEW_TYPE,
    WRITE_REVIEW_TYPE,
    deleteCommentAction,
    deleteReviewAction,
    initializePropertyAction,
    initializeReviewAction,
    loadReviewAction,
    updateCommentAction,
    writeCommentAction,
} from '../../modules/reviewModule';
import {
    LOAD_PLANNER_TYPE,
    loadPlannerAction,
    resetPlannerDataAction,
    plannerInitializePropertyAction,
} from '../../modules/plannerModule';

const ReviewContainer = ({ match, history }) => {
    const { reviewId } = match.params;
    const dispatch = useDispatch();
    const { loading, auth, reviewData, newCommentId, deleteReview, commentUpdate, planner } = useSelector(
        ({ loadingReducer, authReducer, reviewReducer, plannerReducer }) => ({
            loading: {
                loadLoading: loadingReducer[LOAD_REVIEW_TYPE],
                wrtieLoading: loadingReducer[WRITE_REVIEW_TYPE],
                updateLoading: loadingReducer[UPDATE_REVIEW_TYPE],
                deleteLoading: loadingReducer[DELETE_REVIEW_TYPE],
                plannerLoading: loadingReducer[LOAD_PLANNER_TYPE],
            },
            auth: authReducer.account,
            reviewData: reviewReducer.review,
            newCommentId: reviewReducer.newCommentId,
            deleteReview: reviewReducer.deleteReview,
            commentUpdate: reviewReducer.commentUpdate,
            planner: plannerReducer.planner,
        }),
    );

    const onPostEdit = () => {
        history.push('/reviews/edit');
    };

    const onPostDelete = () => {
        dispatch(deleteReviewAction(reviewId));
    };

    const onCommentWrite = ({ editMode, reCommentMode, commentId, commentText }) => {
        if (editMode) {
            dispatch(
                updateCommentAction({
                    reviewId: reviewData.reviewId,
                    commentId,
                    content: commentText,
                }),
            );
        } else if (reCommentMode) {
            dispatch(
                writeCommentAction({
                    reviewId: reviewData.reviewId,
                    writerId: auth.accountId,
                    writer: auth.nickname,
                    content: commentText,
                    parentId: commentId,
                }),
            );
        } else {
            dispatch(
                writeCommentAction({
                    reviewId: reviewData.reviewId,
                    writerId: auth.accountId,
                    writer: auth.nickname,
                    content: commentText,
                    parentId: null,
                }),
            );
        }
    };

    const onCommentDelete = (commentId) => {
        dispatch(
            deleteCommentAction({
                reviewId: reviewData.reviewId,
                commentId: commentId,
            }),
        );
    };

    useEffect(() => {
        dispatch(loadReviewAction(reviewId));
    }, [dispatch, reviewId, newCommentId]);

    useEffect(() => {
        if (reviewData) {
            const { plannerId } = reviewData;
            if (plannerId > 0) {
                dispatch(loadPlannerAction(plannerId));
            }
        }
    }, [dispatch, reviewData]);

    // 리뷰 삭제 성공
    useEffect(() => {
        if (deleteReview) {
            dispatch(initializePropertyAction('deleteReview', false));
            history.push('/reviews');
        }
    }, [deleteReview]);

    useEffect(() => {
        if (commentUpdate) {
            dispatch(loadReviewAction(reviewId));
            dispatch(initializePropertyAction('commentUpdate', false));
        }
    }, [dispatch, commentUpdate]);

    useEffect(() => {
        dispatch(initializeReviewAction());
        return () => {
            // dispatch(resetPlannerDataAction());
            dispatch(plannerInitializePropertyAction('plannerData'));
            dispatch(plannerInitializePropertyAction('planner'));
        };
    }, []);

    return (
        <Review
            loading={loading}
            auth={auth}
            reviewData={reviewData}
            onPostEdit={onPostEdit}
            onPostDelete={onPostDelete}
            onCommentWrite={onCommentWrite}
            onCommentDelete={onCommentDelete}
            planner={planner}
        />
    );
};

export default withRouter(ReviewContainer);
