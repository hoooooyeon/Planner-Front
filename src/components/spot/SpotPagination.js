import { useEffect, useState } from 'react';
import styled from 'styled-components';

const SpotPaginationBlock = styled.div`
    display: flex;
`;
const PageButton = styled.div`
    border-radius: 8px;
    padding: 8px;
    margin: 0;
    font-size: 1rem;
    &:hover {
        background: lightblue;
        cursor: pointer;
        transform: translateY(-2px);
    }

    &[disabled] {
        background: grey;
        cursor: revert;
        transform: revert;
    }

    &[aria-current] {
        background: lightblue;
        font-weight: bold;
        cursor: revert;
        transform: revert;
    }
`;

const SpotPagination = ({ totalCount, areaCode, listSpots, page, setPage, blockNum, setBlockNum }) => {
    const createArr = () => {
        const iArr = [];
        for (let i = 0; i < totalPage; i++) {
            iArr[i] = i + 1;
        }
        return iArr;
    };
    const pageLimit = 10; // 보여줄 페이지네이션 개수
    const totalPage = Math.ceil(totalCount / 10); // 총 페이지 수
    const blockArea = blockNum * pageLimit; // 보여줄 페이지네이션 구역(1~10, 11~20, ...)
    const nArr = createArr(); // 총 페이지네이션 배열 생성
    let pArr = nArr.slice(blockArea, pageLimit + blockArea); // blockArea별로 페이지네이션 배열을 잘라준다.

    const firstPage = () => {
        setPage(1);
        setBlockNum(0);
        listSpots(areaCode, page);
    };
    const lastPage = () => {
        setPage(totalPage);
        setBlockNum(Math.floor(totalPage / pageLimit));
        listSpots(areaCode, page);
    };

    const prevPage = () => {
        if (page <= 1) {
            return;
        }
        if (page - 1 <= pageLimit * blockNum) {
            setBlockNum(blockNum - 1);
        }
        setPage(page - 1);
        listSpots(areaCode, page);
    };
    const nextPage = () => {
        if (page >= totalPage) {
            return;
        }
        if (pageLimit * (blockNum + 1) < page + 1) {
            setBlockNum(blockNum + 1);
        }
        setPage(page + 1);
        listSpots(areaCode, page);
    };

    useEffect(() => {
        listSpots(areaCode, page);
    }, [areaCode, page, listSpots]);

    return (
        <SpotPaginationBlock>
            <PageButton onClick={() => firstPage()}>&lt;&lt;</PageButton>
            <PageButton onClick={() => prevPage()} disabled={page === 1}>
                &lt;
            </PageButton>
            {pArr.map((n) => (
                <PageButton
                    key={n}
                    onClick={() => {
                        setPage(n);
                        listSpots(areaCode, page);
                    }}
                    aria-current={page === n ? 'page' : null}
                >
                    {n}
                </PageButton>
            ))}
            <PageButton onClick={() => nextPage()} disabled={page === totalPage}>
                &gt;
            </PageButton>
            <PageButton onClick={() => lastPage()}>&gt;&gt;</PageButton>
        </SpotPaginationBlock>
    );
};

export default SpotPagination;
