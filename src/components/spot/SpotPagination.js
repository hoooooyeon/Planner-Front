import { useEffect, useState } from 'react';
import styled from 'styled-components';

const SpotPaginationBlock = styled.div`
    display: flex;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: 5rem;
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

const SpotPagination = ({ totalCount, areaNum, pageNum, blockNum, spots, onLoadSpots, onUpdatePageNum, onUpdateBlockNum, onUpdateSpotId }) => {
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
        onUpdatePageNum(1);
        onUpdateBlockNum(0);
        // onLoadSpots(areaNum, pageNum);
        onUpdateSpotId(spots);
    };
    const lastPage = () => {
        onUpdatePageNum(totalPage);
        onUpdateBlockNum(Math.floor(totalPage / pageLimit));
        // onLoadSpots(areaNum, pageNum);
        onUpdateSpotId(spots);
    };

    const prevPage = () => {
        if (pageNum <= 1) return;
        if (pageNum - 1 <= pageLimit * blockNum) {
            onUpdateBlockNum(blockNum - 1);
        }
        onUpdatePageNum(pageNum - 1);
        // onLoadSpots(areaNum, pageNum);
        onUpdateSpotId(spots);
    };
    const nextPage = () => {
        if (pageNum >= totalPage) return;
        if (pageLimit * (blockNum + 1) < pageNum + 1) {
            onUpdateBlockNum(blockNum + 1);
        }
        onUpdatePageNum(pageNum + 1);
        // onLoadSpots(areaNum, pageNum);
        onUpdateSpotId(spots);
    };

    return (
        <SpotPaginationBlock>
            <PageButton onClick={firstPage}>&lt;&lt;</PageButton>
            <PageButton onClick={prevPage} disabled={pageNum === 1}>
                &lt;
            </PageButton>
            {pArr.map((n) => (
                <PageButton
                    key={n}
                    onClick={() => {
                        onUpdatePageNum(n);
                        // onLoadSpots(areaNum, pageNum);
                        onUpdateSpotId(spots);
                    }}
                    aria-current={pageNum === n ? 'page' : null}
                >
                    {n}
                </PageButton>
            ))}
            <PageButton onClick={nextPage} disabled={pageNum === totalPage}>
                &gt;
            </PageButton>
            <PageButton onClick={lastPage}>&gt;&gt;</PageButton>
        </SpotPaginationBlock>
    );
};

export default SpotPagination;
