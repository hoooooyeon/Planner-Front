import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import ReviewListView from '../../components/review/ReviewListView';
import {
    LOAD_REVIEW_LIST_TYPE,
    changeUIStateAction,
    initializeReviewAction,
    loadReviewListAction,
} from '../../modules/reviewModule';

const ReviewListContainer = ({ history, location, match }) => {
    const dispatch = useDispatch();
    const { loading, reviewList, uiState } = useSelector(({ loadingReducer, reviewReducer }) => ({
        loading: loadingReducer[LOAD_REVIEW_LIST_TYPE],
        reviewList: reviewReducer.reviewList,
        uiState: reviewReducer.uiState,
    }));

    const { pageNum, itemCount } = uiState;
    const totalCount = (reviewList && reviewList.totalCount) || 0;

    function handleSelectAreaCode(areaCode) {
        dispatch(changeUIStateAction({ property: 'areaCode', value: { ...areaCode } }));
    }

    const handleSelectSortCriteria = (SortNum) => {
        dispatch(changeUIStateAction({ property: 'sortCriteria', value: SortNum }));
    };

    const handleChangeKeyword = (e) => {
        const value = e.target.value;
        dispatch(changeUIStateAction({ property: 'keyword', value }));
    };

    const handleSearchClick = () => {
        dispatch(loadReviewListAction({ ...uiState }));
    };

    const handleReviewWriteClick = () => {
        history.push(`/reviews/write`);
    };

    const handleItemClick = (reviewId) => {
        history.push(`/reviews/${reviewId}`);
    };

    // 페이지네이션 함수
    const handlePageChange = (page) => {
        dispatch(changeUIStateAction({ property: 'pageNum', value: page }));
    };
    const handleNextPage = () => {
        dispatch(changeUIStateAction({ property: 'pageNum', value: pageNum + 1 }));
    };
    const handlePreviousPage = () => {
        dispatch(changeUIStateAction({ property: 'pageNum', value: pageNum - 1 }));
    };
    const handleFirstPage = (startPage) => {
        dispatch(changeUIStateAction({ property: 'pageNum', value: startPage }));
    };
    const handleLastPage = (maxPage) => {
        dispatch(changeUIStateAction({ property: 'pageNum', value: maxPage }));
    };

    // const handleUpDownClick = () => {
    //     dispatch();
    // };

    useEffect(() => {
        dispatch(initializeReviewAction({ property: 'review' }));
    }, []);

    // 리스트 가져오기
    useEffect(() => {
        dispatch(loadReviewListAction({ ...uiState }));
    }, [dispatch, uiState.pageNum]);

    return (
        <ReviewListView
            loading={loading}
            reviewList={reviewList}
            uiState={uiState}
            onSelectAreaCode={handleSelectAreaCode}
            onSelectSortCriteria={handleSelectSortCriteria}
            onChangeKeyword={handleChangeKeyword}
            onSearchClick={handleSearchClick}
            onReviewWriteClick={handleReviewWriteClick}
            onItemClick={handleItemClick}
            page={pageNum}
            totalCount={totalCount}
            pageSize={itemCount}
            onPageChange={handlePageChange}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
            onFirstPage={handleFirstPage}
            onLastPage={handleLastPage}
        />
    );
};

export default withRouter(ReviewListContainer);
