import styled from 'styled-components';

const ReviewItemBlock = styled.div`
  width: 280px;
  height: 320px;
  margin: 10px;
  text-align: center;
  border: 1px solid lightblue;
  border-radius: 5%;
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
