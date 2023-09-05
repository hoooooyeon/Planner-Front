import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Pagination from '../../components/common/Pagination.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { changePageAction, changeUIStateAction } from '../../modules/reviewModule';

const ReviewPaginationContainer = () => {
    const dispatch = useDispatch();
    const { uiState, totalCount } = useSelector(({ reviewReducer }) => ({
        uiState: reviewReducer.uiState,
        totalCount: reviewReducer.reviewList.totalCount,
    }));

    const { pageNum, itemCount } = uiState;

    const handlePageChange = (page) => {
        dispatch(changeUIStateAction({ property: 'pageNum', value: page }));
    };
    const handleNextPage = () => {
        dispatch(changeUIStateAction({ property: 'pageNum', value: pageNum + 1 }));
    };
    const handlePreviousPage = () => {
        dispatch(changeUIStateAction({ property: 'pageNum', value: pageNum - 1 }));
    };
    const handleFirstPage = () => {
        dispatch(changeUIStateAction({ property: 'pageNum', value: 1 }));
    };
    const handleLastPage = (maxPage) => {
        dispatch(changeUIStateAction({ property: 'pageNum', value: maxPage }));
    };

    return (
        <Pagination
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

export default ReviewPaginationContainer;
