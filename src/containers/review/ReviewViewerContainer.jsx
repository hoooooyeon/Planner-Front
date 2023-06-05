import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import ReviewViewer from '../../components/review/ReviewViewer';
import {
    deleteCommentAction,
    deleteReviewAction,
    initializePropertyAction,
    loadReviewAction,
    updateCommentAction,
    writeCommentAction,
} from '../../modules/reviewModule';
import { loadPlannerAction, resetPlannerAction } from '../../modules/plannerModule';

const ReviewViewerContainer = ({ match, history }) => {
    const { reviewId } = match.params;
    const dispatch = useDispatch();
    const { loading, auth, reviewData, newCommentId, commentUpdate, planner } = useSelector(
        ({ loadingReducer, authReducer, reviewReducer, plannerReducer }) => ({
            loading: loadingReducer.loading,
            auth: authReducer.account,
            reviewData: reviewReducer.review,
            newCommentId: reviewReducer.newCommentId,
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

    useEffect(() => {
        if (commentUpdate) {
            dispatch(loadReviewAction(reviewId));
            dispatch(initializePropertyAction('commentUpdate', false));
        }
    }, [dispatch, commentUpdate]);

    useEffect(() => {
        return () => {
            dispatch(resetPlannerAction());
        };
    }, []);

    return (
        <ReviewViewer
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

export default withRouter(ReviewViewerContainer);
