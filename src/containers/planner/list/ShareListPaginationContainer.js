import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../../components/common/Pagination';
import * as common from '../../../lib/utils/CommonFunction';
import { changeSharePageIndexAction } from '../../../modules/plannerModule';

const PlannerListPaginationContainer = () => {
    const dispatch = useDispatch();
    const { sharePlanners, plannerData } = useSelector(({ plannerReducer }) => ({
        sharePlanners: plannerReducer.sharePlanners,
        plannerData: plannerReducer.plannerData,
    }));

    const { pageLastIndex } = { ...sharePlanners };
    const { sharePageIndex } = { ...plannerData };

    // 뿌려줄 페이지 배열
    const [pageArr, setPageArr] = useState([]);
    // 보여질 페이지네이션의 개수 기준
    const [block, setBlock] = useState(0);
    // 보여질 페이지네이션의 개수
    let count = 5;

    // // 뿌려줄 페이지네이션 배열 생성  함수
    useEffect(() => {
        common.creaetPageArr(pageLastIndex, setPageArr, count, block);
    }, [pageLastIndex, count, block]);

    // 페이지 버튼
    const onUpdatePageIndex = (pageIndex) => {
        dispatch(changeSharePageIndexAction(pageIndex));
    };

    const prevPage = () => {
        common.prevPage(sharePageIndex, onUpdatePageIndex, setBlock, count);
    };

    const nextPage = () => {
        common.nextPage(sharePageIndex, pageLastIndex, onUpdatePageIndex, count, setBlock);
    };

    const firstPage = () => {
        common.firstPage(onUpdatePageIndex, setBlock);
    };

    const lastPage = () => {
        common.lastPage(onUpdatePageIndex, pageLastIndex, setBlock, count);
    };

    return <Pagination pageLastIndex={pageLastIndex} pageArr={pageArr} onUpdatePageIndex={onUpdatePageIndex} nextPage={nextPage} prevPage={prevPage} firstPage={firstPage} lastPage={lastPage} />;
};

export default PlannerListPaginationContainer;
