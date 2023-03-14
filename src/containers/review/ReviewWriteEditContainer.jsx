import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import ReviewPost from '../../components/review/ReviewPost';
import { changeContentAction, updateReviewAction, writeReviewAction } from '../../modules/reviewModule';

const ReviewWriteEditContainer = ({ location, history }) => {
    const isEdit = location.pathname == '/reviews/edit' ? true : false;
    const dispatch = useDispatch();
    const { review } = useSelector(({ reviewReducer }) => ({
        review: reviewReducer.review,
    }));

    const onChangeText = (data) => {
        dispatch(changeContentAction(data));
    };

    const onCancel = () => {
        history.push(`/reviews/${review.reviewId}`);
    };

    const onWritePost = () => {
        if (isEdit) {
            dispatch(updateReviewAction(review));
            history.push(`/reviews/${review.reviewId}`);
        } else {
            dispatch(writeReviewAction(review));
        }
    };

    return <ReviewPost reviewData={review} onChangeText={onChangeText} onCancel={onCancel} onWritePost={onWritePost} isEdit={isEdit} />;
};

export default withRouter(ReviewWriteEditContainer);
