import styled from 'styled-components';
import ReviewItem from './ReviewItem';

const ReviewListBlock = styled.div`
  margin-top: 50px;
`;
const Reviews = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const ReviewList = () => {
  return (
    <ReviewListBlock>
      <h2>여행 후기</h2>
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
