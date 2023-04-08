import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import ReviewViewer from '../../components/review/ReviewViewer';
import { deleteReviewAction, loadReviewAction } from '../../modules/reviewModule';
import { loadPlannerAction, resetPlannerAction } from '../../modules/plannerModule';

const ReviewViewerContainer = ({ match, history }) => {
    const { reviewId } = match.params;
    const dispatch = useDispatch();
    const { loading, auth, reviewData, planner } = useSelector(({ loadingReducer, authReducer, reviewReducer, plannerReducer }) => ({
        loading: loadingReducer.loading,
        auth: authReducer.account,
        reviewData: reviewReducer.review,
        planner: plannerReducer.planner,
    }));

    const onPostEdit = () => {
        history.push('/reviews/edit');
    };

    const onPostDelete = () => {
        dispatch(deleteReviewAction(reviewId));
    };

    useEffect(() => {
        dispatch(loadReviewAction(reviewId));
    }, [dispatch, reviewId]);

    useEffect(() => {
        if (reviewData) {
            const { plannerId } = reviewData;
            if (plannerId > 0) {
                dispatch(loadPlannerAction(plannerId));
            }
        }
    }, [dispatch, reviewData]);

    useEffect(() => {
        return () => {
            dispatch(resetPlannerAction());
        };
    }, []);

    return <ReviewViewer auth={auth} reviewData={reviewData} onPostEdit={onPostEdit} onPostDelete={onPostDelete} planner={planner} />;
};

export default withRouter(ReviewViewerContainer);
