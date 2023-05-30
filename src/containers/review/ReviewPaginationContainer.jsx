import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Pagination from '../../components/common/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { changePageAction } from '../../modules/reviewModule';

const ReviewPaginationContainer = () => {
    const dispatch = useDispatch();
    const { page, totalCount } = useSelector(({ reviewReducer }) => ({
        page: reviewReducer.page,
        totalCount: reviewReducer.totalCount,
    }));
    const [pageIndex, setPageIndex] = useState(1);

    const onIndexPage = (index) => {
        setPageIndex(index);
    };
    const onNextPage = () => {
        setPageIndex((index) => index + 1);
    };
    const onPreviousPage = () => {
        setPageIndex((index) => index - 1);
    };
    const onFirstPage = () => {
        setPageIndex(1);
    };
    const onLastPage = (maxPageIndex) => {
        setPageIndex(maxPageIndex);
    };
    useEffect(() => {
        dispatch(changePageAction(pageIndex));
    }, [pageIndex]);

    return (
        <Pagination
            page={page}
            totalCount={totalCount}
            limitIndex={10}
            onIndexPage={onIndexPage}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
            onFirstPage={onFirstPage}
            onLastPage={onLastPage}
        />
    );
};

export default ReviewPaginationContainer;
