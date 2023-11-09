import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import ReviewPost from '../../components/review/ReviewPost';
import {
    UPDATE_REVIEW_TYPE,
    WRITE_REVIEW_TYPE,
    changeContentAction,
    changePlannerInfoAction,
    fileUploadAction,
    initializeReviewAction,
    updateReviewAction,
    writeReviewAction,
} from '../../modules/reviewModule';
import {
    ACCOUNT_LIKE_PLANNER_LIST_LOAD_TYPE,
    ACCOUNT_MY_PLANNER_LIST_LOAD_TYPE,
    accountLikePlannerListLoadAction,
    accountMyPlannerListLoadAction,
    initializeAction,
} from '../../modules/accountModule';
import { loadPlannerAction } from '../../modules/plannerModule';

const ReviewWriteEditContainer = ({ location, history }) => {
    const isEdit = location.pathname == '/reviews/edit' ? true : false;
    const dispatch = useDispatch();
    const { loading, account, review, selectPlanner, newFileList, newReviewId, plannerList, uiState } = useSelector(
        ({ loadingReducer, authReducer, reviewReducer, plannerReducer, accountReducer }) => ({
            loading: {
                writeLoading: loadingReducer[WRITE_REVIEW_TYPE],
                updateLoading: loadingReducer[UPDATE_REVIEW_TYPE],
                myPlannerListLoading: loadingReducer[ACCOUNT_MY_PLANNER_LIST_LOAD_TYPE],
                likePlannerListLoading: loadingReducer[ACCOUNT_LIKE_PLANNER_LIST_LOAD_TYPE],
            },
            account: authReducer.account,
            review: reviewReducer.review,
            selectPlanner: isEdit ? plannerReducer.planner : reviewReducer.selectPlanner,
            newFileList: reviewReducer.newFileList,
            newReviewId: reviewReducer.newReviewId,
            plannerList: {
                myPlannerList: accountReducer.myPlannerList,
                likePlannerList: accountReducer.likeList.likePlannerList,
            },
            uiState: reviewReducer.uiState,
        }),
    );

    const handleChangeText = (data) => {
        dispatch(changeContentAction(data));
    };

    const handleCancel = () => {
        if (isEdit) {
            history.push(`/reviews/${review.reviewId}`);
        } else {
            history.push(`/reviews`);
        }
    };

    const handleWritePost = () => {
        const data = {
            ...review,
            writerId: account.accountId,
        };

        if (selectPlanner) {
            data.PlannerId = selectPlanner.plannerId;
        }

        if (isEdit) {
            const reviewId = review.reviewId;
            dispatch(updateReviewAction(data));
            history.push(`/reviews/${reviewId}`);
        } else {
            dispatch(writeReviewAction(data));
        }
    };

    const handleFileUpload = (formData) => {
        dispatch(fileUploadAction({ property: 'review', formData }));
    };

    const fileListUpdate = (fileList) => {
        dispatch(changeContentAction({ key: 'fileList', value: fileList }));
    };

    const handlePlannerListLoad = (type) => {
        const { accountId } = account;
        const { itemCount, sortCriteria, keyword, pageNum } = uiState;

        if (type === 'myPlannerList') {
            dispatch(accountMyPlannerListLoadAction({ accountId, itemCount, sortCriteria, pageNum }));
        } else {
            dispatch(
                accountLikePlannerListLoadAction({
                    accountId,
                    itemCount,
                    sortCriteria,
                    keyword,
                    postType: 1,
                    pageNum,
                }),
            );
        }
    };

    const handlePlannerChange = (planner) => {
        dispatch(changePlannerInfoAction(planner));
    };

    useEffect(() => {
        if (isEdit) {
            const { plannerId } = review;
            dispatch(loadPlannerAction(plannerId));
        }
    }, [dispatch]);

    useEffect(() => {
        return () => {
            // dispatch(initializeReviewAction({ property: 'newReviewId' }));
            dispatch(initializeAction());
        };
    }, [dispatch]);

    useEffect(() => {
        if (newReviewId) {
            history.push(`/reviews/${newReviewId}`);
        }
    }, [history, newReviewId]);

    return (
        <ReviewPost
            loading={loading}
            reviewData={review}
            selectPlanner={selectPlanner}
            newFileList={newFileList}
            onChangeText={handleChangeText}
            onCancel={handleCancel}
            onWritePost={handleWritePost}
            onFileUpload={handleFileUpload}
            fileListUpdate={fileListUpdate}
            isEdit={isEdit}
            plannerList={plannerList}
            onPlannerListLoad={handlePlannerListLoad}
            onPlannerChange={handlePlannerChange}
        />
    );
};

export default withRouter(ReviewWriteEditContainer);
