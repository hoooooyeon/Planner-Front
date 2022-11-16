import styled from 'styled-components';

const HomeShareBlock = styled.div`
  width: 100%;
  height: 100%;
  margin: 50px auto;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  @media all and (min-width: 768px) {
    width: calc(100% - 40px);
    padding: 0 20px;
  }
  @media all and (min-width: 960px) {
    width: 930px;
    padding: 0;
  }
  @media all and (min-width: 1280px) {
    width: 1250px;
    padding: 0;
  }
`;

const ShareList = styled.ul`
  list-style-type: none;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0;
  margin: 0 auto;
`;

const ShareItem = styled.li`
  width: 24%;
  flex-shrink: 0;
  margin: 0.5%;
  box-shadow: 3px 3px 7px 1px rgb(0 0 0 / 30%);
  border-radius: 0.5rem;
`;

const InfoBox = styled.div`
  user-select: none;
  height: 60px;
  margin: 0;
  padding: 3px;
  border-top: 1px solid lightgray;
`;

const Map = styled.div`
  width: 100%;
  height: 150px;
  border: none;
  margin: auto;
  @media all and (min-width: 960px) {
    height: 200px;
  }
  @media all and (min-width: 1280px) {
    height: 250px;
  }
`;

const Name = styled.p`
  margin: 0 0 10px 0;
  font-weight: bold;
`;

const Date = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: gray;
`;

const HomeShare = () => {
  return (
    <HomeShareBlock>
      <Container>
        <h3>사용자들의 플래너</h3>
        <ShareList>
          <ShareItem>
            <Map />
            <InfoBox>
              <Name>1</Name>
              <Date>2020년 11월 11일 ~ 2022년 17월 29일</Date>
            </InfoBox>
          </ShareItem>
          <ShareItem>
            <Map />
            <InfoBox>
              <Name>1</Name>
              <Date>2020년 11월 11일 ~ 2022년 17월 29일</Date>
            </InfoBox>
          </ShareItem>
          <ShareItem>
            <Map />
            <InfoBox>
              <Name>1</Name>
              <Date>2020년 11월 11일 ~ 2022년 17월 29일</Date>
            </InfoBox>
          </ShareItem>
          <ShareItem>
            <Map />
            <InfoBox>
              <Name>1</Name>
              <Date>2020년 11월 11일 ~ 2022년 17월 29일</Date>
            </InfoBox>
          </ShareItem>
        </ShareList>
      </Container>
    </HomeShareBlock>
  );
};

export default HomeShare;
