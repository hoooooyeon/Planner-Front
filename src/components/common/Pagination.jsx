import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { faForward } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const PaginationBlock = styled.div`
    width: 100%;
    margin: 30px auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: var(--md-sys-color-background);
`;

const PaginationBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    @media all and (min-width: 768px) {
        padding: 0rem 9rem;
    }
`;

const PageButton = styled.div`
    border-radius: 8px;
    padding: 8px;
    margin: 0;
    font-size: 1rem;
    &:hover {
        background-color: var(--md-sys-color-secondary-container);
        cursor: pointer;
        transform: translateY(-2px);
    }

    &[disabled] {
        background-color: var(--md-sys-color-shadow);
        cursor: revert;
        transform: revert;
    }

    &[aria-current] {
        background-color: var(--md-sys-color-secondary);
        color: var(--md-sys-color-on-secondary);
        font-weight: bold;
        cursor: revert;
        transform: revert;
    }
    @media all and (max-width: 319px) {
        padding: 2px;
    }
`;

const Pagination = ({
    page,
    totalCount,
    pageSize,
    onPageChange,
    onNextPage,
    onPreviousPage,
    onFirstPage,
    onLastPage,
}) => {
    const maxPage = Math.ceil(totalCount / pageSize);
    const isMaxPageGroup = maxPage > 10 ? (maxPage - page < maxPage - pageSize ? true : false) : true;
    const endPageNum = isMaxPageGroup ? maxPage : Math.ceil(page / pageSize) * pageSize;
    const startPageNum = isMaxPageGroup ? Math.floor(page / pageSize) * 10 + 1 : endPageNum - (pageSize - 1);

    const [pageArr, setPageArr] = useState([]);

    useEffect(() => {
        const length = isMaxPageGroup ? endPageNum - (startPageNum - 1) : pageSize;
        const pageNum = Array.from({ length: length }, (_, i) => i + startPageNum);
        setPageArr(pageNum);
    }, [startPageNum]);

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
                        <PageButton key={i} aria-current={page === i ? 'cur' : null} onClick={() => onPageChange(i)}>
                            {i}
                        </PageButton>
                    );
                })}
                <PageButton onClick={onNextPage}>
                    <FontAwesomeIcon icon={faCaretRight} />
                </PageButton>
                <PageButton onClick={onLastPage}>
                    <FontAwesomeIcon icon={faForward} />
                </PageButton>
            </PaginationBox>
        </PaginationBlock>
    );
};

export default Pagination;
