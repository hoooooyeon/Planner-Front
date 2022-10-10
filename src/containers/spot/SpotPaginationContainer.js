import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SpotPagination from '../../components/spot/SpotPagination';
import { updateAreaNum, updateBlockNum, updatePageNum, updateTotalPage, updatePagination } from '../../modules/spotModule';

const SpotPaginationContainer = ({ spots, currentInfo, updatePageNum, updateBlockNum, updateTotalPage, updatePagination }) => {
    const { pageNum, blockNum, totalPage } = currentInfo;

    const [blockArea, setBlockArea] = useState(0); // 페이지네이션 block의 기준
    const [countArr, setCountArr] = useState(); // 페이지네이션의 총합 배열
    const pageLimit = 10; // 보여질 페이지네이션의 개수

    // 페이지네이션 배열 생성
    useEffect(() => {
        const createArr = () => {
            if (totalPage) {
                const iArr = [];
                for (let i = 0; i < totalPage; i++) {
                    iArr[i] = i + 1;
                }
                return iArr;
            }
        };
        setCountArr(createArr);
    }, [totalPage]);

    useEffect(() => {
        if (spots) {
            const { totalCount } = spots;
            updateTotalPage(Math.ceil(totalCount / 10));
            setBlockArea(blockNum * pageLimit);
            if (countArr) {
                updatePagination(countArr.slice(blockArea, pageLimit + blockArea));
            }
        }
    }, [blockNum, spots, updateTotalPage, blockArea, countArr, updatePagination]);

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
    return <SpotPagination spots={spots} currentInfo={currentInfo} onFirstPage={onFirstPage} onLastPage={onLastPage} onNextPage={onNextPage} onPrevPage={onPrevPage} onUpdatePageNum={updatePageNum} />;
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
        updateTotalPage,
        updatePagination,
    },
)(SpotPaginationContainer);
