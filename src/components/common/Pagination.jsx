import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { faForward } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const PaginationBlock = styled.div`
    /* padding: 20px 0px; */
    width: 100%;
    /* height: 100%; */
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
`;

const PaginationBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const PageButton = styled.div`
    border-radius: 8px;
    padding: 8px;
    margin: 0;
    font-size: 1rem;
    &:hover {
        background-color: ${(props) => props.theme.hoverBackgroundColor};
        cursor: pointer;
        transform: translateY(-2px);
    }

    &[disabled] {
        background-color: ${(props) => props.theme.shadowColor};
        cursor: revert;
        transform: revert;
    }

    &[aria-current] {
        background-color: ${(props) => props.theme.clickedButtonBackgroundColor};
        color: ${(props) => props.theme.primaryColor};
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
    itemCount,
}) => {
    const maxPage = Math.ceil(totalCount / itemCount) || 1;
    const isMaxPageGroup =
        maxPage > pageSize ? (Math.ceil(page / pageSize) === Math.ceil(maxPage / pageSize) ? true : false) : true;
    const endPageNum = isMaxPageGroup ? maxPage : Math.ceil(page / pageSize) * pageSize;
    const startPageNum = isMaxPageGroup ? Math.floor(page / pageSize) * pageSize + 1 : endPageNum - (pageSize - 1);

    // const isMaxPageGroup = maxPage > pageSize ? (maxPage - page < maxPage - pageSize ? true : false) : true;
    // const endPageNum = isMaxPageGroup ? maxPage : Math.ceil(page / pageSize) * pageSize;
    // const startPageNum = isMaxPageGroup ? Math.floor(page / pageSize) * pageSize + 1 : endPageNum - (pageSize - 1);

    const [pageArr, setPageArr] = useState([]);

    const handleFirstPage = () => {
        if (page != 1) {
            onFirstPage(1);
        }
    };

    const handleNextPage = () => {
        if (page < maxPage) {
            onNextPage();
        }
    };

    const handlePreviousPage = () => {
        if (page != 1) {
            onPreviousPage();
        }
    };

    const handleLastpage = () => {
        if (page != maxPage) {
            onLastPage(maxPage);
        }
    };

    useEffect(() => {
        const length = isMaxPageGroup ? endPageNum - (startPageNum - 1) : pageSize;
        const pageNum = Array.from({ length: length }, (_, i) => i + startPageNum);
        setPageArr(pageNum);
    }, [startPageNum, totalCount]);

    return (
        <PaginationBlock>
            <PaginationBox>
                <PageButton onClick={handleFirstPage}>
                    <FontAwesomeIcon icon={faBackward} />
                </PageButton>
                <PageButton onClick={handlePreviousPage}>
                    <FontAwesomeIcon icon={faCaretLeft} />
                </PageButton>
                {pageArr.map((i) => {
                    return (
                        <PageButton key={i} aria-current={page === i ? 'cur' : null} onClick={() => onPageChange(i)}>
                            {i}
                        </PageButton>
                    );
                })}
                <PageButton onClick={handleNextPage}>
                    <FontAwesomeIcon icon={faCaretRight} />
                </PageButton>
                <PageButton onClick={handleLastpage}>
                    <FontAwesomeIcon icon={faForward} />
                </PageButton>
            </PaginationBox>
        </PaginationBlock>
    );
};

export default Pagination;
