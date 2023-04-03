import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import ReviewPost from '../../components/review/ReviewPost';
import { changeContentAction, fileUploadAction, initializeReviewAction, updateReviewAction, writeReviewAction } from '../../modules/reviewModule';

const ReviewWriteEditContainer = ({ location, history }) => {
    const isEdit = location.pathname == '/reviews/edit' ? true : false;
    const dispatch = useDispatch();
    const { review, newFileList, newReviewId } = useSelector(({ reviewReducer }) => ({
        review: reviewReducer.review,
        newFileList: reviewReducer.newFileList,
        newReviewId: reviewReducer.newReviewId,
    }));

    const plannerList = [
        {
            plannerId: 1,
            accountId: 1,
            creator: 'test',
            title: '이렇게 재미있는 천안 여행!',
            planDateStart: '2023-01-29',
            planDateEnd: '2023-01-31',
            expense: 100000,
            memberCount: 3,
            memberTypeId: 3,
            likeCount: 0,
            createDate: '2023-03-05 17:36:59',
            updateDate: '2023-03-15 23:37:46',
        },
        {
            plannerId: 2,
            accountId: 1,
            creator: 'test',
            title: '초보여행',
            planDateStart: '2022-08-10',
            planDateEnd: '2022-08-12',
            expense: 0,
            memberCount: 1,
            memberTypeId: 1,
            likeCount: 0,
            createDate: '2023-03-07 20:54:19',
            updateDate: '2023-03-07 20:54:19',
        },
    ];

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

    const onWritePost = () => {
        const data = {
            ...review,
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

    const fileListUpdate = (fileList) => {
        dispatch(changeContentAction({ key: 'fileList', value: fileList }));
    };

    const onPlannerListLoad = () => {
        dispatch();
    };

    const onPlannerSelect = (plannerId) => {
        dispatch(changeContentAction({ key: 'plannerId', value: plannerId }));
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

    return (
        <ReviewPost
            reviewData={review}
            onChangeText={onChangeText}
            newFileList={newFileList}
            onCancel={onCancel}
            onWritePost={onWritePost}
            onFileUpload={onFileUpload}
            fileListUpdate={fileListUpdate}
            isEdit={isEdit}
            plannerList={plannerList}
            onPlannerSelect={onPlannerSelect}
        />
    );
};

export default withRouter(ReviewWriteEditContainer);
