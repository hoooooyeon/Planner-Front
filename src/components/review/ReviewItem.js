import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const ReviewItemBlock = styled.div`
  width: 280px;
  height: 320px;
  margin: 10px;
  /* text-align: center; */
  border: 1px solid ${palette.ivory[0]};
  border-radius: 5%;

  box-shadow: 3px 3px 7px 1px ${palette.gray[1]};
  p {
    font-size: 1.2rem;
    margin: 10px;
  }
`;

const SimpleImg = styled.div`
  width: 280px;
  height: 270px;
`;

const ReviewItem = () => {
  return (
    <ReviewItemBlock>
      <SimpleImg />
      <p>천안문 갔다온 일</p>
    </ReviewItemBlock>
  );
};

export default ReviewItem;
