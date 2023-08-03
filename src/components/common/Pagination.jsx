import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { faForward } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

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

const Pagination = ({ page, totalCount, limitIndex, onIndexPage, onNextPage, onPreviousPage, onFirstPage, onLastPage }) => {
    const isStartEndPage = page % limitIndex;
    const maxPage = totalCount / limitIndex;
    const [pageArr, setPageArr] = useState([]);

    useEffect(() => {
        if (isStartEndPage === 0 || isStartEndPage === 1) {
            const pageNum = Array.from({ length: limitIndex }, (_, i) => i + page - 1 + 1);
            setPageArr(pageNum);
        }
    }, [page]);

    return (
        <PaginationBlock>
            <PaginationBox>
                <PageButton onClick={onFirstPage}>
                    <FontAwesomeIcon icon={faBackward} />
                </PageButton>
                <PageButton onClick={onPreviousPage}>
                    <FontAwesomeIcon icon={faCaretLeft} />
                </PageButton>
                {pageArr.map((i) => {
                    return (
                        <PageButton key={i} onClick={() => onIndexPage(i)}>
                            {i}
                        </PageButton>
                    );
                })}
                <PageButton onClick={onNextPage}>
                    <FontAwesomeIcon icon={faCaretRight} />
                </PageButton>
                <PageButton onClick={() => onLastPage(maxPage)}>
                    <FontAwesomeIcon icon={faForward} />
                </PageButton>
            </PaginationBox>
        </PaginationBlock>
    );
};

export default Pagination;