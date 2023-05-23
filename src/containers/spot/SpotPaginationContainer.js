import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Pagination from '../../components/common/Pagination';
import { updateBlockNumAction, updatePageNumAction, updateTotalPageAction, updatePaginationAction } from '../../modules/spotModule';
import * as common from '../../lib/utils/CommonFunction';

const SpotPaginationContainer = ({ spots, spotData, updatePageNumAction, updateBlockNumAction, updateTotalPageAction, updatePaginationAction }) => {
    const { totalCount } = { ...spots };
    const { pageIndex } = { ...spotData };
    // 뿌려줄 페이지 배열
    const [pageArr, setPageArr] = useState([]);
    // 보여질 페이지네이션의 개수 기준
    const [block, setBlock] = useState(0);
    // 보여질 페이지네이션의 개수
    const count = 5;
    // 보여질 아이템의 개수
    const itemCount = 10;
    // 마지막 페이지
    const pageLastIndex = Math.ceil(totalCount / itemCount);

    // // 뿌려줄 페이지네이션 배열 생성  함수
    useEffect(() => {
        if (spots) {
            common.creaetPageArr(pageLastIndex, setPageArr, count, block);
        }
    }, [pageLastIndex, count, block, spots]);

    // 페이지 버튼
    const onUpdatePageIndex = (pageIndex) => {
        updatePageNumAction(pageIndex);
    };

    const prevPage = () => {
        common.prevPage(pageIndex, onUpdatePageIndex, setBlock, count);
    };

    const nextPage = () => {
        common.nextPage(pageIndex, pageLastIndex, onUpdatePageIndex, count, setBlock);
    };

    const firstPage = () => {
        common.firstPage(onUpdatePageIndex, setBlock);
    };

    const lastPage = () => {
        common.lastPage(onUpdatePageIndex, pageLastIndex, setBlock, count);
    };

    return <Pagination spots={spots} pageArr={pageArr} spotData={spotData} onUpdatePageIndex={onUpdatePageIndex} prevPage={prevPage} nextPage={nextPage} firstPage={firstPage} lastPage={lastPage} />;
};

export default connect(
    (state) => ({
        spots: state.spotReducer.spots,
        spotData: state.spotReducer.spotData,
    }),
    {
        updatePageNumAction,
        updateBlockNumAction,
        updateTotalPageAction,
        updatePaginationAction,
    },
)(SpotPaginationContainer);
