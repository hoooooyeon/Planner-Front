import styled from 'styled-components';
import ReviewList from './ReviewList';

const ReviewBlock = styled.div`
  margin: 100px auto;
  width: 80%;
  height: auto;
  min-height: 100%;
  padding-bottom: 170px;
`;

const Review = () => {
  return (
    <ReviewBlock>
      <ReviewList type="review" />
    </ReviewBlock>
  );
};

export default Review;
