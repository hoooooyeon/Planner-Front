import { connect } from 'react-redux';
import Pagination from '../../components/common/Pagination.js';
import { changePageIndexAction } from '../../modules/spotModule';

const SpotPaginationContainer = ({ spots, spotData, changePageIndexAction }) => {
    const { totalCount } = { ...spots };
    const { pageNo } = { ...spotData };

    const onIndexPage = (index) => {
        changePageIndexAction(index);
    };
    const onNextPage = (maxPage) => {
        if (pageNo < maxPage) {
            changePageIndexAction(pageNo + 1);
        }
    };
    const onPreviousPage = () => {
        if (pageNo > 1) {
            changePageIndexAction(pageNo - 1);
        }
    };
    const onFirstPage = () => {
        changePageIndexAction(1);
    };
    const onLastPage = (maxPage) => {
        changePageIndexAction(maxPage);
    };

    return (
        <Pagination
            onIndexPage={onIndexPage}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
            onFirstPage={onFirstPage}
            onLastPage={onLastPage}
            page={pageNo}
            totalCount={totalCount}
            itemIndex={12}
        />
    );
};

export default connect(
    (state) => ({
        spots: state.spotReducer.spots,
        spotData: state.spotReducer.spotData,
    }),
    {
        changePageIndexAction,
    },
)(SpotPaginationContainer);
