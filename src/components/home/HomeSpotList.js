import styled from 'styled-components';

const HomeSpotListBlock = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: white;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 5rem 0;
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

const SpotList = styled.ul`
  list-style-type: none;
  height: 100%;
  margin: 0 auto;
  /* padding: 0 20px; */
  display: inline-block;
  /* width: calc(100% - 40px); */
  width: 100%;
  padding: 0;
  @media all and (min-width: 1025px) {
  }
`;

const SpotItem = styled.li`
  float: left;
  /* padding: 0 6px 12px; */
  /* margin: 0.5%; */
  width: 33.33%;
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;

const ImgBox = styled.div`
  background-color: lightgray;
  padding: 0;
  margin: 0;
  overflow: hidden;
`;
const Img = styled.img`
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

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const HomeSpotList = () => {
  return (
    <HomeSpotListBlock>
      <Container>
        <Header>
          <h3>여행지 리스트</h3>
        </Header>
        <SpotList>
          <SpotItem>
            <ImgBox>
              <Img />
            </ImgBox>
          </SpotItem>
          <SpotItem>
            <ImgBox>
              <Img />
            </ImgBox>
          </SpotItem>
          <SpotItem>
            <ImgBox>
              <Img />
            </ImgBox>
          </SpotItem>
          <SpotItem>
            <ImgBox>
              <Img />
            </ImgBox>
          </SpotItem>
          <SpotItem>
            <ImgBox>
              <Img />
            </ImgBox>
          </SpotItem>
          <SpotItem>
            <ImgBox>
              <Img />
            </ImgBox>
          </SpotItem>
          <SpotItem>
            <ImgBox>
              <Img />
            </ImgBox>
          </SpotItem>
          <SpotItem>
            <ImgBox>
              <Img />
            </ImgBox>
          </SpotItem>
          <SpotItem>
            <ImgBox>
              <Img />
            </ImgBox>
          </SpotItem>
          <SpotItem>
            <ImgBox>
              <Img />
            </ImgBox>
          </SpotItem>
          <SpotItem>
            <ImgBox>
              <Img />
            </ImgBox>
          </SpotItem>
          <SpotItem>
            <ImgBox>
              <Img />
            </ImgBox>
          </SpotItem>
        </SpotList>
      </Container>
    </HomeSpotListBlock>
  );
};

export default HomeSpotList;
