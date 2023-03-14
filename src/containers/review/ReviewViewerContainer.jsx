import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import ReviewViewer from '../../components/review/ReviewViewer';
import { deleteReviewAction, loadReviewAction } from '../../modules/reviewModule';

const ReviewViewerContainer = ({ match, history }) => {
    const { reviewId } = match.params;
    const dispatch = useDispatch();
    const { auth, reviewData } = useSelector(({ authReducer, reviewReducer }) => ({
        auth: authReducer.account,
        reviewData: reviewReducer.review,
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

    return <ReviewViewer auth={auth} reviewData={reviewData} onPostEdit={onPostEdit} onPostDelete={onPostDelete} />;
};

export default withRouter(ReviewViewerContainer);
