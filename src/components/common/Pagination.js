import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { faForward } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const PaginationBlock = styled.div`
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    background-color: var(--md-sys-color-background);
`;

const Container = styled.div`
    display: flex;
    margin: 0 auto;
    @media all and (min-width: 768px) {
        padding: 0rem 9rem;
    }
`;

const PageButton = styled.div`
    border-radius: 8px;
    padding: 8px;
    margin: 0;
    font-size: 0.9rem;
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
    itemIndex,
    onIndexPage,
    onNextPage,
    onPreviousPage,
    onFirstPage,
    onLastPage,
}) => {
    // 뿌려줄 페이지 배열
    const [pageArr, setPageArr] = useState([]);
    // 페이지의 10단위
    const [block, setBlock] = useState(0);
    // 보여질 페이지네이션의 개수
    const limitIndex = 5;
    // 마지막 페이지
    const maxPage = Math.ceil(totalCount / itemIndex);

    const onClickNextPage = () => {
        onNextPage(maxPage);
        if (page % limitIndex === 0) {
            setBlock((block) => block + 1);
        }
    };

    const onClickPrevPage = () => {
        onPreviousPage();
        if (page % limitIndex === 1) {
            setBlock((block) => block - 1);
        }
    };

    // 페이지네이션 배열 생성
    useEffect(() => {
        const arr = Array.from({ length: maxPage }, (_, i) => i + 1);

        setPageArr(arr.slice(limitIndex * block, limitIndex * (block + 1)));
    }, [block, maxPage]);

    // block 처리
    useEffect(() => {
        if (page === 1) {
            setBlock(0);
        } else if (page === maxPage) {
            setBlock(Math.ceil(maxPage / limitIndex - 1));
        }
    }, [page]);

    return (
        <PaginationBlock>
            <Container>
                {pageArr && pageArr.length > 0 && (
                    <>
                        <PageButton onClick={onFirstPage}>
                            <FontAwesomeIcon icon={faBackward} />
                        </PageButton>
                        <PageButton onClick={onClickPrevPage}>
                            <FontAwesomeIcon icon={faCaretLeft} />
                        </PageButton>
                        {pageArr.map((i) => {
                            return (
                                <PageButton
                                    key={i}
                                    aria-current={page === i ? 'cur' : null}
                                    onClick={() => onIndexPage(i)}
                                >
                                    {i}
                                </PageButton>
                            );
                        })}
                        <PageButton onClick={onClickNextPage}>
                            <FontAwesomeIcon icon={faCaretRight} />
                        </PageButton>
                        <PageButton onClick={() => onLastPage(maxPage)}>
                            <FontAwesomeIcon icon={faForward} />
                        </PageButton>
                    </>
                )}
            </Container>
        </PaginationBlock>
    );
};

export default Pagination;
