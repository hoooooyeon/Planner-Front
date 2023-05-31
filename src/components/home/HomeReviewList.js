import styled from 'styled-components';

const HomeReviewListBlock = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: lightgray;
`;

const Container = styled.div`
  width: 100%;
  height: 90vh;
  margin: 0 auto;
  padding: 10rem 0 0;
  @media all and (min-width: 768px) {
    width: calc(100% - 40px);
    /* padding: 0 20px; */
  }
  @media all and (min-width: 960px) {
    width: 930px;
    /* padding: 0; */
  }
  @media all and (min-width: 1280px) {
    width: 1024px;
  }
`;

const Header = styled.div`
  /* margin-left: 20px; */
  text-align: center;
  margin-bottom: 3rem;
`;

const ReviewList = styled.ul`
  list-style-type: none;
  height: 100%;
  display: flex;
  padding: 0 20px;
  margin: 0 auto;
  width: calc(100% - 40px);
  @media all and (min-width: 1025px) {
    width: 100%;
  }
`;

const ReviewItem = styled.li`
  width: 24%;
  height: 300px;
  margin: 0.5%;
  box-shadow: 3px 3px 7px 1px rgb(0, 0, 0, 30%);
  border-radius: 0.5rem;
  &:hover {
    cursor: pointer;
    box-shadow: 3px 4px 14px 2px rgb(0, 0, 0, 30%);
    transform: translateY(-3px);
  }
`;

const InfoBox = styled.div`
  user-select: none;
  height: 60px;
  margin: 0;
  padding: 3px;
  border-top: 1px solid lightgray;
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
const Name = styled.p`
  margin: 0 0 8px 0;
  font-size: 0.7rem;
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
