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

    const { pageLastIndex } = { ...sharePlanners };
    const { pageNum } = { ...plannerData };

    // 뿌려줄 페이지 배열
    const [pageArr, setPageArr] = useState([]);
    // 페이지의 10단위
    const [block, setBlock] = useState(0);
    // 보여질 페이지네이션의 개수
    const limitIndex = 10;
    // 마지막 페이지
    const maxPage = pageLastIndex;
    // 현재 페이지
    const [page, setPage] = useState(1);

    // 페이지네이션 배열 생성 함수
    useEffect(() => {
        const arr = Array.from({ length: maxPage }, (_, i) => i + 1);

        setPageArr(arr.slice(limitIndex * block, limitIndex * (block + 1)));
    }, [block, maxPage]);

    useEffect(() => {
        if (pageNum === 1) {
            setBlock(0);
        } else if (pageNum === maxPage) {
            setBlock(Math.ceil(maxPage / limitIndex - 1));
        }
    }, [pageNum, maxPage]);

    const onIndexPage = (index) => {
        setPage(index);
    };
    const onNextPage = () => {
        if (!(page === maxPage)) {
            setPage((index) => index + 1);
            if (pageNum % limitIndex === 0) {
                setBlock((block) => block + 1);
            }
        }
    };
    const onPreviousPage = () => {
        if (!(page === 1)) {
            setPage((index) => index - 1);
            if (page % limitIndex === 1) {
                setBlock((block) => block - 1);
            }
        }
    };
    const onFirstPage = () => {
        setPage(1);
    };
    const onLastPage = () => {
        setPage(maxPage);
    };

    useEffect(() => {
        dispatch(changePageNumAction(page));
    }, [page, dispatch]);

    return <Pagination pageLastIndex={pageLastIndex} pageArr={pageArr} onIndexPage={onIndexPage} onNextPage={onNextPage} onPreviousPage={onPreviousPage} onFirstPage={onFirstPage} onLastPage={onLastPage} />;
};

export default PlannerListPaginationContainer;
