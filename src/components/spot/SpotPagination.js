import styled from 'styled-components';

const SpotPaginationBlock = styled.div`
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

const SpotPagination = ({ currentInfo, spots, onUpdatePageNum, onFirstPage, onLastPage, onNextPage, onPrevPage }) => {
    const { pageNum, totalPage, pagination } = currentInfo;
    return (
        <SpotPaginationBlock>
            {spots && pagination && (
                <PaginationBox>
                    <PageButton onClick={onFirstPage}>&lt;&lt;</PageButton>
                    <PageButton onClick={onPrevPage} disabled={pageNum === 1}>
                        &lt;
                    </PageButton>
                    {pagination.map((n) => (
                        <PageButton
                            key={n}
                            onClick={() => {
                                onUpdatePageNum(n);
                            }}
                            aria-current={pageNum === n ? 'page' : null}
                        >
                            {n}
                        </PageButton>
                    ))}
                    <PageButton onClick={onNextPage} disabled={pageNum === totalPage}>
                        &gt;
                    </PageButton>
                    <PageButton onClick={onLastPage}>&gt;&gt;</PageButton>
                </PaginationBox>
            )}
        </SpotPaginationBlock>
    );
};

export default SpotPagination;
