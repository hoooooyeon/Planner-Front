import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../../components/common/Pagination';
import { changePageNumAction } from '../../../modules/plannerModule';

const PlannerListPaginationContainer = () => {
    const dispatch = useDispatch();
    const { sharePlanners, plannerData } = useSelector(({ plannerReducer }) => ({
        sharePlanners: plannerReducer.sharePlanners,
        plannerData: plannerReducer.plannerData,
    }));

    const { totalCount } = { ...sharePlanners };
    const { pageNum } = { ...plannerData };

    // 현재 페이지
    const [page, setPage] = useState(1);

    const onIndexPage = (index) => {
        // setPage(index);
        dispatch(changePageNumAction(index));
    };
    const onNextPage = (maxPage) => {
        if (pageNum < maxPage) {
            // setPage((index) => index + 1);
            dispatch(changePageNumAction(pageNum + 1));
        }
    };
    const onPreviousPage = () => {
        if (pageNum > 1) {
            // setPage((index) => index - 1);
            dispatch(changePageNumAction(pageNum - 1));
        }
    };
    const onFirstPage = () => {
        // setPage(1);
        dispatch(changePageNumAction(1));
    };
    const onLastPage = (maxPage) => {
        // setPage(maxPage);
        dispatch(changePageNumAction(maxPage));
    };

    // useEffect(() => {
    //     dispatch(changePageNumAction(page));
    // }, [dispatch, page]);

    // useEffect(() => {
    //     if (pageNum) {
    //         setPage(pageNum);
    //     }
    // }, [pageNum]);
    return (
        <Pagination
            totalCount={totalCount}
            page={pageNum}
            itemIndex={12}
            onIndexPage={onIndexPage}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
            onFirstPage={onFirstPage}
            onLastPage={onLastPage}
        />
    );
};

export default PlannerListPaginationContainer;
