import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { faForward } from '@fortawesome/free-solid-svg-icons';


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
        <PageButton><FontAwesomeIcon icon={faCaretLeft} /></PageButton>
        <PageButton><FontAwesomeIcon icon={faBackward} /></PageButton>
        {arr.map((n) => {
          return <PageButton key={n}>{n}</PageButton>;
        })}
        <PageButton><FontAwesomeIcon icon={faCaretRight} /></PageButton>
        <PageButton><FontAwesomeIcon icon={faForward} /></PageButton>
      </PaginationBox>
    </PaginationBlock>
  );
};

export default Pagination;
