import styled from 'styled-components';
import ReviewList from './ReviewList';

const ReviewBlock = styled.div`
  margin: 100px auto 0px;
  width: 80%;
`;

const Review = () => {
  return (
    <ReviewBlock>
      <ReviewList />
    </ReviewBlock>
  );
};

export default Review;
