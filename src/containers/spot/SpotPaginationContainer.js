import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SpotPagination from '../../components/spot/SpotPagination';
import { updateAreaNum, updateBlockNum, updatePageNum } from '../../modules/spotModule';

const SpotPaginationContainer = (spots, currentInfo, updatePageNum, updateBlockNum) => {
    const { areaNum, pageNum, blockNum } = currentInfo;
    const { totalCount } = spots;

    const [totalPage, setTotalPage] = useState();
    const [blockArea, setBlockArea] = useState(0);
    const [countArr, setCountArr] = useState();
    const [pageArr, setPageArr] = useState();
    const pageLimit = 10;

    useEffect(() => {
        if (spots) {
            const createArr = () => {
                const iArr = [];
                for (let i = 0; i < totalPage; i++) {
                    iArr[i] = i + 1;
                }
                return iArr;
            };
            setTotalPage(Math.ceil(totalCount / 10));
            setBlockArea(blockNum * pageLimit);
            setCountArr(createArr);
        }
    }, [blockNum, blockArea, countArr, totalCount, totalPage, spots]);

    useEffect(() => {
        if (countArr) {
            setPageArr(countArr.slice(blockArea, pageLimit + blockArea));
        }
    }, [blockArea, countArr]);

    const onFirstPage = () => {
        updatePageNum(1);
        updateBlockNum(0);
    };
    const onLastPage = () => {
        updatePageNum(totalPage);
        updateBlockNum(Math.floor(totalPage / pageLimit));
    };

    const onPrevPage = () => {
        if (pageNum <= 1) return;
        if (pageNum - 1 <= pageLimit * blockNum) {
            updateBlockNum(blockNum - 1);
        }
        updatePageNum(pageNum - 1);
    };
    const onNextPage = () => {
        if (pageNum >= totalPage) return;
        if (pageLimit * (blockNum + 1) < pageNum + 1) {
            updateBlockNum(blockNum + 1);
        }
        updatePageNum(pageNum + 1);
    };

    <SpotPagination pageArr={pageArr} onFirstPage={onFirstPage} onLastPage={onLastPage} onNextPage={onNextPage} onPrevPage={onPrevPage} onUpdatePageNum={updatePageNum} />;
};

export default connect(
    (state) => ({
        spots: state.spotReducer.spots,
        currentInfo: state.spotReducer.currentInfo,
    }),
    {
        updateAreaNum,
        updatePageNum,
        updateBlockNum,
    },
)(SpotPaginationContainer);
