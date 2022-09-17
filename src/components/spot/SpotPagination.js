import { useEffect, useState } from 'react';
import styled from 'styled-components';

const SpotPaginationBlock = styled.div`
  display: flex;
`;
const PageButton = styled.div`
  border: 1px solid blue;
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
  }

  &[aria-current] {
    background: lightblue;
    font-weight: bold;
  }
`;

const SpotPagination = ({ totalCount, areaCode, listSpots }) => {
  const [page, setPage] = useState(1);
  const totalPage = Math.ceil(totalCount / 10);
  useEffect(() => {
    listSpots(areaCode, page);
  }, [areaCode, page, listSpots]);

  return (
    <SpotPaginationBlock>
      <PageButton
        onClick={() => {
          setPage(page - 1);
          listSpots(areaCode, page);
        }}
        disabled={page === 1 ? true : false}
      >
        &lt;
      </PageButton>
      {Array(totalPage)
        .fill()
        .map((_, i) => (
          <PageButton
            key={i + 1}
            onClick={() => {
              setPage(i + 1);
              listSpots(areaCode, page);
            }}
            aria-current={page === i + 1 ? 'page' : null}
          >
            {i + 1}
          </PageButton>
        ))}
      <PageButton
        onClick={() => {
          setPage(page + 1);
          listSpots(areaCode, page);
        }}
        disabled={page === totalPage}
      >
        &gt;
      </PageButton>
    </SpotPaginationBlock>
  );
};

export default SpotPagination;
