import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { faForward } from '@fortawesome/free-solid-svg-icons';

const SpotPaginationBlock = styled.div`
    width: 100%;
    margin: 50px auto;
    padding-bottom: 150px;
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
                    <PageButton onClick={onFirstPage}><FontAwesomeIcon icon={faCaretLeft} /></PageButton>
                    <PageButton onClick={onPrevPage} disabled={pageNum === 1}>
                    <FontAwesomeIcon icon={faBackward} />
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
                    <FontAwesomeIcon icon={faCaretRight} />
                    </PageButton>
                    <PageButton onClick={onLastPage}><FontAwesomeIcon icon={faForward} /></PageButton>
                </PaginationBox>
            )}
        </SpotPaginationBlock>
    );
};

export default SpotPagination;
