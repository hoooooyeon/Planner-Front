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

    const onIndexPage = (index) => {
        dispatch(changePageNumAction(index));
    };
    const onNextPage = (maxPage) => {
        if (pageNum < maxPage) {
            dispatch(changePageNumAction(pageNum + 1));
        }
    };
    const onPreviousPage = () => {
        if (pageNum > 1) {
            dispatch(changePageNumAction(pageNum - 1));
        }
    };
    const onFirstPage = () => {
        dispatch(changePageNumAction(1));
    };
    const onLastPage = (maxPage) => {
        dispatch(changePageNumAction(maxPage));
    };

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
