import styled from 'styled-components';
import ReviewItem from '../../review/ReviewItem';

const Reviews = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  border: 1px solid yellow;
`;

const LikeReviews = () => {
  return (
    <>
      <h2>여행후기</h2>
      <hr />
      <Reviews>
        <ReviewItem />
        <ReviewItem />
      </Reviews>
    </>
  );
};

export default LikeReviews;
