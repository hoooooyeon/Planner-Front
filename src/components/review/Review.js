import styled from 'styled-components';

const ReviewBlock = styled.div`
  width: 280px;
  height: 320px;
  margin: 10px;
  text-align: center;
  border: 1px solid blue;
  h3 {
    margin: 10px;
  }
`;

const SimpleImg = styled.div`
  width: 280px;
  height: 270px;
  border: 1px solid red;
`;

const Review = () => {
  return (
    <ReviewBlock>
      <SimpleImg />
      <h3>천안문 갔다온 일</h3>
    </ReviewBlock>
  );
};

export default Review;
