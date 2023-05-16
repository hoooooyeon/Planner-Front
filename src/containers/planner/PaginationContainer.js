import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../components/common/Pagination';
import { changePageNumAction } from '../../modules/plannerModule';

const PaginationContainer = () => {
    const dispatch = useDispatch();
    const { currentInfo } = useSelector(({ plannerReducer }) => ({
        currentInfo: plannerReducer.currentInfo,
    }));

    const { pageIndex, pageLastIndex } = { ...currentInfo };

    // 뿌려줄 페이지 배열
    const [pageArr, setPageArr] = useState([]);
    // 보여질 페이지네이션의 개수 기준
    const [block, setBlock] = useState(0);
    // 보여질 페이지네이션의 개수
    let count = 5;

    // 뿌려줄 페이지네이션 배열 생성  함수
    useEffect(() => {
        const arr = Array.from({ length: pageLastIndex }, (_, i) => i + 1);

        setPageArr(arr.slice(count * block, count * (block + 1)));
    }, [pageLastIndex, block, count]);

    // 페이지 버튼
    const onChangePageNum = (pageIndex) => {
        dispatch(changePageNumAction(pageIndex));
    };

    // 이전 페이지로
    const prevPage = () => {
        if (!(pageIndex === 1)) {
            dispatch(changePageNumAction(pageIndex - 1));
            if (pageIndex % count === 1) {
                setBlock((block) => block - 1);
            }
        }
    };
    // 다음 페이지로
    const nextPage = () => {
        if (!(pageIndex === pageLastIndex)) {
            dispatch(changePageNumAction(pageIndex + 1));
            if (pageIndex % count === 0) {
                setBlock((block) => block + 1);
            }
        }
    };
    // 처음 페이지로
    const firstPage = () => {
        dispatch(changePageNumAction(1));
        setBlock(0);
    };
    // 마지막 페이지로
    const lastPage = () => {
        dispatch(changePageNumAction(pageLastIndex));
        if (pageLastIndex % count === 0) {
            setBlock(Math.floor(pageLastIndex / count - 1));
        } else {
            setBlock(Math.floor(pageLastIndex / count));
        }
    };

    return <Pagination pageLastIndex={pageLastIndex} pageArr={pageArr} onChangePageNum={onChangePageNum} nextPage={nextPage} prevPage={prevPage} firstPage={firstPage} lastPage={lastPage} />;
};

export default PaginationContainer;
