import styled from 'styled-components';

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

const Pagination = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <PaginationBlock>
      <PaginationBox>
        <PageButton>&lt;&lt;</PageButton>
        <PageButton>&lt;</PageButton>
        {arr.map((n) => {
          return <PageButton key={n}>{n}</PageButton>;
        })}
        <PageButton>&gt;</PageButton>
        <PageButton>&gt;&gt;</PageButton>
      </PaginationBox>
    </PaginationBlock>
  );
};

export default Pagination;
