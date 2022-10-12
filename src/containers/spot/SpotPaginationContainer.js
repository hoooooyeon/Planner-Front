import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SpotPagination from '../../components/spot/SpotPagination';
import { updateBlockNumAction, updatePageNumAction, updateTotalPageAction, updatePaginationAction } from '../../modules/spotModule';

const SpotPaginationContainer = ({ spots, currentInfo, updatePageNumAction, updateBlockNumAction, updateTotalPageAction, updatePaginationAction }) => {
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
            updateTotalPageAction(Math.ceil(totalCount / 10));
            setBlockArea(blockNum * pageLimit);
            if (countArr) {
                updatePaginationAction(countArr.slice(blockArea, pageLimit + blockArea));
            }
        }
    }, [blockNum, spots, updateTotalPageAction, blockArea, countArr, updatePaginationAction]);

    const onFirstPage = () => {
        updatePageNumAction(1);
        updateBlockNumAction(0);
    };
    const onLastPage = () => {
        updatePageNumAction(totalPage);
        updateBlockNumAction(Math.floor(totalPage / pageLimit));
    };

    const onPrevPage = () => {
        if (pageNum <= 1) return;
        if (pageNum - 1 <= pageLimit * blockNum) {
            updateBlockNumAction(blockNum - 1);
        }
        updatePageNumAction(pageNum - 1);
    };
    const onNextPage = () => {
        if (pageNum >= totalPage) return;
        if (pageLimit * (blockNum + 1) < pageNum + 1) {
            updateBlockNumAction(blockNum + 1);
        }
        updatePageNumAction(pageNum + 1);
    };
    return <SpotPagination spots={spots} currentInfo={currentInfo} onFirstPage={onFirstPage} onLastPage={onLastPage} onNextPage={onNextPage} onPrevPage={onPrevPage} onUpdatePageNum={updatePageNumAction} />;
};

export default connect(
    (state) => ({
        spots: state.spotReducer.spots,
        currentInfo: state.spotReducer.currentInfo,
    }),
    {
        updatePageNumAction,
        updateBlockNumAction,
        updateTotalPageAction,
        updatePaginationAction,
    },
)(SpotPaginationContainer);
