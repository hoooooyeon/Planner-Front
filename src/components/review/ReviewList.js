import styled from 'styled-components';
import Button from '../common/Button';
import ReviewItem from './ReviewItem';

const ReviewListBlock = styled.div`
  margin-top: 50px;
`;
const Reviews = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 60px;
`;

const StyledButton = styled(Button)`
  width: 7.5rem;
  float: right;
`;

const ReviewList = ({ type }) => {
  return (
    <ReviewListBlock>
      {type === 'review' && (
        <>
          <h3>나의 여행 후기</h3>
          <hr />
          <StyledButton big>여행 후기 작성</StyledButton>
          <Reviews>
            <ReviewItem />
          </Reviews>
        </>
      )}
      <h3>여행 후기</h3>
      <hr />
      <Reviews>
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
      </Reviews>
    </ReviewListBlock>
  );
};

export default ReviewList;
