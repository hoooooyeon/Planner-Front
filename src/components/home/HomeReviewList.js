import styled from 'styled-components';

const HomeReviewListBlock = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: rgb(250, 244, 235);
`;

const Container = styled.div`
  width: calc(100% - 18rem);
  height: 100%;
  margin: 0 auto;
  padding: 6rem 9rem 8rem;
  /* @media all and (min-width: 768px) {
    width: calc(100% - 40px);
    padding: 0 20px;
  }
  @media all and (min-width: 960px) {
    width: 930px;
    padding: 0;
  }
  @media all and (min-width: 1280px) {
    width: 1024px;
  } */
`;

const Header = styled.div`
  /* margin-left: 20px; */
  text-align: center;
  margin-bottom: 6rem;
  h3 {
    margin: 0;
  }
`;

const ReviewList = styled.ul`
  list-style-type: none;
  height: 100%;
  width: 100%;
  padding: 0;
  display: flex;
  /* padding: 0 20px; */
  margin: 0 auto;
  /* width: calc(100% - 40px); */
  /* @media all and (min-width: 1025px) {
    width: 100%;
  } */
`;

const ReviewItem = styled.li`
  background-color: white;
  width: 24%;
  margin: 1rem;
  /* box-shadow: 3px 3px 7px 1px rgb(0, 0, 0, 30%); */
  border: 0.1rem solid rgba(0, 0, 0, 0.1);
  /* border-radius: 0.5rem; */
  &:hover {
    cursor: pointer;
    box-shadow: 3px 4px 14px 2px rgb(0, 0, 0, 30%);
    transform: translateY(-3px);
  }
`;

const SimpleMap = styled.div`
  width: 100%;
  height: 120px;
  border: none;
  margin: auto;
  @media all and (min-width: 960px) {
    height: 160px;
  }
  @media all and (min-width: 1280px) {
    height: 190px;
  }
`;
const InfoBox = styled.div`
  user-select: none;
  /* height: 60px; */
  margin: 0;
  padding: 0.5rem;
  border-top: 1px solid lightgray;
`;
const Name = styled.p`
  margin: 0 0 8px 0;
  font-size: 0.7rem;
  white-space: nowrap; // 줄바꿈 X
  overflow: hidden;
  text-overflow: ellipsis;
  @media all and (min-width: 768px) {
    font-size: 0.8rem;
  }
  @media all and (min-width: 960px) {
    font-size: 0.9rem;
  }
`;
const Date = styled.p`
  margin: 0;
  font-size: 0.4rem;
  color: gray;
  white-space: nowrap; // 줄바꿈 X
  overflow: hidden;
  text-overflow: ellipsis;
  @media all and (min-width: 768px) {
    font-size: 0.6rem;
  }
  @media all and (min-width: 960px) {
    font-size: 0.7rem;
  }
`;

const HomeReviewList = () => {
  return (
    <HomeReviewListBlock>
      <Container>
        <Header>
          <h3>다른 이용자들의 여행 후기</h3>
          <p>먼저 여행을 다녀온 이용자들의 여행 후기를 살펴보세요.</p>
        </Header>
        <ReviewList>
          <ReviewItem>
            <SimpleMap />
            <InfoBox>
              <Name>1</Name>
              <Date>2020년 11월 11일 ~ 2022년 17월 29일</Date>
            </InfoBox>
          </ReviewItem>
          <ReviewItem>
            <SimpleMap />
            <InfoBox>
              <Name>1</Name>
              <Date>2020년 11월 11일 ~ 2022년 17월 29일</Date>
            </InfoBox>
          </ReviewItem>
          <ReviewItem>
            <SimpleMap />
            <InfoBox>
              <Name>1</Name>
              <Date>2020년 11월 11일 ~ 2022년 17월 29일</Date>
            </InfoBox>
          </ReviewItem>
          <ReviewItem>
            <SimpleMap />
            <InfoBox>
              <Name>1</Name>
              <Date>2020년 11월 11일 ~ 2022년 17월 29일</Date>
            </InfoBox>
          </ReviewItem>
        </ReviewList>
      </Container>
    </HomeReviewListBlock>
  );
};

export default HomeReviewList;
