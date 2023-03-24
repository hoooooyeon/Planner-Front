import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import ReviewPost from '../../components/review/ReviewPost';
import { changeContentAction, fileUploadAction, initializeReviewAction, updateReviewAction, writeReviewAction } from '../../modules/reviewModule';

const ReviewWriteEditContainer = ({ location, history }) => {
    const isEdit = location.pathname == '/reviews/edit' ? true : false;
    const dispatch = useDispatch();
    const { review, fileList, newReviewId } = useSelector(({ reviewReducer }) => ({
        review: reviewReducer.review,
        fileList: reviewReducer.fileList,
        newReviewId: reviewReducer.newReviewId,
    }));

    const onChangeText = (data) => {
        dispatch(changeContentAction(data));
    };

    const onCancel = () => {
        if (isEdit) {
            history.push(`/reviews/${review.reviewId}`);
        } else {
            history.push(`/reviews`);
        }
    };

    const onWritePost = (fileList) => {
        const data = {
            ...review,
            fileList: fileList,
        };
        const reviewId = review.reviewId;
        if (isEdit) {
            dispatch(updateReviewAction(data));
            history.push(`/reviews/${reviewId}`);
        } else {
            dispatch(writeReviewAction(data, 0, 'test'));
        }
    };

    const onFileUpload = (formData) => {
        dispatch(fileUploadAction({ property: 'review', formData }));
    };

    useEffect(() => {
        return () => {
            dispatch(initializeReviewAction({ property: 'newReviewId' }));
        };
    }, [dispatch]);

    useEffect(() => {
        if (newReviewId) {
            history.push(`/reviews/${newReviewId}`);
        }
    }, [history, newReviewId]);

    return <ReviewPost reviewData={review} onChangeText={onChangeText} fileList={fileList} onCancel={onCancel} onWritePost={onWritePost} onFileUpload={onFileUpload} isEdit={isEdit} />;
};

export default withRouter(ReviewWriteEditContainer);
