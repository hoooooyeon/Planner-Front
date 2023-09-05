import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import ReviewListView from '../../components/review/ReviewListView';
import { changeUIStateAction, initializeReviewAction, loadReviewListAction } from '../../modules/reviewModule';

const areaCodes = [
    { id: '0', value: '전체' },
    { id: '1', value: '서울' },
    { id: '2', value: '인천' },
    { id: '3', value: '대전' },
    { id: '4', value: '대구' },
    { id: '5', value: '광주' },
    { id: '6', value: '부산' },
    { id: '7', value: '울산' },
    { id: '8', value: '세종특별자치시' },
    { id: '31', value: '경기도' },
    { id: '32', value: '강원도' },
    { id: '33', value: '충청북도' },
    { id: '34', value: '충청남도' },
    { id: '35', value: '경상북도' },
    { id: '36', value: '경상남도' },
    { id: '37', value: '전라북도' },
    { id: '38', value: '전라남도' },
    { id: '39', value: '제주도' },
];

const ReviewListContainer = ({ history, location, match }) => {
    const dispatch = useDispatch();
    const { loading, reviewList, uiState } = useSelector(({ loadingReducer, reviewReducer }) => ({
        loading: loadingReducer.loading,
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
            areaCodes={areaCodes}
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
