import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { faForward } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const PaginationBlock = styled.div`
    width: 100%;
    margin: 50px auto;
`;

const PaginationBox = styled.div`
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
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

const Pagination = ({ pageArr, onChangePageNum, nextPage, prevPage, firstPage, lastPage }) => {
    return (
        <PaginationBlock>
            <PaginationBox>
                <PageButton onClick={firstPage}>
                    <FontAwesomeIcon icon={faBackward} />
                </PageButton>
                <PageButton onClick={prevPage}>
                    <FontAwesomeIcon icon={faCaretLeft} />
                </PageButton>
                {pageArr &&
                    pageArr.map((i) => {
                        return (
                            <PageButton key={i} onClick={() => onChangePageNum(i)}>
                                {i}
                            </PageButton>
                        );
                    })}
                <PageButton onClick={nextPage}>
                    <FontAwesomeIcon icon={faCaretRight} />
                </PageButton>
                <PageButton onClick={lastPage}>
                    <FontAwesomeIcon icon={faForward} />
                </PageButton>
            </PaginationBox>
        </PaginationBlock>
    );
};

export default Pagination;
