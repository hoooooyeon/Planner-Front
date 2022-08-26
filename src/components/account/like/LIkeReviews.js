import styled from 'styled-components';
import ReviewItem from '../../review/ReviewItem';

const Reviews = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const LikeReviews = () => {
  return (
    <>
      <h3>여행후기</h3>
      <hr />
      <Reviews>
        <ReviewItem />
        <ReviewItem />
      </Reviews>
    </>
  );
};

export default LikeReviews;
