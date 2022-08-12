import styled from 'styled-components';
import Review from '../../review/Review';

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
        <Review />
        <Review />
      </Reviews>
    </>
  );
};

export default LikeReviews;
